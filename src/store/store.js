import { reactive } from 'vue'

const store = reactive({ 
    hours: 0,
    minutes: 0,
    seconds: 0,
    userTime: '00:00:00',
    paused: true,
    tick() {
        if(this.paused || this.over) return;
        if(this.hours === 0 && this.minutes === 0 && this.seconds === 0) return;
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
    }
});

export default store;
