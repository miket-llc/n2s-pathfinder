<script setup lang="ts">
import { ref } from 'vue'
import { DefaultLayout } from '@/renderer/components/layout'
import CustomTitleBar from '@/renderer/components/CustomTitleBar.vue'

// Drawer visibility states
const leftDrawerOpen = ref(true)
const bottomDrawerOpen = ref(true)
const rightDrawerOpen = ref(true)
</script>

<template>
  <DefaultLayout
    :left-drawer-open="leftDrawerOpen"
    :bottom-drawer-open="bottomDrawerOpen"
    :right-drawer-open="rightDrawerOpen"
  >
    <template #titlebar>
      <CustomTitleBar
        :title="'N2S Pathfinder'"
        :left-drawer-open="leftDrawerOpen"
        :bottom-drawer-open="bottomDrawerOpen"
        :right-drawer-open="rightDrawerOpen"
      />
    </template>
    <router-view />
  </DefaultLayout>
</template>

<style>
html {
  overflow-y: auto !important;
  user-select: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>
