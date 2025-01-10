<script setup lang="ts">
import { ref } from 'vue'
import StatusBar from '@/renderer/components/StatusBar.vue'

const drawerWidth = ref(240)

const startResize = (e: MouseEvent) => {
  const startX = e.clientX
  const startWidth = drawerWidth.value

  const resize = (e: MouseEvent) => {
    const newWidth = startWidth + (e.clientX - startX)
    if (newWidth >= 160 && newWidth <= 600) {
      drawerWidth.value = newWidth
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

    <div class="navigation-drawer">
      <div class="resize-handle" @mousedown.prevent="startResize"></div>
      <v-toolbar density="compact" color="surface" class="drawer-header">
        <v-toolbar-title class="text-caption">Explorer</v-toolbar-title>
      </v-toolbar>
      <slot name="navigation"></slot>
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
  margin-left: v-bind(drawerWidth + 'px');
  margin-top: 0 !important;
  height: calc(100vh - 54px) !important;
}

.navigation-drawer {
  position: absolute;
  top: 32px;
  left: 0;
  width: v-bind(drawerWidth + 'px');
  height: calc(100vh - 54px);
  background: var(--v-surface-variant);
  border-right: 1px solid var(--v-border-color);
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
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: ew-resize;
  z-index: 2;
}

.resize-handle:hover {
  background: var(--v-primary-base);
  opacity: 0.1;
}
</style>
