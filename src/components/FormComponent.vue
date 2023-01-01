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
            <div v-if="store.timeouts">
                <p>{{`Делать перерыв каждые ${store.timeoutsTime} минут`}}</p>
                <q-input   
                    color="teal"                 
                    v-model.number="store.timeoutsTime"
                    type="number"
                    filled
                    style="max-width: 200px"
                />
            </div>
            <q-checkbox class="q-mb-md" color="teal" v-model="store.backgroundMusic" label="Включить фоновую музыку во время работы таймера"/>
            <q-checkbox class="q-mb-md" color="teal" v-model="store.autoTimeouts" label="Останавливать таймер и запускать перерыв автоматически"/>
            <div class="buttons-container">
                <q-btn class="button" color="secondary" @click="store.isSettingsOpen = false" label="Сохранить"/>
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
    isFullSettings: Boolean
});

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
    }
    .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .button {
        min-width: 200px;
    }
</style>
