<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import useUserStore from '@/stores/user';
import { auth } from '@/includes/firebase';

import BaseLayout from '@/components/BaseLayout.vue';

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

  <BaseLayout v-else>
    <RouterView />
  </BaseLayout>
</template>
