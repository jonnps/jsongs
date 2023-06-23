<script setup>
import { ref } from 'vue';
import useUserStore from '@/stores/user';

const registerSchema = {
  name: 'required|min:3|max:100|alphaSpaces',
  email: 'required|min:3|max:100|email',
  password: 'required|min:8',
  confirm_password: 'passwordsMismatch:@password',
  tos: 'required'
};

const regSubmitting = ref(false);
const regShowAlert = ref(false);
const regAlertVariant = ref('bg-blue-500');
const regAlertMessage = ref('Please, wait! Your account is being created.');

const register = async (values) => {
  regShowAlert.value = true;
  regSubmitting.value = true;
  regAlertVariant.value = 'bg-blue-500';
  regAlertMessage.value = 'Please, wait! Your account is being created.';

  try {
    const userStore = useUserStore();
    await userStore.register(values);
  } catch (error) {
    regSubmitting.value = false;
    regAlertVariant.value = 'bg-red-500';
    regAlertMessage.value = 'An unexpected error occurred. Please try again later.';
    return;
  }

  window.location.reload();
};
</script>

<template>
  <div v-if="regShowAlert" class="text-white text-center font-bold p-4 rounded mb-4" :class="regAlertVariant">
    {{ regAlertMessage }}
  </div>

  <VeeForm :validation-schema="registerSchema" @submit="register">
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
      <VeeField v-slot="{ field, errors }" name="password" :bails="false">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          type="password"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">
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
      :disabled="regSubmitting"
    >
      Submit
    </button>
  </VeeForm>
</template>
