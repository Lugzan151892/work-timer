<template>
    <div class="music-container" v-if="store.backgroundMusic">
        <q-btn @click="store.playMusic()" v-if="store.isMusicPaused" rounded color="teal" icon="play_circle_outline">
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
        <audio 
            ref="audio"          
            loop
            :volume="store.currentAudioVolume"
        >
            <source src="../audio/ocean.mp3" />
            <source src="../audio/rain.mp3" />
        </audio>
    </div>
</template>
<script setup>
import store from '../store/store';
import { ref, onMounted } from 'vue';

const audio = ref(null);
onMounted(() => {
    store.audioComponent = audio;
})
const muteMusic = () => {
    store.isMuted = !store.isMuted;
    store.currentAudioVolume = audio.value.volume;
    audio.value.volume = 0;
}

const unmuteMusic = () => {
    store.isMuted = !store.isMuted;
    audio.value.volume = store.currentAudioVolume;
}

const pause = () => {
    store.isMusicPaused = true
    audio.value.pause();
}

</script>
<style lang="css" scoped>
    .music-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 200px;
        min-height: 50px;
        border-radius: 3px;
    }
</style>
