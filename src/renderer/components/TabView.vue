<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Tab {
  id: string
  title: string
  content: string
  active?: boolean
}

const tabs = ref<Tab[]>([
  {
    id: '1',
    title: 'Welcome',
    content: 'Welcome to N2S Pathfinder',
    active: true
  },
  {
    id: '2',
    title: 'Getting Started',
    content: 'Getting Started Guide'
  }
])

const activeTab = ref(tabs.value[0].id)

const switchTab = (tabId: string) => {
  activeTab.value = tabId
}

const closeTab = (tabId: string) => {
  const index = tabs.value.findIndex(tab => tab.id === tabId)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (activeTab.value === tabId) {
      // Switch to the next tab, or the previous if we're at the end
      const nextTab = tabs.value[index] || tabs.value[index - 1]
      if (nextTab) {
        activeTab.value = nextTab.id
      }
    }
  }
}

onMounted(() => {
  console.log('TabView mounted', { tabs: tabs.value, activeTab: activeTab.value })
})
</script>

<template>
  <div class="tab-view">
    <!-- Tab Bar -->
    <div class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: tab.id === activeTab }"
        @click="switchTab(tab.id)"
      >
        <span class="tab-title">{{ tab.title }}</span>
        <v-btn
          variant="text"
          density="compact"
          icon="mdi-close"
          size="x-small"
          @click.stop="closeTab(tab.id)"
        />
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        v-show="tab.id === activeTab"
        class="content-pane"
      >
        {{ tab.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-view {
  display: flex;
  flex-direction: column;
  height: calc(100% - 32px); /* Adjust for title bar */
  background-color: var(--v-theme-background);
  position: relative;
  z-index: 1;
}

.tab-bar {
  position: sticky;
  top: 0;
  display: flex;
  background-color: var(--v-theme-surface);
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
  height: 32px;
  overflow-x: auto;
  z-index: 2;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 8px;
  min-width: 120px;
  max-width: 200px;
  height: 32px;
  border-right: 1px solid rgba(128, 128, 128, 0.15);
  cursor: pointer;
  user-select: none;
  position: relative;
  background-color: var(--v-theme-surface);
}

.tab.active {
  background-color: var(--v-theme-background);
  /* Remove the top border */
  border-bottom: none; /* Remove bottom border for active tab */
  height: 33px; /* Make it slightly taller to cover the bottom border */
}

/* Optional: Add hover state */
.tab:not(.active):hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.tab-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.tab-content {
  flex: 1;
  overflow: auto;
}

.content-pane {
  height: 100%;
  padding: 16px;
}

/* Hide scrollbar but keep functionality */
.tab-bar::-webkit-scrollbar {
  display: none;
}
</style>
