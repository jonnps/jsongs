<script setup>
const musics = [
  {
    artist: 'Random Artist',
    name: 'Music Name'
  },
  {
    artist: 'Random Artist',
    name: 'Music Name'
  },
  {
    artist: 'Random Artist',
    name: 'Music Name'
  },
  {
    artist: 'Random Artist',
    name: 'Music Name'
  }
];
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
    <div
      v-for="music in musics"
      :key="music.name"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ music.name }}</p>
          <p class="truncate text-sm text-gray-500">{{ music.artist }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
