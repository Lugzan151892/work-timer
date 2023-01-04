<template>
    <q-dialog v-model="store.isNowTimeout" persistent>
        <q-card>
            <q-card-section class="column items-center">
                <span class="alert-text">Пора отвлечься и сделать перерыв!</span>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn flat label="Начать перерыв" color="teal" v-close-popup />
                <q-btn flat label="Продолжить без перерыва" color="teal" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import store from '../store/store';

</script>
<style lang="css" scoped>
    
</style>
