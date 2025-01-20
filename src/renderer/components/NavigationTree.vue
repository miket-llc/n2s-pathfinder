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
          { id: 'installation', name: 'Installation Guide' },
          { id: 'quick-start', name: 'Quick Start' },
          { id: 'configuration', name: 'Configuration' },
          { id: 'prerequisites', name: 'Prerequisites' },
          { id: 'system-requirements', name: 'System Requirements' },
          {
            id: 'platform-specific',
            name: 'Platform Specific',
            children: [
              { id: 'windows-setup', name: 'Windows Setup' },
              { id: 'mac-setup', name: 'macOS Setup' },
              { id: 'linux-setup', name: 'Linux Setup' },
              {
                id: 'container',
                name: 'Containers',
                children: [
                  { id: 'docker', name: 'Docker Guide' },
                  { id: 'kubernetes', name: 'Kubernetes Setup' },
                  { id: 'compose', name: 'Docker Compose' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'features',
        name: 'Features',
        children: [
          { id: 'core', name: 'Core Features' },
          {
            id: 'advanced',
            name: 'Advanced Features',
            children: [
              { id: 'plugins', name: 'Plugins' },
              { id: 'themes', name: 'Themes' },
              { id: 'api', name: 'API Reference' },
              {
                id: 'customization',
                name: 'Customization',
                children: [
                  { id: 'styling', name: 'Styling Guide' },
                  { id: 'branding', name: 'Branding' },
                  { id: 'layouts', name: 'Custom Layouts' },
                  { id: 'components', name: 'Component Library' }
                ]
              }
            ]
          },
          {
            id: 'integrations',
            name: 'Integrations',
            children: [
              { id: 'aws', name: 'AWS Services' },
              { id: 'azure', name: 'Azure Services' },
              { id: 'gcp', name: 'Google Cloud' },
              {
                id: 'third-party',
                name: 'Third Party Services',
                children: [
                  { id: 'stripe', name: 'Stripe Integration' },
                  { id: 'sendgrid', name: 'SendGrid Setup' },
                  { id: 'twilio', name: 'Twilio Services' },
                  { id: 'auth0', name: 'Auth0 Integration' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    children: [
      {
        id: 'beginners',
        name: 'Beginners',
        children: Array.from({ length: 10 }, (_, i) => ({
          id: `tutorial-${i + 1}`,
          name: `Tutorial ${i + 1}`
        }))
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        children: Array.from({ length: 8 }, (_, i) => ({
          id: `int-tutorial-${i + 1}`,
          name: `Intermediate Tutorial ${i + 1}`
        }))
      },
      {
        id: 'advanced',
        name: 'Advanced',
        children: Array.from({ length: 6 }, (_, i) => ({
          id: `adv-tutorial-${i + 1}`,
          name: `Advanced Tutorial ${i + 1}`
        }))
      }
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
    activatable
    open-on-click
    class="navigation-tree"
  >
    <template #prepend="{ item }">
      <v-icon
        size="small"
        :icon="item.children ? 'mdi-folder' : 'mdi-file-document'"
        style="margin-right: 2px;"
      />
    </template>
  </v-treeview>
</template>

<style>
.navigation-tree {
  background-color: var(--v-theme-surface);
}

.navigation-tree .v-treeview-node {
  background-color: var(--v-theme-surface) !important;
}

.navigation-tree .v-treeview-node:hover:not(.v-treeview-node--active) {
  background-color: var(--v-theme-surface) !important;
}
</style>

<style scoped>
.expand-icon {
  font-size: 20px !important;
  width: 20px !important;
  height: 20px !important;
}
</style>
