<template>
    <q-dialog v-model="store.isTimeoutTimerOpen" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white" style="width: 300px">
            <q-card-section>
                <div align="center" class="text-h6 text-weight-bold text-h2">Перерыв</div>
            </q-card-section>
            <q-card-section align="center" class="q-pt-none text-weight-bold text-h2">
                {{minutes < 10 ? `0${minutes}` : minutes}} : {{seconds < 10 ? `0${seconds}` : seconds}}
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn @click="store.endTimeout()" flat label="Закончить перерыв"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import store from '../store/store';
import { onMounted, ref } from 'vue';

const minutes = ref(store.timeoutsTime);
const seconds = ref(0);

const props = defineProps({
    audioAlert: Object
})

const tick = () => {
    if(minutes.value === 0 && seconds.value === 0) {
        props.audioAlert.play();
        setTimeout(() => {
            props.audioAlert.pause()
        }, 3000);
        return;
    };
    seconds.value--
    if(seconds.value < 0) {
        if(minutes.value === 0) return;
        if(minutes.value !== 0) {
            minutes.value--;
        }
        seconds.value = 59;
    }
}

onMounted(() => {
    setInterval(tick, 1000)
});

</script>
<style lang="css">
    
</style>
