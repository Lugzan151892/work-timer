<template>
    <div class="q-pa-none timer-container">
        <div class="time">
            <div class="timer hour">{{state.hours < 10 ? `0${state.hours}` : `${state.hours}`}}</div> 
            <div class="separator">:</div>
            <div class="timer minute">{{state.minutes < 10 ? `0${state.minutes}` : `${state.minutes}`}}</div>
            <div class="separator">:</div>
            <div class="timer second">{{state.seconds < 10 ? `0${state.seconds}` : `${state.seconds}`}}</div> 
        </div> 
        <div class="buttons">
            <q-btn class="button" v-if="state.paused" color="secondary" @click="start" label="Start"/>
            <q-btn class="button" v-if="!state.paused" color="secondary" @click="stop" label="Pause"/>
            <q-btn class="button" color="secondary" @click="reset" label="Reset"/>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted  } from 'vue'
const state = reactive({ 
    hours: 0,
    minutes: 0,
    seconds: 0,
    paused: true,
});

function start() {
    state.paused = false;
}

function tick() {
    if(state.paused || state.over) return;
    state.seconds++
    if(state.seconds === 60){
        state.minutes++;
        state.seconds = 0;
    }
    if(state.minutes === 60) {
        state.hours ++;
        state.minutes = 0;
    }
}

function stop() {
    state.paused = true;
}

function reset() {
    state.minutes = 0;
    state.hours = 0;
    state.seconds = 0;
    state.paused = true;
}

onMounted(() => {
    setInterval(tick, 1000)
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
</style>
