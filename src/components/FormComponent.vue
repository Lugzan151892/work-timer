<template lang="">
    <form class="container">
        <q-input v-show="props.isFullSettings" input-class="time-input" bg-color="secondary" rounded filled v-model="time" mask="fulltime" :rules="['fulltime']">
            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time
                            color="secondary"
                            v-model="time"
                            with-seconds
                            format24h
                        >
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="secondary" flat />
                            </div>
                        </q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <div class="settings-container" v-show="!props.isFullSettings">
            <q-checkbox class="q-mb-md" color="teal" v-model="store.timeouts" label="Установить перерывы"/>
            <q-slide-transition>
                <div v-show="store.timeouts">
                    <p class="q-ml-sm q-mb-none">{{`Делать перерыв каждые ${store.timeoutsTime} минут`}}</p>
                    <q-input   
                        color="teal"                 
                        v-model.number="store.timeoutsTime"
                        type="number"
                        filled
                        style="max-width: 200px"
                        class="q-ml-sm q-mb-sm"
                    />
                    <p class="q-ml-sm q-mb-none">{{`Продолжительность перерыва ${store.timeoutsDuration} минут`}}</p>
                    <q-input   
                        color="teal"                 
                        v-model.number="store.timeoutsDuration"
                        type="number"
                        filled
                        style="max-width: 200px"
                        class="q-ml-sm"
                    />
                    <q-checkbox class="q-mt-md auto-timeout" color="teal" v-model="store.autoTimeouts" label="Останавливать таймер и запускать перерыв автоматически"/>                    
                </div>
            </q-slide-transition>            
            <q-checkbox class="q-mb-md q-mt-md" color="teal" v-model="store.backgroundMusic" label="Включить фоновую музыку во время работы таймера"/> 
            
            <div class="buttons-container">
                <q-btn class="button" color="secondary" @click="saveSettings" label="Сохранить"/>
                <q-btn class="button" color="secondary" @click="store.resetSettings()" label="Сбросить настройки"/>
            </div>
        </div>
    </form>
</template>
<script setup>
import { ref, watch } from 'vue';
import store from '../store/store';

const time = ref(store.userTime);
const props = defineProps({
    isFullSettings: Boolean,
});

const saveSettings = () => {
    if(store.backgroundMusic) {
        store.playMusic();
    }
    store.isSettingsOpen = false
}

watch(time, () => {
    const arrayOfTime = time.value.split(':');
    store.setTime(+arrayOfTime[0], +arrayOfTime[1], +arrayOfTime[2]);
    store.saveTime(time.value);
});

</script>
<style lang="css" scoped>
    .container {
        color: white;
        
    }
    .time-input {
        font-size: 30px;
        text-align: center;
    }
    .settings-container {
        color: black;
        width: 100%;
    }
    .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .button {
        min-width: 200px;
    }
    .auto-timeout {
        min-width: 528px;
    }
</style>
