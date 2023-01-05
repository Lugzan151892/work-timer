<template>
    <q-dialog v-model="store.isNowTimeout" persistent>
        <q-card>
            <q-card-section class="column items-center">
                <span class="alert-text">Пора отвлечься и сделать перерыв!</span>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn @click="openTimerModal" flat label="Начать перерыв" color="teal" />
                <q-btn @click="stopAlert" :disabled="!isAlertSound" flat label="Отключить звук" color="red"/>
                <q-btn @click="store.continueWithoutTimeout()" flat label="Продолжить без перерыва" color="teal" v-close-popup />
            </q-card-actions>
        </q-card>        
    </q-dialog>
    <audio 
        ref="audioTimeout"          
        loop
        volume="1"
    >
        <source src="../audio/alert.mp3" />
    </audio>
    <TimerModalVue v-if="store.isTimeoutTimerOpen" :audioAlert="audioTimeout"/>
</template>
<script setup>
import store from '../store/store';
import TimerModalVue from './TimerModal.vue';
import { onMounted, ref } from 'vue';
const audioTimeout = ref();
const isAlertSound = ref(true);

const stopAlert = () => {
    audioTimeout.value.pause();
    isAlertSound.value = false;
}

const openTimerModal = () => {
    store.isTimeoutTimerOpen = true;
    store.paused = true;
    audioTimeout.value.pause();
}

onMounted(()=> {
    if(store.autoTimeouts) {
        audioTimeout.value.play();
        setTimeout(() => {
            audioTimeout.value.pause();
        }, 3000)
    }
    audioTimeout.value.play();
});
</script>
<style lang="css" scoped>
    
</style>
