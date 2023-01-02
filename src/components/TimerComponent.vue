<template>
    <div class="q-pa-none timer-container">
        <div>
            <FormComponentVue :isFullSettings="true"/>
        </div>
        <div class="time">
            <div class="timer">{{store.timeLeft ? store.timeLeft : '00:00:00'}}</div>
        </div> 
        <div class="buttons">
            <q-btn class="button" v-if="store.paused" color="secondary" @click="store.start()" label="Пуск"/>
            <q-btn class="button" v-if="!store.paused" color="secondary" @click="store.stop()" label="Пауза"/>
            <q-btn class="button" color="secondary" @click="store.reset()" label="Сбросить таймер"/>
        </div>
        <div class="settings-button">
            <q-btn @click="openModal" class="button" color="secondary" label="Дополнительные настройки"/>
        </div>
        <div class="music-container" v-if="store.backgroundMusic">
            <q-btn @click="play" v-if="store.isMusicPaused" rounded color="teal" icon="play_circle_outline">
                <q-tooltip class="bg-teal text-black shadow-4" :offset="[10, 10]">
                    Воспроизвести
                </q-tooltip>
            </q-btn>
            <q-btn @click="pause" v-if="!store.isMusicPaused" rounded color="teal" icon="pause_circle">
                <q-tooltip class="bg-teal text-black shadow-4" :offset="[10, 10]">
                    Пауза
                </q-tooltip>
            </q-btn>
            <q-knob
                show-value
                font-size="12px"
                v-model="store.currentAudioVolume"
                size="50px"
                :thickness="0.22"
                color="teal"
                track-color="grey-3"
                class="q-ma-md"
                :min="0"
                :max="1"
                :step="0.1"
                >
                {{ store.currentAudioVolume * 100 }}%
            </q-knob>
            <q-btn @click="muteMusic" rounded v-if="!store.isMuted" icon="volume_off"> 
                <q-tooltip class="bg-teal text-black shadow-4" :offset="[10, 10]">
                    Выключить звук
                </q-tooltip>
            </q-btn>
            <q-btn @click="unmuteMusic" rounded v-if="store.isMuted" color='red' icon="volume_off">
                <q-tooltip class="bg-red text-black shadow-4" :offset="[10, 10]">
                    Включить звук
                </q-tooltip>
            </q-btn>
        </div>
        <ModalComponentVue>
            <FormComponentVue :isFullSettings="false" :play="play"/>
        </ModalComponentVue>
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
        <audio 
            ref="audio"          
            loop
            :volume="store.currentAudioVolume"
        >
            <source src="../assets/ocean.mp3" />
            <source src="../assets/rain.mp3" />
        </audio>
    </div>
</template>
<script setup>
import FormComponentVue from './FormComponent.vue';
import { onMounted, ref, watch  } from 'vue';
import ModalComponentVue from './ModalComponent.vue';
import store from '../store/store';

const audio = ref(null);
const isBackgroundMusic = ref(store.backgroundMusic);

const openModal = () => {
    store.isSettingsOpen = !store.isSettingsOpen;
};

const muteMusic = () => {
    store.isMuted = !store.isMuted;
    store.currentAudioVolume = audio.value.volume;
    audio.value.volume = 0;
}

const unmuteMusic = () => {
    store.isMuted = !store.isMuted;
    audio.value.volume = store.currentAudioVolume;
}

const play = () => {
    store.isMusicPaused = false;
    audio.value.play();
}

const pause = () => {
    store.isMusicPaused = true
    audio.value.pause();
}

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
        background: url('../assets/jonatan-pie-OPOg0fz5uIs-unsplash (1).jpg');
        background-size: cover;
    }
    .time {
        display: flex;
        justify-content: center;
        align-items: center;
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
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%, -50%);
        /* background-color: #26A69A; */
        min-width: 200px;
        min-height: 50px;
        border-radius: 3px;
    }
    .alert-text {
        font-size: 50px;
        text-align: center;
        color: #26A69A;
    }
</style>
