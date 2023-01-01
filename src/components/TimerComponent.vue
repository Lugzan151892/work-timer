<template>
    <div class="q-pa-none timer-container">
        <div>
            <FormComponentVue :isFullSettings="true"/>
        </div>
        <div class="time">
            <div class="timer hour">{{store.hours < 10 ? `0${store.hours}` : `${store.hours}`}}</div> 
            <div class="separator">:</div>
            <div class="timer minute">{{store.minutes < 10 ? `0${store.minutes}` : `${store.minutes}`}}</div>
            <div class="separator">:</div>
            <div class="timer second">{{store.seconds < 10 ? `0${store.seconds}` : `${store.seconds}`}}</div> 
        </div> 
        <div class="buttons">
            <q-btn class="button" v-if="store.paused" color="secondary" @click="store.start()" label="Start"/>
            <q-btn class="button" v-if="!store.paused" color="secondary" @click="store.stop()" label="Pause"/>
            <q-btn class="button" color="secondary" @click="store.reset()" label="Reset"/>
        </div>
        <div class="settings-button">
            <q-btn @click="openModal" class="button" color="secondary" label="Open full settings"/>
        </div>
        <div class="music-container" v-if="store.backgroundMusic">
            <!-- <q-btn outline rounded color="primary" icon="outlinedPlayCircleOutline" />
            <q-btn outline rounded color="primary" icon="play" /> -->
        </div>
        <ModalComponentVue>
            <FormComponentVue :isFullSettings="false"/>
        </ModalComponentVue>
    </div>
</template>
<script setup>
import FormComponentVue from './FormComponent.vue';
import { onMounted, ref  } from 'vue';
import ModalComponentVue from './ModalComponent.vue';
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
<style lang="css" scoped>
    .timer-container {
        height: calc(100vh - 51px);
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: url('../assets/jonatan-pie-OPOg0fz5uIs-unsplash (1).jpg');
        background-size: cover;
    }
    .time {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .separator {
        font-size: 150px;
        color: white;
        margin: 0 20px;
        line-height: 1;
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
    .music-container {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%, -50%);
        /* background-color: #26A69A; */
        min-width: 300px;
        background-color: white;
        min-height: 50px;
        border-radius: 3px;
    }
</style>
