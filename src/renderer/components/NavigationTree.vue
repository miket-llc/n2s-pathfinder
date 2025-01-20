<script setup lang="ts">
import { defineProps } from 'vue'
import { VTreeview } from 'vuetify/labs/VTreeview'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

const props = defineProps<{ items: TreeNode[] }>()
</script>

<template>
  <v-treeview
    :items="props.items"
    item-title="name"
    item-children="children"
    activatable
    open-on-click
  >
    <template #prepend="{ item }">
      <v-icon size="small" :icon="item.children ? 'mdi-folder' : 'mdi-file-document'" />
    </template>
  </v-treeview>
</template>
