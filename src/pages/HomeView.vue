<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { songsCollection } from '@/includes/firebase';

const songs = ref([]);
let pendingRequest = false;
let lastDoc = null;
let hasMore = true;

const getSongs = async () => {
  if (pendingRequest || !hasMore) return;
  pendingRequest = true;

  let query = songsCollection.orderBy('modified_name').limit(24);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const snapshot = await query.get();

  if (!snapshot.empty) {
    snapshot.forEach((document) => {
      songs.value.push({
        ...document.data(),
        docID: document.id
      });
    });

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  } else {
    hasMore = false;
  }

  pendingRequest = false;
};

const handleScroll = () => {
  const { scrollTop, scrollHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === scrollHeight;

  if (bottomOfWindow) {
    getSongs();
  }
};

onMounted(async () => {
  getSongs();

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div
      v-for="song in songs"
      :key="song.docID"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="min-w-0 flex-1">
        <RouterLink :to="{ name: 'song', params: { id: song.docID } }" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ song.modified_name }}</p>
          <p class="truncate text-sm text-gray-500">{{ song.display_name }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
