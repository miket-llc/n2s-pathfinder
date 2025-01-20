<template>
  <v-app>
    <slot name="titlebar"></slot>

    <!-- Left Drawer -->
    <div
      v-show="props.leftDrawerOpen"
      class="left-drawer"
      :style="{ width: leftDrawerWidth + 'px' }"
    >
      <div class="resize-handle right" @mousedown="startLeftResize"></div>
      <NavigationTree />
    </div>

    <!-- Right Drawer -->
    <div
      v-show="props.rightDrawerOpen"
      class="right-drawer"
      :style="{ width: rightDrawerWidth + 'px' }"
    >
      <div class="resize-handle left" @mousedown="startRightResize"></div>
      <slot name="right-drawer"></slot>
    </div>

    <!-- Bottom Drawer -->
    <div
      v-show="props.bottomDrawerOpen"
      class="bottom-drawer"
      :style="{
        height: bottomDrawerHeight + 'px',
        left: props.leftDrawerOpen ? leftDrawerWidth + 'px' : '0',
        right: props.rightDrawerOpen ? rightDrawerWidth + 'px' : '0'
      }"
    >
      <div class="resize-handle top" @mousedown="startBottomResize"></div>
      <slot name="bottom-drawer"></slot>
    </div>

    <!-- Main Content -->
    <v-main
      class="main-content"
      :style="{
        marginLeft: props.leftDrawerOpen ? `${leftDrawerWidth}px` : '0',
        marginRight: props.rightDrawerOpen ? `${rightDrawerWidth}px` : '0',
        marginBottom: props.bottomDrawerOpen ? `${bottomDrawerHeight}px` : '22px'
      }"
    >
      <TabView />
    </v-main>

    <StatusBar />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import StatusBar from '../StatusBar.vue'
import NavigationTree from '../NavigationTree.vue'
import TabView from '../TabView.vue'

const props = defineProps({
  leftDrawerOpen: { type: Boolean, default: true },
  rightDrawerOpen: { type: Boolean, default: true },
  bottomDrawerOpen: { type: Boolean, default: true }
})

const leftDrawerWidth = ref(240)
const rightDrawerWidth = ref(240)
const bottomDrawerHeight = ref(200)

const startLeftResize = (e: MouseEvent) => {
  const startX = e.clientX
  const startWidth = leftDrawerWidth.value

  const resize = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      const newWidth = startWidth + (e.clientX - startX)
      if (newWidth >= 160 && newWidth <= 600) {
        leftDrawerWidth.value = newWidth
      }
    })
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
    requestAnimationFrame(() => {
      const newWidth = startWidth - (e.clientX - startX)
      if (newWidth >= 160 && newWidth <= 600) {
        rightDrawerWidth.value = newWidth
      }
    })
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResize)
}

const startBottomResize = (e: MouseEvent) => {
  const startY = e.clientY
  const startHeight = bottomDrawerHeight.value

  const resize = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      const newHeight = startHeight - (e.clientY - startY)
      if (newHeight >= 100 && newHeight <= 400) {
        bottomDrawerHeight.value = newHeight
      }
    })
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResize)
}

const theme = useTheme()
const handleColor = computed(() =>
  theme.global.current.value.dark
    ? 'rgba(31, 111, 235, 0.8)'  // Brighter dark mode blue with higher opacity
    : 'rgba(3, 102, 214, 0.8)'   // Brighter light mode blue with higher opacity
)
</script>

<style scoped>
.v-app {
  padding: 0 !important;
  margin: 0 !important;
}

.main-content {
  position: relative;
  padding: 0 !important;
  margin-left: v-bind(leftDrawerWidth + 'px');
  margin-right: v-bind(rightDrawerWidth + 'px');
  margin-bottom: v-bind(bottomDrawerHeight + 'px');
  height: calc(100vh - 54px) !important;
  top: 32px;
  z-index: 1;
}

.left-drawer {
  position: fixed;
  top: 32px;
  left: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 2;
  border-right: 1px solid rgba(128, 128, 128, 0.15);
  transition: opacity 0.3s, transform 0.3s;
}

.right-drawer {
  position: fixed;
  top: 32px;
  right: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 2;
  border-left: 1px solid rgba(128, 128, 128, 0.15);
  transition: opacity 0.3s, transform 0.3s;
}

.bottom-drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 2;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  transition: opacity 0.3s, transform 0.3s;
}

.resize-handle {
  position: absolute;
  background-color: transparent;
  transition: background-color 0.2s;
  z-index: 101;
}

.resize-handle:hover {
  background-color: v-bind(handleColor);
}

.resize-handle.right, .resize-handle.left {
  width: 4px;
  height: 100%;
  cursor: col-resize;
}

.resize-handle.right {
  right: -2px;
}

.resize-handle.top {
  top: -2px;
  width: 100%;
  height: 4px;
  cursor: row-resize;
}

:deep(.custom-titlebar) {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
</style>

<style>
/* Base font size */
:root {
  font-size: 13px;
}

/* Global application styles */
.v-application {
  [class*='text-'] {
    font-size: 13px !important;
  }

  .v-container {
    padding: 8px !important;
  }

  .v-row {
    margin: 0 -4px;
  }

  .v-col {
    padding: 4px;
  }

  .v-card {
    padding: 8px;
  }

  .v-list {
    padding: 4px !important;
  }

  .v-list-item {
    min-height: 32px !important;
    padding: 0 8px !important;
  }

  .v-btn {
    text-transform: none;
    letter-spacing: normal;
  }

  /* Tree view specific styles */
  .v-treeview-item {
    min-height: 24px !important;
  }

  .v-treeview-item__label {
    margin-left: 4px !important;
  }

  .v-treeview-item__prepend {
    margin-right: 4px !important;
  }

  .v-treeview-item__toggle {
    font-size: 20px !important;
    width: 24px !important;
    height: 24px !important;
  }

  /* Match tree item background to drawer surface color */
  .v-treeview-item {
    background-color: var(--v-theme-surface) !important;
  }

  .v-treeview-item:hover:not(.v-treeview-item--active) {
    background-color: var(--v-theme-surface) !important;
  }

  /* Reduce the width of list item spacers */
  .v-list-item__spacer {
    width: 8px !important;
  }
}
</style>
