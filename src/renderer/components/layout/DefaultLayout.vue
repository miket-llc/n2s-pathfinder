<script setup lang="ts">
import StatusBar from '@/renderer/components/StatusBar.vue'
</script>

<template>
  <v-app>
    <slot name="titlebar"></slot>
    <v-main class="main-content">
      <slot></slot>
    </v-main>
    <StatusBar />
  </v-app>
</template>

<style scoped>
.main-content {
  padding-top: 0 !important;  /* Remove extra padding since titlebar handles its own height */
  padding-bottom: 22px !important;
}
</style>
