<script setup>
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { songsCollection, auth } from '@/includes/firebase';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';

import UploadBox from './components/UploadBox.vue';
import SongItem from './components/SongItem.vue';

const songs = ref([]);
const unsavedFlag = ref(false);

const addSong = (document) => {
  const song = { ...document.data(), docID: document.id };
  songs.value.push(song);
};

const updateSong = (i, values) => {
  songs.value[i].modified_name = values.modified_name;
  songs.value[i].genre = values.genre;
};

const removeSong = (i) => {
  songs.value.splice(i, 1);
};

const updateUnsavedFlag = (value) => {
  unsavedFlag.value = value;
};

onMounted(async () => {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

  snapshot.forEach(addSong);
});

onBeforeRouteLeave((to, from, next) => {
  next(!unsavedFlag.value || window.confirm('You have unsaved changes. Are you sure you want to leave?'));
});
</script>
<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadBox :add-song="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <SongItem
              v-for="(item, i) in songs"
              :key="item.docID"
              :index="i"
              :song="item"
              :update-song="updateSong"
              :remove-song="removeSong"
              :update-unsaved-flag="updateUnsavedFlag"
            >
              <div v-show="!songs[index].showForm">
                <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                  <TrashIcon class="h-5 w-5" />
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                  @click.prevent="songs[index].showForm = !songs[index].showForm"
                >
                  <PencilSquareIcon class="h-5 w-5" />
                </button>
              </div>
              <div v-show="songs[index].showForm">
                <VeeForm>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <input
                      type="text"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <input
                      type="text"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre"
                    />
                  </div>
                  <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">Submit</button>
                  <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">Go Back</button>
                </VeeForm>
              </div>
            </SongItem>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
