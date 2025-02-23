<script>
    import { onMount } from 'svelte';
    class Stopwatch {
        // @ts-ignore
        constructor(fps) {
            this.fps = fps;
            this.isRunning = false;
            this.startTime = 0;
            this.elapsedTime = 0;
        }

        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.startTime = Date.now();
                this.tick();
            }
        }

        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                clearInterval(this.timer);
                this.elapsedTime += (Date.now() - this.startTime) / 1000;
            }
        }

        reset() {
            this.elapsedTime = 0;
            if (this.isRunning) {
                this.startTime = Date.now();
            }
        }

        tick() {
            this.timer = setInterval(() => {
            if (this.isRunning) {
                const currentTime = Date.now();
                this.elapsedTime += (currentTime - this.startTime) / 1000;
                this.startTime = currentTime;
                formattedTime = stopwatch.getFormattedTime();
                // 여기에서 Svelte의 상태를 업데이트할 수 있습니다.
            }
            }, 1000 / this.fps);
        }

        getFormattedTime() {
            const totalFrames = Math.floor(this.elapsedTime * this.fps);
            const frames = totalFrames % this.fps;
            const totalSeconds = Math.floor(this.elapsedTime);
            const seconds = totalSeconds % 60;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const hours = Math.floor(totalSeconds / 3600);

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
        }
    }

    let stopwatch = new Stopwatch(60); // 60fps로 초기화
    let formattedTime = stopwatch.getFormattedTime();
    let isRunning = false;

    // @ts-ignore
    export function Relaunch(fps) {
        stopwatch = new Stopwatch(fps);
    }

    export function GetTime() {
        return formattedTime;
    }

    export function isRun() {
        return isRunning;
    }

    export function Start() {
        stopwatch.start();
        isRunning = true;
    }

    export function Stop() {
        stopwatch.stop();
        formattedTime = stopwatch.getFormattedTime();
        isRunning = false;
    }

    export function Reset() {
        stopwatch.reset();
        formattedTime = stopwatch.getFormattedTime();
    }
</script>

<p class="container-subtitle" style="font-size: 15px;">{formattedTime}</p>