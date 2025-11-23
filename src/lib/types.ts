export interface Timestamp {
	type: string;
	time: string;
}

export type LyricState = 'exit' | 'focus' | 'preview' | 'queue';

export interface StopwatchComponent {
	Reset: () => void;
	Start: () => void;
	Stop: () => void;
	GetTime: () => string;
	isRun: () => boolean;
	Relaunch: (fps: number) => void;
}
