<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import useUserStore from '@/stores/user';
import useModalStore from '@/stores/modal';

defineEmits(['closeModal', 'toggleForm']);

const { t } = useI18n();

const loginSubmitting = ref(false);
const loginShowAlert = ref(false);
const loginAlertVariant = ref('bg-blue-50');
const loginAlertMessage = ref('');

const loginSchema = {
  email: 'required|min:3|max:100|email',
  password: 'required|min:8'
};

const login = async (values) => {
  loginSubmitting.value = true;
  loginShowAlert.value = true;
  loginAlertVariant.value = 'bg-blue-50 text-blue-800';
  loginAlertMessage.value = t('auth.pleaseWaitLogginYouIn');

  try {
    const userStore = useUserStore();
    await userStore.authenticate(values);
  } catch (error) {
    loginSubmitting.value = false;
    loginAlertVariant.value = 'bg-red-50 text-red-800';
    loginAlertMessage.value = t('auth.invalidLoginDetails');
    return;
  }

  const modalStore = useModalStore();
  if (modalStore.redirectPath) {
    loginSubmitting.value = false;
    loginShowAlert.value = false;
    modalStore.hide();
    router.push({ path: modalStore.redirectPath });
  } else {
    window.location.reload();
  }
};
</script>

<template>
  <div
    class="inline-block align-bottom bg-white text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl"
  >
    <XMarkIcon class="h-6 w-6 absolute top-4 right-4 cursor-pointer" @click.prevent="$emit('closeModal')" />

    <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">Log In</h2>

    <div v-if="loginShowAlert" class="text-sm font-medium p-4 rounded my-4" :class="loginAlertVariant">
      {{ loginAlertMessage }}
    </div>

    <VeeForm :validation-schema="loginSchema" class="my-8 text-sm" @submit="login">
      <!-- Email -->
      <div class="flex flex-col my-4">
        <label for="email" class="text-gray-700"> {{ t('auth.emailAddress') }} </label>
        <VeeField
          type="email"
          name="email"
          class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          :placeholder="t('auth.enterYourEmail')"
        />
        <ErrorMessage class="text-red-500 text-xs mt-1" name="email" />
      </div>

      <!-- Password -->
      <div class="flex flex-col my-4">
        <label for="password" class="text-gray-700"> {{ t('auth.password') }} </label>
        <VeeField
          type="password"
          name="password"
          class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          :placeholder="t('auth.enterYourPassword')"
        />
        <ErrorMessage class="text-red-500 text-xs mt-1" name="password" />
      </div>

      <div class="my-6 flex items-center justify-end space-x-4">
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
          type="submit"
        >
          {{ t('auth.logIn') }}
        </button>
      </div>
    </VeeForm>

    <p class="text-center text-sm text-gray-600 mt-4">
      {{ t('auth.dontHaveAccount') }} <br />
      <button
        class="text-blue-600 hover:text-blue-700 hover:underline"
        title="Sign Up"
        @click.prevent="$emit('toggleForm')"
      >
        {{ t('auth.signUpHere') }}
      </button>
    </p>
  </div>
</template>
