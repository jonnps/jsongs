<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

import { XMarkIcon, MusicalNoteIcon, FolderIcon } from '@heroicons/vue/24/outline';

const { t, locale } = useI18n();

defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['closeSidebar']);

const navigation = computed(() => [
  { name: t('sidebar.songs'), to: '/', icon: MusicalNoteIcon, current: true },
  { name: t('sidebar.manage'), to: '/manage', icon: FolderIcon, current: false }
]);

const changeLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="$emit('closeSidebar')">
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
                <button type="button" class="-m-2.5 p-2.5" @click="$emit('closeSidebar')">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div class="flex h-16 shrink-0 justify-center items-center text-white">
                <span class="text-2xl font-bold">JSongs</span>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <RouterLink
                          :to="item.to"
                          class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                          exact-active-class="bg-gray-800 text-white"
                          @click="$emit('closeSidebar')"
                        >
                          <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                          {{ item.name }}
                        </RouterLink>
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

  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div class="flex gap-3 h-32 shrink-0 justify-center items-center text-white">
        <span class="text-2xl font-bold">JSongs</span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <RouterLink
                  :to="item.to"
                  class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                  exact-active-class="bg-gray-800 text-white"
                >
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
        <div class="mt-auto flex justify-center gap-3 text-white">
          <button @click="changeLocale('pt')">
            <img class="h-8 w-8" src="/assets/ptBR_icon.svg" />
          </button>
          <button @click="changeLocale('en')">
            <img class="h-8 w-8" src="/assets/en_icon.svg" />
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
