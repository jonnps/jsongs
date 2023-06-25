<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import useUserStore from '@/stores/user';

defineEmits(['closeModal', 'toggleForm']);

const { t } = useI18n();

const registerSchema = {
  name: 'required|min:3|max:100|alphaSpaces',
  email: 'required|min:3|max:100|email',
  password: 'required|min:8',
  confirm_password: 'passwordsMismatch:@password',
  tos: 'required'
};

const regSubmitting = ref(false);
const regShowAlert = ref(false);
const regAlertVariant = ref('');
const regAlertMessage = ref('');

const register = async (values) => {
  regShowAlert.value = true;
  regSubmitting.value = true;
  regAlertVariant.value = 'bg-blue-50 text-blue-800';
  regAlertMessage.value = 'Please, wait! Your account is being created.';

  try {
    const userStore = useUserStore();
    await userStore.register(values);
  } catch (error) {
    regSubmitting.value = false;
    regAlertVariant.value = 'bg-red-50 text-red-800';
    regAlertMessage.value = 'An unexpected error occurred. Please try again later.';
    return;
  }

  window.location.reload();
};
</script>

<template>
  <div
    class="inline-block align-bottom bg-white text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl"
  >
    <XMarkIcon class="h-6 w-6 absolute top-4 right-4 cursor-pointer" @click.prevent="$emit('closeModal')" />

    <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">Sign Up</h2>

    <div v-if="regShowAlert" class="text-sm font-medium p-4 rounded my-4" :class="regAlertVariant">
      {{ regAlertMessage }}
    </div>

    <VeeForm :validation-schema="registerSchema" class="my-8 text-sm" @submit="register">
      <div class="flex flex-col my-4">
        <label for="name" class="text-gray-700">{{ t('auth.name') }}</label>
        <VeeField
          type="text"
          name="name"
          class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          :placeholder="t('auth.enterYourName')"
        />
        <ErrorMessage class="text-red-500 text-xs mt-1" name="name" />
      </div>

      <div class="flex flex-col my-4">
        <label for="email" class="text-gray-700">{{ t('auth.emailAddress') }}</label>
        <VeeField
          type="email"
          name="email"
          class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          :placeholder="t('auth.enterYourEmail')"
        />
        <ErrorMessage class="text-red-500 text-xs mt-1" name="email" />
      </div>

      <div class="flex flex-col my-4">
        <label for="password" class="text-gray-700">{{ t('auth.password') }}</label>
        <VeeField v-slot="{ field }" name="password" :bails="false">
          <div class="relative flex items-center mt-2">
            <input
              type="password"
              v-bind="field"
              class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
              :placeholder="t('auth.enterYourPassword')"
            />
          </div>
          <ErrorMessage class="text-red-500 text-xs mt-1" name="password" />
        </VeeField>
      </div>

      <div class="flex flex-col my-4">
        <label for="confirm_password" class="text-gray-700">{{ t('auth.confirmPassword') }}</label>
        <VeeField
          type="password"
          name="confirm_password"
          class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          :placeholder="t('auth.enterYourPasswordAgain')"
        />
        <ErrorMessage class="text-red-500 text-xs mt-1" name="confirm_password" />
      </div>

      <div class="flex items-center">
        <VeeField id="tos" type="checkbox" name="tos" class="mr-2 focus:ring-0 rounded" value="false" />
        <label for="tos" class="text-gray-700">
          {{ t('auth.iAcceptThe') }}
          <a href="#" class="text-blue-600 hover:text-blue-700 hover:underline">{{ t('auth.terms') }}</a>
          {{ t('auth.and') }}
          <a href="#" class="text-blue-600 hover:text-blue-700 hover:underline">{{ t('auth.privacyPolicy') }}</a>
        </label>
      </div>
      <ErrorMessage class="text-red-500 text-xs mt-1" name="tos" />

      <div class="my-6 flex items-center justify-end space-x-4">
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
          type="submit"
        >
          {{ t('auth.signUp') }}
        </button>
      </div>
    </VeeForm>

    <p class="text-center text-sm text-gray-600 mt-2">
      {{ t('auth.alreadyHaveAnAccount') }} <br />
      <button class="text-blue-600 hover:text-blue-700 hover:underline" title="Sign In" @click="$emit('toggleForm')">
        {{ t('auth.signInHere') }}
      </button>
    </p>
  </div>
</template>
