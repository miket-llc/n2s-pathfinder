<script setup lang="tsx"></script>

<template>
  <v-app>
    <slot name="titlebar"></slot>
    <v-main class="main-content">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-content {
  padding-top: 32px;
}
</style>
