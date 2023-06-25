<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Menu, MenuButton } from '@headlessui/vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

import MainSidebar from '@/components/MainSidebar.vue';
import AuthModal from '@/components/AuthModal/AuthModal.vue';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer.vue';

const { t } = useI18n();

const sidebarOpen = ref(false);

const modal = useModalStore();
const user = useUserStore();
</script>

<template>
  <!-- Static sidebar for desktop -->
  <MainSidebar :sidebar-open="sidebarOpen" @close-sidebar="sidebarOpen = false" />

  <div class="lg:pl-72 h-full relative">
    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
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
            :placeholder="t('header.search')"
            type="search"
            name="search"
          />
        </form>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" class="relative">
            <MenuButton v-if="!user.userLoggedIn" class="-m-1.5 flex items-center p-1.5" @click.prevent="modal.show">
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                  t('header.loginRegister')
                }}</span>
              </span>
            </MenuButton>
            <MenuButton v-else class="-m-1.5 flex items-center p-1.5" @click.prevent="user.signOut">
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Logout</span>
              </span>
            </MenuButton>
          </Menu>
        </div>
      </div>
    </div>

    <main>
      <div class="relative">
        <slot></slot>
      </div>
    </main>

    <AudioPlayer />
  </div>

  <AuthModal />
</template>
