<script setup>
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { songsCollection, auth } from '@/includes/firebase';

import UploadBox from './components/UploadBox.vue';
import SongItem from './components/SongItem.vue';

const songs = ref([]);
const unsavedFlag = ref(false);
const { t } = useI18n();

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
  next(!unsavedFlag.value || window.confirm(t('manager.youHaveUnsavedChanges')));
});
</script>
<template>
  <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadBox :add-song="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ t('manager.mySongs') }}</span>
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
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
