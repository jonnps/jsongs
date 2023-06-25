<script setup>
import { PlayIcon, PauseIcon } from '@heroicons/vue/24/solid';

import RewindIcon from './RewindIcon.vue';
import ForwardIcon from './ForwardIcon.vue';
import MuteIcon from './MuteIcon.vue';
import PlaybackRateIcon from './PlaybackRateIcon.vue';

import usePlayerStore from '@/stores/player';

const playerStore = usePlayerStore();
</script>
<template>
  <div
    class="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120 border-t border-gray-100"
    style="padding-left: inherit"
  >
    <div
      class="flex items-center gap-6 bg-white/90 px-4 py-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6"
    >
      <div class="hidden md:block">
        <button
          type="button"
          class="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-blue-950 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-14 w-14 focus:ring-2 focus:ring-offset-2"
          @click="playerStore.toggleAudio"
        >
          <div class="absolute -inset-3 md:hidden"></div>
          <PlayIcon v-if="!playerStore.playing" class="fill-white group-active:fill-white/80 h-7 w-7" />
          <PauseIcon v-else class="fill-white group-active:fill-white/80 h-7 w-7" />
        </button>
      </div>
      <div class="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        <div class="truncate text-center text-sm font-bold leading-6 md:text-left">
          {{ playerStore.currentSong.modified_name }}
          <span class="block font-normal text-sm">{{ playerStore.currentSong.display_name }}</span>
        </div>
        <div class="flex justify-between gap-6">
          <div class="flex items-center md:hidden">
            <button
              type="button"
              class="group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none"
              aria-label="Mute"
              @click="playerStore.toggleMute"
            >
              <div class="absolute -inset-4 md:hidden"></div>
              <MuteIcon
                :muted="playerStore.muted"
                class="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700"
              />
            </button>
          </div>
          <div class="flex flex-none items-center gap-4">
            <button
              type="button"
              class="group relative rounded-full focus:outline-none"
              aria-label="Rewind 10 seconds"
              @click.prevent="playerStore.changeSeek(-10)"
            >
              <div class="absolute -inset-4 -right-2 md:hidden"></div>
              <RewindIcon class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700" />
            </button>
            <div class="md:hidden">
              <button
                type="button"
                class="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-blue-950 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-14 w-14 focus:ring-2 focus:ring-offset-2"
                @click="playerStore.toggleAudio"
              >
                <div class="absolute -inset-3 md:hidden"></div>
                <PlayIcon v-if="!playerStore.playing" class="fill-white group-active:fill-white/80 h-7 w-7" />
                <PauseIcon v-else class="fill-white group-active:fill-white/80 h-7 w-7" />
              </button>
            </div>
            <button
              type="button"
              class="group relative rounded-full focus:outline-none"
              aria-label="Fast-forward 10 seconds"
              @click.prevent="playerStore.changeSeek(+10)"
            >
              <div class="absolute -inset-4 -left-2 md:hidden"></div>
              <ForwardIcon class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700" />
            </button>
          </div>
          <div
            role="group"
            class="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
          >
            <div
              class="relative w-full bg-slate-100 md:rounded-full"
              style="position: relative; touch-action: none"
              :class="{ 'cursor-pointer': playerStore?.sound?.playing }"
              @click.prevent="playerStore.updateSeek"
            >
              <div
                class="h-2 md:rounded-l-xl md:rounded-r-md bg-slate-700"
                :style="{ width: playerStore.playerProgress }"
              ></div>
              <div class="absolute top-1/2 -translate-x-1/2" :style="{ left: playerStore.playerProgress }">
                <div
                  class="h-4 rounded-full w-1 bg-slate-700"
                  style="position: absolute; transform: translate(-50%, -50%); touch-action: none; left: 0%"
                  :style="{ left: playerStore.playerProgress }"
                ></div>
              </div>
            </div>
            <div class="hidden items-center gap-2 md:flex">
              <output class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block text-slate-500"
                >{{ playerStore.seek }}
              </output>
              <span class="text-sm leading-6 text-slate-300" aria-hidden="true">/</span>
              <span class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-slate-500 md:block">
                {{ playerStore.duration }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <button
                type="button"
                class="relative flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                aria-label="Playback rate"
                @click="playerStore.changeRate"
              >
                <div class="absolute -inset-4 md:hidden"></div>

                <PlaybackRateIcon :rate="playerStore.rate" class="h-4 w-4" />
              </button>
            </div>
            <div class="hidden items-center md:flex">
              <button
                type="button"
                class="group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none"
                aria-label="Mute"
                @click="playerStore.toggleMute"
              >
                <div class="absolute -inset-4 md:hidden"></div>
                <MuteIcon
                  :muted="playerStore.muted"
                  class="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
