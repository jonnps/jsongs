<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { songsCollection } from '@/includes/firebase';

const { t } = useI18n();

const songs = ref([]);
const search = ref('');

const reset = () => {
  songs.value = [];
  search.value = '';
};

const searchSongs = async (searchTerm) => {
  songs.value = [];

  let query = songsCollection
    .orderBy('modified_name')
    .where('modified_name', '>=', searchTerm)
    .where('modified_name', '<=', searchTerm + '\uf8ff')
    .limit(10);

  const snapshot = await query.get();

  if (!snapshot.empty) {
    snapshot.forEach((document) => {
      songs.value.push({
        ...document.data(),
        docID: document.id
      });
    });
  }
};

watch(search, (newVal) => {
  if (newVal && newVal.length > 0) {
    searchSongs(newVal);
  } else {
    songs.value = [];
  }
});
</script>

<template>
  <form class="relative flex flex-1" action="#" method="GET">
    <label for="search-field" class="sr-only">Search</label>
    <MagnifyingGlassIcon
      class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      aria-hidden="true"
    />
    <input
      id="search-field"
      class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
      :placeholder="t('header.search')"
      type="search"
      name="search"
      v-model="search"
    />

    <div class="absolute left top-14 z-10">
      <RouterLink :to="{ name: 'song', params: { id: song.docID } }" v-for="song in songs" @click="reset">
        <div
          class="origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-gray-100 sm:w-96"
        >
          <div class="py-1">
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm">
              {{ song.modified_name }}
            </a>
          </div>
        </div>
      </RouterLink>
    </div>
  </form>
</template>
