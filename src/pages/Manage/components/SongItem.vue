<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { songsCollection, storage } from '@/includes/firebase';

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  updateSong: {
    type: Function,
    required: true
  },
  removeSong: {
    type: Function,
    required: true
  },
  updateUnsavedFlag: {
    type: Function,
    required: true
  }
});

const { t } = useI18n();

const inSubmission = ref(false);
const showAlert = ref(false);
const alertVariant = ref('');
const alertMessage = ref('');

const showForm = ref(false);
const schema = {
  modified_name: 'required',
  genre: 'alphaSpaces'
};

const edit = async (values) => {
  inSubmission.value = true;
  showAlert.value = true;
  alertVariant.value = 'bg-blue-500';
  alertMessage.value = 'Please, wait! Updating song information...';

  try {
    await songsCollection.doc(props.song.docID).update(values);
  } catch (error) {
    inSubmission.value = false;
    alertVariant.value = 'bg-red-50';
    alertMessage.value = 'Oops! Something went wrong. Please, try again later.';
    return;
  }

  props.updateSong(props.index, values);
  props.updateUnsavedFlag(false);

  inSubmission.value = false;
  alertVariant.value = 'bg-green-500';
  alertMessage.value = 'Success!';
};

const deleteSong = async () => {
  const storageRef = storage.ref();
  const songRef = storageRef.child(`songs/${props.song.original_name}`);

  await songRef.delete();
  await songsCollection.doc(props.song.docID).delete();

  props.removeSong(props.index);
};
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right" @click.prevent="deleteSong">
        <TrashIcon class="h-5 w-5" />
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <PencilSquareIcon class="h-5 w-5" />
      </button>
    </div>
    <div v-show="showForm">
      <div v-if="showAlert" class="text-sm font-medium p-4 mb-4" :class="alertVariant">
        {{ alertMessage }}
      </div>
      <VeeForm :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ t('song.songTitle') }}</label>
          <VeeField
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="t('manager.enterSongTitle')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ t('song.genre') }}</label>
          <VeeField
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="t('manager.enterGenre')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600" :disabled="inSubmission">
          {{ t('song.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="inSubmission"
          @click.prevent="showForm = false"
        >
          {{ t('song.cancel') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>
