<template>
  <q-layout view="hHh lpR lFr">
    <q-header bordered class="header bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Work-learn Timer
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <!-- <div class="full-width column wrap justify-center items-center content-center"> -->
        <slot></slot>
      <!-- </div>       -->
      <q-page-sticky position="bottom-right" :offset="[100, 100]">
        <q-btn fab icon="edit" color="secondary" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
<style scoped>
.header {
  background-color: #7EA799 !important;
}
</style>
