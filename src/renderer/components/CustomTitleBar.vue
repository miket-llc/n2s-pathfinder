<template>
  <v-system-bar
    window
    :color="theme.global.current.value.dark ? 'surface' : 'background'"
    :height="isMacOS ? '28' : '32'"
    class="custom-titlebar"
  >
    <template v-if="!isMacOS">
      <v-img
        src="/icon.png"
        width="16"
        height="16"
        class="mr-2"
      />
      <span class="text-body-2">{{ title }}</span>
      <v-spacer />
      <v-btn
        variant="text"
        density="comfortable"
        icon="mdi-window-minimize"
        @click="windowControl('minimize')"
      />
      <v-btn
        variant="text"
        density="comfortable"
        :icon="isMaximized ? 'mdi-window-restore' : 'mdi-window-maximize'"
        @click="windowControl('maximize')"
      />
      <v-btn
        variant="text"
        density="comfortable"
        icon="mdi-close"
        color="error"
        @click="windowControl('close')"
      />
    </template>
    <template v-else>
      <div class="text-center flex-grow-1 text-body-2">{{ title }}</div>
    </template>
  </v-system-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const title = 'N2S Pathfinder'
const isMacOS = window.electronAPI.platform === 'darwin'
const isMaximized = ref(false)

const windowControl = (action: string) => {
  window.electronAPI.send('window-controls', action)
  if (action === 'maximize') {
    isMaximized.value = !isMaximized.value
  }
}
</script>

<style scoped>
.custom-titlebar {
  -webkit-app-region: drag;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;  /* Increase z-index to be above all */
  height: 32px;   /* Explicit height */
}

.v-btn {
  -webkit-app-region: no-drag;
}
</style>
