<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import useModalStore from '@/stores/modal';

import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const modal = useModalStore();
const activeTab = ref('login');
</script>

<template>
  <div id="modal" class="fixed z-50 inset-0 overflow-y-auto" :class="{ hidden: !modal.isOpen }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="py-4 text-left px-6">
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <div class="modal-close cursor-pointer z-50">
              <XMarkIcon class="h-6 w-6" @click.prevent="modal.hide" />
            </div>
          </div>

          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                href="#"
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-gray-900': activeTab === 'login',
                  'hover:text-bg-gray-900': activeTab === 'register'
                }"
                @click.prevent="activeTab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-gray-900': activeTab === 'register',
                  'hover:text-bg-gray-900': activeTab === 'login'
                }"
                href="#"
                @click.prevent="activeTab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <LoginForm v-if="activeTab === 'login'" />
          <RegisterForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>
