<script lang="ts">
    class Stopwatch {
        private fps: number;
        private isRunning: boolean = false;
        private startTime: number = 0;
        private elapsedTime: number = 0;
        private timer: ReturnType<typeof setInterval> | null = null;

        constructor(fps: number) {
            this.fps = fps;
        }

        start(): void {
            if (!this.isRunning) {
                this.isRunning = true;
                this.startTime = Date.now();
                this.tick();
            }
        }

        stop(): void {
            if (this.isRunning) {
                this.isRunning = false;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                this.elapsedTime += (Date.now() - this.startTime) / 1000;
            }
        }

        reset(): void {
            this.elapsedTime = 0;
            if (this.isRunning) {
                this.startTime = Date.now();
            }
        }

        private tick(): void {
            this.timer = setInterval(() => {
                if (this.isRunning) {
                    const currentTime = Date.now();
                    this.elapsedTime += (currentTime - this.startTime) / 1000;
                    this.startTime = currentTime;
                    formattedTime = stopwatch.getFormattedTime();
                }
            }, 1000 / this.fps);
        }

        getFormattedTime(): string {
            const totalFrames = Math.floor(this.elapsedTime * this.fps);
            const frames = totalFrames % this.fps;
            const totalSeconds = Math.floor(this.elapsedTime);
            const seconds = totalSeconds % 60;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const hours = Math.floor(totalSeconds / 3600);

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
        }

        getRunningState(): boolean {
            return this.isRunning;
        }
    }

    let stopwatch = new Stopwatch(60); // 60fps로 초기화
    let formattedTime: string = stopwatch.getFormattedTime();
    let isRunning: boolean = false;

    export function Relaunch(fps: number): void {
        stopwatch = new Stopwatch(fps);
        formattedTime = stopwatch.getFormattedTime();
    }

    export function GetTime(): string {
        return formattedTime;
    }

    export function isRun(): boolean {
        return isRunning;
    }

    export function Start(): void {
        stopwatch.start();
        isRunning = true;
    }

    export function Stop(): void {
        stopwatch.stop();
        formattedTime = stopwatch.getFormattedTime();
        isRunning = false;
    }

    export function Reset(): void {
        stopwatch.reset();
        formattedTime = stopwatch.getFormattedTime();
    }
</script>

<p class="container-subtitle" style="font-size: 15px;">{formattedTime}</p>