<template>
  <q-layout view="hHh lpR lFr">
    <q-header bordered class="header bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="header-container">
          <q-avatar>
            <img src="assets/icons8-time-machine-100.png">
          </q-avatar>
          <p class="text">
            Work-learn Timer
          </p>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer align="center" v-model="leftDrawerOpen" side="left" overlay elevated>
      <!-- drawer content -->
      В разработке авторизация и личная статистика
    </q-drawer>
    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
<style scoped>
.header {
  background-color: #26A69A !important;
}
.header-container {
  display: flex;
  align-items: center;
}
.text {
  margin: 0 0 0 10px;
}
</style>
