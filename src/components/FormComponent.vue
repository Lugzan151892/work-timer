<template lang="">
    <form class="container">
        <q-input input-class="time-input" bg-color="secondary" rounded filled v-model="time" mask="fulltime" :rules="['fulltime']">
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
    </form>
</template>
<script setup>
import { ref, watch } from 'vue';
import store from '../store/store';

const time = ref(store.userTime);

watch(time, () => {
    const arrayOfTime = time.value.split(':');
    store.setTime(+arrayOfTime[0], +arrayOfTime[1], +arrayOfTime[2]);
    store.saveTime(time.value);
});

</script>
<style lang="css">
    .container {
        color: white;
    }
    .time-input {
        font-size: 30px;
        text-align: center;
    }
</style>
