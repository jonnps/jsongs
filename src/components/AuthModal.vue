<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import useModalStore from '@/stores/modal';

const modal = useModalStore();
const activeTab = ref('login');

const schema = {
  name: 'required|min:3|max:100|alphaSpaces',
  email: 'required|min:3|max:100|email',
  password: 'required|min:8',
  confirm_password: 'passwordsMismatch:@password',
  tos: 'required'
};

const register = (values) => {
  console.log(values);
};
</script>

<template>
  <div class="fixed z-50 inset-0 overflow-y-auto" id="modal" :class="{ hidden: !modal.isOpen }">
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
              <XMarkIcon class="h-6 w-6" @click.prevent="modal.toggle()" />
            </div>
          </div>

          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-gray-900': activeTab === 'login',
                  'hover:text-bg-gray-900': activeTab === 'register'
                }"
                @click.prevent="activeTab = 'login'"
                href="#"
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

          <form v-show="activeTab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>

          <VeeForm v-show="activeTab === 'register'" :validation-schema="schema" @submit="register">
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <VeeField
                type="text"
                name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
              />
              <ErrorMessage class="text-red-500" name="name" />
            </div>

            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField
                type="email"
                name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <ErrorMessage class="text-red-500" name="email" />
            </div>

            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <VeeField name="password" :bails="false" v-slot="{ field, errors }">
                <input
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password"
                  type="password"
                  v-bind="field"
                />
                <div v-for="error in errors" class="text-red-600" :key="error">
                  {{ error }}
                </div>
              </VeeField>
            </div>

            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <VeeField
                type="password"
                name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />
              <ErrorMessage class="text-red-500" name="confirm_password" />
            </div>

            <div class="mb-3 pl-6">
              <VeeField type="checkbox" name="tos" class="w-4 h-4 float-left -ml-6 mt-1 rounded" value="1" />
              <label class="inline-block">Accept terms of service</label>
              <ErrorMessage class="text-red-500" name="tos" />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>
