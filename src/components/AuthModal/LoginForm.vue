<script setup>
import { ref } from 'vue';
import useUserStore from '@/stores/user';

const loginSubmitting = ref(false);
const loginShowAlert = ref(false);
const loginAlertVariant = ref('bg-blue-500');
const loginAlertMessage = ref('Please, wait! We are logging you in.');

const loginSchema = {
  email: 'required|min:3|max:100|email',
  password: 'required|min:8'
};

const login = async (values) => {
  loginSubmitting.value = true;
  loginShowAlert.value = true;

  try {
    const userStore = useUserStore();
    await userStore.authenticate(values);
  } catch (error) {
    loginSubmitting.value = false;
    loginAlertVariant.value = 'bg-red-500';
    loginAlertMessage.value = 'Invalid login details';
    return;
  }

  window.location.reload();
};
</script>

<template>
  <div v-if="loginShowAlert" class="text-white text-center font-bold p-4 rounded mb-4" :class="loginAlertVariant">
    {{ loginAlertMessage }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>
