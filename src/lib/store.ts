import { writable, readable } from 'svelte/store';
import type { Timestamp } from './types';

const _timestamps: Timestamp[] = [];
export const timestamps = writable<Timestamp[]>(_timestamps);

const _ask_confirm = (msg: string): boolean => {
	return confirm(msg);
};
export const ask_confirm = readable<(msg: string) => boolean>(_ask_confirm);

const _clearTimestamp = (): void => {
	timestamps.set([]);
};
export const clearTimestamp = readable<() => void>(_clearTimestamp);

const _copyToClipBoard = (content: string): void => {
	navigator.clipboard
		.writeText(content)
		.then(() => {
			console.log('텍스트 복사됨');
			showToast('클립보드에 복사되었습니다', 'success');
		})
		.catch((err) => {
			console.error('오류 발생', err);
			showToast('클립보드 복사 실패: ' + (err.message || '알 수 없는 오류'), 'error');
		});
};
export const copyToClipBoard = readable<(content: string) => void>(_copyToClipBoard);

// Toast notification system
export interface Toast {
	id: number;
	message: string;
	type: 'success' | 'error' | 'info';
}

export const toasts = writable<Toast[]>([]);

let toastId = 0;
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
	const id = toastId++;
	const toast: Toast = { id, message, type };

	toasts.update((all) => [...all, toast]);

	setTimeout(() => {
		toasts.update((all) => all.filter((t) => t.id !== id));
	}, 3000);
}

export const startTime = writable<number[]>([0, 0, 0, 0]);

export const firstPressTime = writable<Date>(new Date());

export const initPressTime = readable<() => void>(() => {
	firstPressTime.set(new Date());
});

export const calculateDeltaTime = readable<(currentTime: Date, fps: number) => number[]>(
	(currentTime: Date, fps: number) => {
		let _firstPressTime: Date = new Date();
		firstPressTime.subscribe((value) => {
			_firstPressTime = value;
		})();

		const timeDifference =
			Math.abs(_firstPressTime.getTime() - currentTime.getTime()) / 1000; // Convert milliseconds to seconds

		const hours = Math.floor(timeDifference / 3600);
		const minutes = Math.floor((timeDifference % 3600) / 60);
		const seconds = Math.floor(timeDifference % 60);
		const target_fps = timeDifference / (1 / fps);

		return [hours, minutes, seconds, target_fps];
	}
);
