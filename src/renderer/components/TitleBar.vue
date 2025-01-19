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
    class="titlebar"
  >
    <v-img v-if="!isMacOS" src="/icon.png" width="16" height="16" class="mr-2" />
    <span v-if="!isMacOS" class="text-body-2">{{ title }}</span>
    <div v-else class="text-center flex-grow-1 text-body-2">{{ title }}</div>
    <v-spacer />
    <v-btn
      variant="text"
      density="compact"
      size="x-small"
      :ripple="false"
      icon="mdi-dock-left"
      :color="getDrawerColor(leftDrawerOpen)"
      @click="leftDrawerOpen = !leftDrawerOpen"
    />
    <v-btn
      variant="text"
      density="compact"
      size="x-small"
      :ripple="false"
      icon="mdi-dock-bottom"
      :color="getDrawerColor(bottomDrawerOpen)"
      @click="bottomDrawerOpen = !bottomDrawerOpen"
    />
    <v-btn
      variant="text"
      density="compact"
      size="x-small"
      :ripple="false"
      icon="mdi-dock-right"
      :color="getDrawerColor(rightDrawerOpen)"
      @click="rightDrawerOpen = !rightDrawerOpen"
    />
    <template v-if="!isMacOS">
      <v-divider vertical class="mx-2" />
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

const leftDrawerOpen = ref(true)
const bottomDrawerOpen = ref(true)
const rightDrawerOpen = ref(true)

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

const getDrawerColor = (isOpen: boolean) => {
  if (theme.global.current.value.dark) {
    return isOpen ? 'grey-lighten-1' : 'grey-darken-3'
  }
  return isOpen ? 'grey-darken-1' : 'grey-lighten-1'
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
.titlebar {
  -webkit-app-region: drag;
  user-select: none;
}

.drawer-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 8px;
}

:deep(.v-btn) {
  -webkit-app-region: no-drag;
  height: 24px !important;
  width: 24px !important;
  margin: 0 1px;
  border-radius: 4px !important;
}

:deep(.v-btn:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-theme--light .v-btn:hover) {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

:deep(.v-btn::before) {
  display: none !important;
}

:deep(.v-ripple__container) {
  display: none !important;
}

:deep(.v-btn__content) {
  font-size: 14px;
}

:deep(.v-divider) {
  height: 14px;
  align-self: center;
}
</style>
