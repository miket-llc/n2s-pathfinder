<template>
  <v-system-bar
    window
    :color="
      theme.global.current.value.dark
        ? isFocused
          ? 'surface'
          : '#0a0c0f'
        : isFocused
          ? 'background'
          : '#f3f3f3'
    "
    class="custom-titlebar"
  >
    <template v-if="!isMacOS">
      <v-img src="/icon.png" width="16" height="16" class="mr-2" />
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import type { IpcRendererEvent } from 'electron'

const theme = useTheme()
const title = 'N2S Pathfinder'
const isMacOS = window.mainApi.platform === 'darwin'
const isMaximized = ref(false)
const isFocused = ref(true)

type WindowAction = 'minimize' | 'maximize' | 'close'

const windowControl = (action: WindowAction) => {
  window.mainApi.send('window-controls', action)
  if (action === 'maximize') {
    isMaximized.value = !isMaximized.value
  }
}

const updateFocus = (event: IpcRendererEvent, focused: boolean) => {
  isFocused.value = focused
}

const updateWindowState = (event: IpcRendererEvent, maximized: boolean) => {
  isMaximized.value = maximized
}

onMounted(() => {
  window.mainApi.on('window-focused', updateFocus)
  window.mainApi.on('window-state', updateWindowState)
  window.mainApi.send('window-state', false) // Add initial state payload
})

onUnmounted(() => {
  window.mainApi.off('window-focused', updateFocus)
  window.mainApi.off('window-state', updateWindowState)
})
</script>

<style scoped>
.custom-titlebar {
  -webkit-app-region: drag;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  z-index: 1000;
}

.v-btn {
  -webkit-app-region: no-drag;
}
</style>
