<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Ready')
</script>

<template>
  <v-footer app class="status-bar" color="surface">
    <v-container fluid class="pa-0 d-flex align-center">
      <span class="text-caption">{{ status }}</span>
    </v-container>
  </v-footer>
</template>

<style scoped>
.status-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 22px !important;
  min-height: 22px !important;
  max-height: 22px !important;
  z-index: 999;
  border-top: 1px solid rgba(128, 128, 128, 0.35);
}
</style>
