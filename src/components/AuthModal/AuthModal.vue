<script setup>
import { ref } from 'vue';

import useModalStore from '@/stores/modal';

import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const modal = useModalStore();
const activeTab = ref('login');

const changeTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div id="modal" class="fixed z-50 inset-0 overflow-y-auto" :class="{ hidden: !modal.isOpen }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <template v-if="activeTab === 'login'">
        <LoginForm :change-tab="changeTab" @close-modal="modal.hide" @toggle-form="activeTab = 'register'" />
      </template>
      <template v-else-if="activeTab === 'register'">
        <RegisterForm :change-tab="changeTab" @close-modal="modal.hide" @toggle-form="activeTab = 'login'" />
      </template>
    </div>
  </div>
</template>
