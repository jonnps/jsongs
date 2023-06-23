<script setup>
import { RouterView } from 'vue-router';
import useUserStore from '@/stores/user';
import { auth } from '@/includes/firebase';

const userStore = useUserStore();

if (auth.currentUser) {
  userStore.userLoggedIn = true;
}
</script>

<template>
  <RouterView />
</template>
