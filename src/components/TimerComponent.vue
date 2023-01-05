<template>
    <div class="q-pa-none timer-container">
        <FormComponentVue :isFullSettings="true"/>
        <div class="timer">{{store.timeLeft ? store.timeLeft : '00:00:00'}}</div>
        <div class="buttons">
            <q-btn class="button" v-if="store.paused" color="secondary" @click="store.start()" label="Пуск"/>
            <q-btn class="button" v-if="!store.paused" color="secondary" @click="store.stop()" label="Пауза"/>
            <q-btn class="button" color="secondary" @click="store.reset()" label="Сбросить таймер"/>
        </div>
        <div class="settings-button">
            <q-btn @click="openModal" class="button" color="secondary" label="Дополнительные настройки"/>
        </div>
        <AudioComponentVue/>
        <ModalComponentVue>
            <FormComponentVue :isFullSettings="false"/>
        </ModalComponentVue>
        <TimeoutModalVue v-if="store.isNowTimeout" />
    </div>
</template>
<script setup>
import FormComponentVue from './FormComponent.vue';
import { onMounted  } from 'vue';
import ModalComponentVue from './ModalComponent.vue';
import AudioComponentVue from './AudioComponent.vue';
import TimeoutModalVue from './TimeoutModal.vue';
import store from '../store/store';

const openModal = () => {
    store.isSettingsOpen = !store.isSettingsOpen;
};

onMounted(() => {
    setInterval(()=> {
        store.tick();
    }, 1000);
});

</script>
<style lang="css">
    .timer-container {
        height: calc(100vh - 51px);
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: url('../images/background.jpg');
        background-size: cover;
    }    
    .timer {
        padding: 0;
        margin: 0;
        color: white;
        font-size: 200px;
        line-height: 1;
        transition: all ease 0.5;
    }
    .buttons {
        display: flex;
        width: 800px;
        justify-content: space-around;
    }
    .button {
        padding: 20px;
        min-width: 200px;
    }
    .settings-button {
        margin-top: 50px;
    }
    .alert-text {
        font-size: 50px;
        text-align: center;
        color: #26A69A;
    }
</style>
