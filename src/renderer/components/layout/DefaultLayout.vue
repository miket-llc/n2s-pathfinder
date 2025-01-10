<script setup lang="ts">
import { ref } from 'vue'
import StatusBar from '@/renderer/components/StatusBar.vue'

const leftDrawerWidth = ref(240)
const rightDrawerWidth = ref(240)

const startLeftResize = (e: MouseEvent) => {
  const startX = e.clientX
  const startWidth = leftDrawerWidth.value

  const resize = (e: MouseEvent) => {
    const newWidth = startWidth + (e.clientX - startX)
    if (newWidth >= 160 && newWidth <= 600) {
      leftDrawerWidth.value = newWidth
    }
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResize)
}

const startRightResize = (e: MouseEvent) => {
  const startX = e.clientX
  const startWidth = rightDrawerWidth.value

  const resize = (e: MouseEvent) => {
    const newWidth = startWidth - (e.clientX - startX)
    if (newWidth >= 160 && newWidth <= 600) {
      rightDrawerWidth.value = newWidth
    }
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResize)
}
</script>

<template>
  <v-app>
    <slot name="titlebar"></slot>

    <div class="left-drawer">
      <div class="resize-handle" @mousedown.prevent="startLeftResize"></div>
      <v-toolbar density="compact" color="surface" class="drawer-header">
        <v-toolbar-title class="text-caption">Explorer</v-toolbar-title>
      </v-toolbar>
      <slot name="left-drawer"></slot>
    </div>

    <div class="right-drawer">
      <div class="resize-handle" @mousedown.prevent="startRightResize"></div>
      <v-toolbar density="compact" color="surface" class="drawer-header">
        <v-toolbar-title class="text-caption">Details</v-toolbar-title>
      </v-toolbar>
      <slot name="right-drawer"></slot>
    </div>

    <v-main class="main-content">
      <slot></slot>
    </v-main>

    <StatusBar />
  </v-app>
</template>

<style scoped>
.v-app {
  padding: 0 !important;
  margin: 0 !important;
}

.main-content {
  padding: 0 0 22px 0 !important;
  margin-left: v-bind(leftDrawerWidth + 'px');
  margin-right: v-bind(rightDrawerWidth + 'px');
  margin-top: 0 !important;
  height: calc(100vh - 54px) !important;
}

.left-drawer {
  position: absolute;
  top: 32px;
  left: 0;
  width: v-bind(leftDrawerWidth + 'px');
  height: calc(100vh - 54px);
  background: var(--v-surface-variant);
  border-right: 1px solid var(--v-border-color);
  display: flex;
  flex-direction: column;
}

.right-drawer {
  position: absolute;
  top: 32px;
  right: 0;
  width: v-bind(rightDrawerWidth + 'px');
  height: calc(100vh - 54px);
  background: var(--v-surface-variant);
  border-left: 1px solid var(--v-border-color);
  display: flex;
  flex-direction: column;
}

.navigation-drawer :deep(.v-navigation-drawer__content) {
  padding: 0;
  margin: 0;
  height: 100%;
}

.drawer-header {
  height: 28px !important;
  min-height: 28px !important;
  padding: 0 8px !important;
}

:deep(.v-toolbar__content) {
  padding: 0 !important;
  min-height: 28px !important;
}

:deep(.v-main) {
  padding: 0 !important;
}

.resize-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: ew-resize;
  z-index: 2;
}

.left-drawer .resize-handle {
  right: -2px;
}

.right-drawer .resize-handle {
  left: -2px;
}

.resize-handle:hover {
  background: var(--v-primary-base);
  opacity: 0.1;
}
</style>
