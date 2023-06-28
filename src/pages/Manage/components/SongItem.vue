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
  alertVariant.value = 'bg-blue-50 text-blue-800';
  alertMessage.value = 'Please, wait! Updating song information...';

  try {
    await songsCollection.doc(props.song.docID).update(values);
  } catch (error) {
    inSubmission.value = false;
    alertVariant.value = 'bg-red-50 text-red-800';
    alertMessage.value = 'Oops! Something went wrong. Please, try again later.';
    return;
  }

  props.updateSong(props.index, values);
  props.updateUnsavedFlag(false);

  inSubmission.value = false;
  alertVariant.value = 'bg-green-50 text-green-800';
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
    <div v-show="!showForm" class="flex justify-between">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <div class="flex gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click.prevent="showForm = !showForm"
        >
          <PencilSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          {{ t('manager.edit') }}
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click.prevent="deleteSong"
        >
          <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          {{ t('manager.delete') }}
        </button>
      </div>
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
        <div class="mb-5">
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
        <button
          type="submit"
          class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-3"
          :disabled="inSubmission"
        >
          {{ t('song.submit') }}
        </button>
        <button
          type="button"
          class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          :disabled="inSubmission"
          @click.prevent="showForm = false"
        >
          {{ t('song.cancel') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>
