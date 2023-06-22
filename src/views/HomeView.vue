<script setup>
import { ref } from 'vue'

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { Bars3Icon, Cog6ToothIcon, MusicalNoteIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/vue/20/solid'

import useModalStore from '@/stores/modal'

import MainSidebar from '@/components/MainSidebar.vue'
import AuthModal from '@/components/AuthModal.vue'

const navigation = [{ name: 'Musics', href: '#', icon: MusicalNoteIcon, current: true }]

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
]

const sidebarOpen = ref(false)

const modal = useModalStore()
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
            >
              <div class="flex h-16 shrink-0 justify-center items-center text-white">
                <span class="text-2xl font-bold">JSongs</span>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <a
                          :href="item.href"
                          :class="[
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          ]"
                        >
                          <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <MainSidebar :navigation="navigation" />

  <div class="lg:pl-72 h-full relative">
    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="relative flex flex-1" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <MagnifyingGlassIcon
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="-m-1.5 flex items-center p-1.5" @click.prevent="modal.toggle()">
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true"
                  >Login / Register</span
                >
              </span>
            </MenuButton>
          </Menu>
        </div>
      </div>
    </div>

    <main class="py-10">
      <div class="px-4 sm:px-6 lg:px-8 relative">
        <!-- Your content -->

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
      </div>
    </main>
  </div>

  <AuthModal />
</template>
