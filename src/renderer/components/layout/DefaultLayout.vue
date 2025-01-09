<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const leftDrawer = ref(true)
const rightDrawer = ref(false)
const bottomPanel = ref(false)
const leftDrawerWidth = ref(240)
const rightDrawerWidth = ref(240)
const bottomPanelHeight = ref(200)
const isResizing = ref(false)

const togglePanel = (panel: 'left' | 'right' | 'bottom') => {
  switch (panel) {
    case 'left':
      leftDrawer.value = !leftDrawer.value
      break
    case 'right':
      rightDrawer.value = !leftDrawer.value
      break
    case 'bottom':
      bottomPanel.value = !bottomPanel.value
      break
  }
}

onMounted(() => {
  const savedWidth = localStorage.getItem('explorerWidth')
  if (savedWidth) {
    leftDrawerWidth.value = parseInt(savedWidth)
  }
})

watch(leftDrawerWidth, (newWidth) => {
  localStorage.setItem('explorerWidth', newWidth.toString())
})

const startResize = (event: MouseEvent) => {
  event.preventDefault()
  isResizing.value = true
  const startX = event.clientX
  const startWidth = leftDrawerWidth.value

  const resize = (e: MouseEvent) => {
    if (!isResizing.value) return
    const newWidth = startWidth + e.clientX - startX
    if (newWidth >= 160 && newWidth <= 600) {
      leftDrawerWidth.value = newWidth
    }
  }

  const stopResize = () => {
    isResizing.value = false
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

    <!-- Explorer Panel -->
    <v-navigation-drawer
      v-model="leftDrawer"
      :width="leftDrawerWidth"
      location="left"
      permanent
      class="elevation-1"
    >
      <div class="resize-handle" @mousedown.stop="startResize"></div>
      <v-toolbar density="compact">
        <v-toolbar-title class="text-subtitle-2">EXPLORER</v-toolbar-title>
      </v-toolbar>
      <v-list density="compact">
        <slot name="explorer-content"></slot>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main class="main-content">
      <v-container fluid class="fill-height pa-0">
        <slot></slot>
      </v-container>

      <!-- Bottom Panel -->
      <v-expand-transition>
        <div v-if="bottomPanel" class="bottom-panel" :style="{ height: `${bottomPanelHeight}px` }">
          <v-sheet class="fill-height"> Terminal </v-sheet>
        </div>
      </v-expand-transition>
    </v-main>

    <!-- Right Sidebar -->
    <v-navigation-drawer
      v-model="rightDrawer"
      location="right"
      :width="rightDrawerWidth"
      class="elevation-1"
    >
      <v-list>
        <v-list-item title="Outline" />
      </v-list>
    </v-navigation-drawer>

    <!-- Status Bar -->
    <v-footer app class="status-bar px-2">
      <v-btn size="small" variant="text" @click="togglePanel('left')">
        <v-icon>{{ leftDrawer ? 'mdi-dock-left' : 'mdi-dock-right' }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn size="small" variant="text" @click="togglePanel('bottom')"> Terminal </v-btn>
    </v-footer>
  </v-app>
</template>

<style scoped>
.main-content {
  padding-top: 32px;
}

.bottom-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--v-surface-variant);
  border-top: 1px solid var(--v-border-color);
  resize: vertical;
  overflow: auto;
}

.resize-handle {
  position: absolute;
  right: -4px;
  top: 0;
  bottom: 0;
  width: 8px;
  cursor: ew-resize;
  background: transparent;
  z-index: 999;
}

.resize-handle:hover {
  background: var(--v-primary-base);
  opacity: 0.1;
}

.main-content {
  padding-top: 32px;
}

.bottom-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--v-surface-variant);
  border-top: 1px solid var(--v-border-color);
  resize: vertical;
  overflow: auto;
}

.v-navigation-drawer {
  top: 32px !important;
  height: calc(100% - 54px) !important;
}

.status-bar {
  height: 22px !important;
}
</style>
