import { reactive } from 'vue'

const store = reactive({ 
    hours: 0,
    minutes: 0,
    seconds: 0,
    currentTimeInSeconds: 0,
    totalTimeInSeconds: 0,
    nextTimeout: 0,
    isTimeout: false,
    userTime: '00:00:00',
    timeLeft: '',
    paused: true,
    isSettingsOpen: false,
    timeouts: false,
    isNowTimeout: true,
    timeoutsTime: 0,
    backgroundMusic: false,
    autoTimeouts: false,
    isMusicPaused: true,
    isMuted: true,
    tick(){      
        this.timeLeft = `${store.hours < 10 ? `0${store.hours}` : `${store.hours}`}:${store.minutes < 10 ? `0${store.minutes}` : `${store.minutes}`}:${store.seconds < 10 ? `0${store.seconds}` : `${store.seconds}`}`  
        if(this.paused || this.over) return;
        if(this.hours === 0 && this.minutes === 0 && this.seconds === 0) return;
        this.calculateCurrentTime();
        this.seconds--
        if(this.seconds === 0 || this.seconds < 0){
            if(this.minutes === 0 && this.hours === 0) {
                this.reset();
                return;
            }
            if(this.minutes !== 0) {
                this.minutes--;
            }
            this.seconds = 59;
        }
        if(this.minutes === 0 && this.hours !== 0) {
            this.hours --;
            this.minutes = 59;
        }
    },
    setTime(hours, minutes, seconds){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    },
    start() {
        if(this.hours === 0 && this.minutes === 0 && this.seconds === 0) return;
        this.calculateCurrentTime();
        if(this.userTime === this.timeLeft && this.timeouts) {
            this.calculateNextTimeout();
        }
        this.calculateTotalTime();
        this.paused = false;
    },
    stop() {
        this.paused = true;
    },
    saveTime(time) {
        this.userTime = time
    },
    reset() {
        let arrayOfTime = this.userTime.split(':');
        this.setTime(+arrayOfTime[0], +arrayOfTime[1], +arrayOfTime[2]);
        this.paused = true;
    },
    resetSettings() {
        this.autoTimeouts = false;
        this.timeouts = false;
        this.timeoutsTime = 0;
        this.backgroundMusic = false;
        this.autoTimeouts = false;
    },
    calculateTotalTime() {
        let arrayOfTime = this.userTime.split(':');
        this.totalTimeInSeconds = (+arrayOfTime[0] * 60 * 60) + (+arrayOfTime[1] * 60) + +arrayOfTime[2];
    },
    calculateCurrentTime() {
        this.currentTimeInSeconds = (this.hours * 60 * 60) + (this.minutes * 60) + this.seconds;
    },
    calculateNextTimeout() {
        if(this.timeoutsTime === 0) return;
        this.nextTimeout = this.currentTimeInSeconds - (this.timeoutsTime * 60);
    },
    
});

export default store;
