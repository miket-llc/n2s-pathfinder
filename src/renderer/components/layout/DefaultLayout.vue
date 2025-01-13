<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import StatusBar from '@/renderer/components/StatusBar.vue'

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
    ? 'rgba(31, 111, 235, 0.5)'  // githubDark primary with opacity
    : 'rgba(9, 105, 218, 0.3)'   // githubLight primary with opacity
)
</script>

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
      <slot name="left-drawer"></slot>
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
  position: relative;
  padding: 0 0 22px 0 !important;
  margin-left: v-bind(leftDrawerWidth + 'px');
  margin-right: v-bind(rightDrawerWidth + 'px');
  margin-bottom: v-bind(bottomDrawerHeight + 'px');
  height: calc(100vh - 54px - bottomDrawerHeight + 'px') !important;
}

.left-drawer {
  position: fixed;
  top: 32px;
  left: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 100;
  border-right: 1px solid rgba(128, 128, 128, 0.15);
  /* Only transition opacity and transform for show/hide */
  transition: opacity 0.3s, transform 0.3s;
}

.right-drawer {
  position: fixed;
  top: 32px;
  right: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 100;
  border-left: 1px solid rgba(128, 128, 128, 0.15);
  transition: opacity 0.3s, transform 0.3s;
}

.bottom-drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 22px;
  background-color: var(--v-theme-surface);
  z-index: 100;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  transition: opacity 0.3s, transform 0.3s;
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
  padding-top: 32px !important;
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
