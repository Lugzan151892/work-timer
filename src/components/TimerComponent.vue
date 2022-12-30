<template>
    <div class="q-pa-none timer-container">
        <div>
            <FormComponentVue/>
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
    </div>
</template>
<script setup>
import FormComponentVue from './FormComponent.vue';
import { onMounted  } from 'vue';
import store from '../store/store';

onMounted(() => {
    setInterval(()=> {
        store.tick()
    }, 150);
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
