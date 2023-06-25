<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import useUserStore from '@/stores/user';
import { auth } from '@/includes/firebase';

import DefaultLayout from '@/layout/DefaultLayout.vue';

const route = useRoute();
const isNotFound = computed(() => route.name === 'not-found');

const userStore = useUserStore();

if (auth.currentUser) {
  userStore.userLoggedIn = true;
}
</script>

<template>
  <template v-if="isNotFound">
    <RouterView />
  </template>

  <DefaultLayout v-else>
    <RouterView />
  </DefaultLayout>
</template>
