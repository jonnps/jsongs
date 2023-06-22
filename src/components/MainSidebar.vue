<script>
export default {
  name: 'MainSidebar',
  props: {
    navigation: Array
  }
}
</script>

<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div class="flex gap-3 h-32 shrink-0 justify-center items-center text-white">
        <span class="text-2xl font-bold">JSongs</span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  ]"
                >
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
