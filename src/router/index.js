import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/user';
import useModalStore from '@/stores/modal';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/ManageView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (!to.meta.requiresAuth || (to.meta.requiresAuth && userStore.userLoggedIn)) {
    next();
    return;
  }

  const authModal = useModalStore();
  authModal.show(to.path);
});

export default router;
