<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { XMarkIcon, CheckIcon } from '@heroicons/vue/20/solid';
import { storage, auth, songsCollection } from '@/includes/firebase';

const props = defineProps({
  addSong: {
    type: Function,
    required: true
  }
});

const { t } = useI18n();

const isDraggOver = ref(false);
const uploads = ref([]);

const upload = ($event) => {
  isDraggOver.value = false;

  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') {
      return;
    }

    if (!navigator.onLine) {
      uploads.value.push({
        task: {},
        currentProgress: 100,
        name: file.name,
        variant: 'bg-red-500',
        textClass: 'text-red-400',
        error: true
      });

      return;
    }

    const storageRef = storage.ref();
    const songsRef = storageRef.child(`songs/${file.name}`);
    const task = songsRef.put(file);

    const uploadIndex =
      uploads.value.push({
        task,
        currentProgress: 0,
        name: file.name,
        variant: 'bg-emerald-400',
        textClass: '',
        error: false,
        completed: false
      }) - 1;

    task.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploads.value[uploadIndex].currentProgress = progress;
      },
      () => {
        uploads.value[uploadIndex].error = true;
        uploads.value[uploadIndex].variant = 'bg-red-400';
        uploads.value[uploadIndex].textClass = 'text-red-400';
      },
      async () => {
        const song = {
          uid: auth.currentUser.uid,
          display_name: auth.currentUser.displayName,
          original_name: task.snapshot.ref.name,
          modified_name: task.snapshot.ref.name,
          genre: '',
          comment_count: 0
        };

        song.url = await task.snapshot.ref.getDownloadURL();
        const songRef = await songsCollection.add(song);
        const songSnapshot = await songRef.get();

        props.addSong(songSnapshot);

        uploads.value[uploadIndex].completed = true;
        uploads.value[uploadIndex].variant = 'bg-green-400';
        uploads.value[uploadIndex].textClass = 'text-green-400';
      }
    );
  });
};

onBeforeUnmount(() => {
  uploads.value.forEach((upload) => {
    upload.task.cancel();
  });
});
</script>
<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-teal-700 text-2xl"></i>
    </div>
    <div class="p-6">
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-teal-700 hover:border-teal-700 hover:border-solid"
        :class="{ 'bg-teal-700 border-teal-700 border-solid': isDraggOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDraggOver = false"
        @dragover.prevent.stop="isDraggOver = true"
        @dragenter.prevent.stop="isDraggOver = true"
        @dragleave.prevent.stop="isDraggOver = false"
        @drop.prevent.stop="upload($event)"
        @click.prevent="$refs.fileInput.click()"
      >
        <h5>{{ t('song.dragYourMp3FilesHere') }}</h5>
      </div>
      <input ref="fileInput" type="file" class="mt-5" accept=".mp3" multiple @change="upload($event)" />
      <hr class="my-6" />
      <div v-for="file in uploads" :key="file.name" class="mb-4">
        <div class="font-bold text-sm flex gap-1 items-center mb-1" :class="file.textClass">
          <div v-if="!file.error && !file.completed">
            <svg
              class="animate-spin h-5 w-5 text-emerald-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <XMarkIcon v-else-if="file.error" class="h-5 w-5 text-red-400" />
          <CheckIcon v-else-if="file.completed" class="h-5 w-5 text-green-400" />
          {{ file.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div
            class="transition-all progress-bar"
            :class="[file.variant]"
            :style="{ width: file.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
