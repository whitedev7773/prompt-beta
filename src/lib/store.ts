import { writable, readable } from 'svelte/store';

const _timestamps = [
	{ type: 'kick', time: '00:00:00:00' },
	{ type: 'snare', time: '00:00:01:00' },
	{ type: 'flicker', time: '00:00:01:30' }
];
export const timestamps = writable(_timestamps);

const _ask_confirm = (msg: string) => {
	return confirm(msg);
};
export const ask_confirm = readable(_ask_confirm);

const _clearTimestamp = () => {
	timestamps.set([]);
};
export const clearTimestamp = readable(_clearTimestamp);

const _copyToClipBoard = (content: string) => {
	navigator.clipboard
		.writeText(content)
		.then(() => {
			console.log('텍스트 복사됨');
		})
		.catch((err) => {
			console.log('오류 발생', err);
		});
};
export const copyToClipBoard = readable(_copyToClipBoard);

export const startTime = writable([0, 0, 0, 0]);

const _firstPressTime = new Date();
export const firstPressTime = writable(_firstPressTime);

export const initPressTime = readable(() => {
	firstPressTime.set(new Date());
});

export const calculateDeltaTime = readable((currentTime: Date, fps: number) => {
	const timeDifference = Math.abs(_firstPressTime.getTime() - currentTime.getTime()) / 1000; // Convert milliseconds to seconds

	const hours = Math.floor(timeDifference / 3600);
	const minutes = Math.floor((timeDifference % 3600) / 60);
	const seconds = Math.floor(timeDifference % 60);
	const target_fps = timeDifference / (1 / fps);

	return [hours, minutes, seconds, target_fps];
});
