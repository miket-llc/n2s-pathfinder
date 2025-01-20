<script setup lang="ts">
import { VTreeview } from 'vuetify/labs/VTreeview'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

// We can move this to a separate file later if needed
const testData: TreeNode[] = [
  {
    id: 'docs',
    name: 'Documentation',
    children: [
      {
        id: 'getting-started',
        name: 'Getting Started',
        children: [
          { id: 'installation', name: 'Installation' },
          { id: 'configuration', name: 'Configuration' }
        ]
      },
      {
        id: 'features',
        name: 'Features',
        children: [
          { id: 'core', name: 'Core Features' },
          { id: 'advanced', name: 'Advanced Features' }
        ]
      }
    ]
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    children: [
      { id: 'basic', name: 'Basic Tutorial' },
      { id: 'advanced', name: 'Advanced Tutorial' }
    ]
  },
  {
    id: 'api',
    name: 'API Documentation',
    children: [
      {
        id: 'rest-api',
        name: 'REST API',
        children: [
          { id: 'authentication', name: 'Authentication' },
          { id: 'endpoints', name: 'Endpoints' },
          { id: 'error-handling', name: 'Error Handling' },
          {
            id: 'versions',
            name: 'API Versions',
            children: Array.from({ length: 5 }, (_, i) => ({
              id: `v${i + 1}`,
              name: `Version ${i + 1}.0`
            }))
          }
        ]
      },
      {
        id: 'graphql',
        name: 'GraphQL API',
        children: [
          { id: 'schema', name: 'Schema Reference' },
          { id: 'queries', name: 'Queries' },
          { id: 'mutations', name: 'Mutations' },
          { id: 'subscriptions', name: 'Subscriptions' },
          {
            id: 'examples',
            name: 'Examples',
            children: Array.from({ length: 8 }, (_, i) => ({
              id: `example-${i + 1}`,
              name: `Example Query ${i + 1}`
            }))
          }
        ]
      }
    ]
  },
  {
    id: 'resources',
    name: 'Resources',
    children: [
      { id: 'faq', name: 'FAQ' },
      { id: 'troubleshooting', name: 'Troubleshooting' },
      {
        id: 'community',
        name: 'Community',
        children: [
          { id: 'discord', name: 'Discord Channel' },
          { id: 'github', name: 'GitHub Discussions' },
          { id: 'stackoverflow', name: 'Stack Overflow' },
          {
            id: 'showcases',
            name: 'Showcases',
            children: Array.from({ length: 12 }, (_, i) => ({
              id: `showcase-${i + 1}`,
              name: `Community Showcase ${i + 1}`
            }))
          }
        ]
      },
      {
        id: 'blog',
        name: 'Blog Posts',
        children: Array.from({ length: 20 }, (_, i) => ({
          id: `post-${i + 1}`,
          name: `Blog Post ${i + 1}`
        }))
      }
    ]
  }
]
</script>

<template>
  <v-treeview
    :items="testData"
    item-title="name"
    item-children="children"
    class="navigation-tree"
  />
</template>

<style>
.navigation-tree {
  background-color: var(--v-theme-surface);
  height: 100%;
}

/* Ensure tree items have the same background */
.navigation-tree :deep(.v-treeview-node) {
  background-color: var(--v-theme-surface);
}

/* Add hover effect */
.navigation-tree :deep(.v-treeview-node:hover) {
  background-color: color-mix(in srgb, var(--v-theme-surface) 85%, var(--v-theme-primary));
}

/* Style selected state */
.navigation-tree :deep(.v-treeview-node--selected) {
  background-color: color-mix(in srgb, var(--v-theme-surface) 70%, var(--v-theme-primary));
}
</style>

<style scoped>
.expand-icon {
  font-size: 20px !important;
  width: 20px !important;
  height: 20px !important;
}
</style>
