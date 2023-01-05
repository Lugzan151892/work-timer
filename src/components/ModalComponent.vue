<template>
    <q-dialog v-model="store.isSettingsOpen" transition-show="flip-down" transition-hide="flip-up">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Дополнительные настройки</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <slot></slot>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup>
import store from '../store/store';

</script>
