<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const tools = [
  {
    name: 'Vite',
    href: 'https://vitejs.dev/',
    icon: '/assets/icons/logos/vitejs.svg'
  },
  {
    name: 'Vuejs',
    href: 'https://vuejs.org/',
    icon: '/assets/icons/logos/vue.svg'
  },
  {
    name: 'Pinia',
    href: 'https://pinia.vuejs.org/',
    icon: '/assets/icons/logos/pinia.svg'
  },
  {
    name: 'Firebase',
    href: 'https://firebase.google.com/',
    icon: '/assets/icons/logos/firebase.svg'
  },
  {
    name: 'Vee-Validate',
    href: 'https://vee-validate.logaretm.com/v4/',
    icon: '/assets/icons/logos/veevalidate.svg'
  },
  {
    name: 'Vue I18n',
    href: 'https://kazupon.github.io/vue-i18n/',
    icon: '/assets/icons/logos/vuei18n.svg'
  },
  {
    name: 'Cypress',
    href: 'https://www.cypress.io/',
    icon: '/assets/icons/logos/cypress.svg'
  },
  {
    name: 'Vitest',
    href: 'https://github.com/vitest-dev/vitest',
    icon: '/assets/icons/logos/vitest.svg'
  },
  {
    name: 'Workbox',
    href: 'https://developers.google.com/web/tools/workbox',
    icon: '/assets/icons/logos/workbox.svg'
  },

  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    icon: '/assets/icons/logos/tailwindcss.svg'
  },
  {
    name: 'Headless UI',
    href: 'https://headlessui.dev/',
    icon: '/assets/icons/logos/headlessui.svg'
  }
];
</script>

<template>
  <div class="bg-white py-8">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">JSongs</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          {{ t('about.description') }}
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-8 lg:max-w-none">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">Tools used</h2>
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div v-for="tool in tools" :key="tool.name" class="flex flex-col">
            <dt class="flex items-center text-base gap-3 font-semibold leading-7 text-gray-900 mb-4">
              <div class="flex h-10 w-10 items-center justify-center">
                <img :src="tool.icon" alt="" class="w-8 h-8" />
              </div>
              {{ tool.name }}
            </dt>
            <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
              <p class="flex-auto">{{ t(`about.tools.${tool.name}.description`) }}</p>
              <p class="mt-6">
                <a :href="tool.href" target="_blank" class="text-sm font-semibold leading-6 text-indigo-600"
                  >{{ t('about.learnmore') }} <span aria-hidden="true">→</span></a
                >
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
