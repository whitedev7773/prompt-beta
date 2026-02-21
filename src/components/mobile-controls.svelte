<script lang="ts">
	import '$lib/global.css';

	export let onFirst: () => void;
	export let onPrev: () => void;
	export let onNext: () => void;
	export let onStartStop: () => void;
	export let onReset: () => void;
	export let isRunning: boolean = false;
	export let timecode: string = '00:00:00:00';
	export let currentIndex: number = -2;
	export let totalLyrics: number = 0;

	// Panel toggle
	export let activePanel: 'none' | 'input' | 'timestamps' | 'settings' = 'none';
	export let onTogglePanel: (panel: 'input' | 'timestamps' | 'settings') => void = () => {};
</script>

<div class="mobile-controls">
	<div class="mobile-controls-toggles">
		<button
			class="toggle-pill"
			class:active={activePanel === 'input'}
			on:click={() => onTogglePanel('input')}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
				<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
			</svg>
			<span>가사</span>
		</button>
		<button
			class="toggle-pill"
			class:active={activePanel === 'timestamps'}
			on:click={() => onTogglePanel('timestamps')}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
			</svg>
			<span>기록</span>
		</button>
		<button
			class="toggle-pill"
			class:active={activePanel === 'settings'}
			on:click={() => onTogglePanel('settings')}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="3"></circle>
				<path
					d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
				></path>
			</svg>
			<span>설정</span>
		</button>

		<div class="toggle-spacer"></div>

		<div class="timecode-compact">
			<span class="tc-label">TC</span>
			<span class="tc-value">{timecode}</span>
		</div>
		<span class="progress-compact">{Math.max(0, currentIndex + 1)}/{totalLyrics}</span>
	</div>

	<div class="mobile-controls-bottom">
		<button class="ctrl-btn reset-btn" on:click={onReset} title="초기화">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="1 4 1 10 7 10"></polyline>
				<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
			</svg>
		</button>

		<button class="ctrl-btn first-btn" on:click={onFirst} title="처음으로">
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="19 20 9 12 19 4 19 20"></polygon>
				<line x1="5" y1="19" x2="5" y2="5"></line>
			</svg>
		</button>

		<button class="ctrl-btn prev-btn" on:click={onPrev} title="이전">
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>

		<button
			class="ctrl-btn play-btn"
			class:running={isRunning}
			on:click={onStartStop}
			title={isRunning ? '정지' : '시작'}
		>
			{#if isRunning}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="4" width="4" height="16" rx="1"></rect>
					<rect x="14" y="4" width="4" height="16" rx="1"></rect>
				</svg>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<polygon points="5 3 19 12 5 21 5 3"></polygon>
				</svg>
			{/if}
		</button>

		<button class="ctrl-btn next-btn" on:click={onNext} title="다음">
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	</div>
</div>

<style>
	.mobile-controls {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2000;
		background: rgba(10, 10, 10, 0.97);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 6px 12px calc(6px + env(safe-area-inset-bottom, 0px)) 12px;
		flex-direction: column;
		gap: 4px;
	}

	/* Toggle pills row */
	.mobile-controls-toggles {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 2px;
	}

	.toggle-pill {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 10px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 16px;
		background: transparent;
		color: rgba(255, 255, 255, 0.5);
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.toggle-pill.active {
		background: var(--highlight-color, #0377fd);
		border-color: var(--highlight-color, #0377fd);
		color: white;
	}

	.toggle-pill span {
		line-height: 1;
	}

	.toggle-spacer {
		flex: 1;
	}

	.timecode-compact {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.tc-label {
		font-size: 9px;
		font-weight: 800;
		color: var(--highlight-color, #0377fd);
		background: rgba(3, 119, 253, 0.15);
		padding: 1px 4px;
		border-radius: 3px;
	}

	.tc-value {
		font-size: 12px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.85);
		font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
		letter-spacing: 0.3px;
	}

	.progress-compact {
		font-size: 11px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.4);
		margin-left: 4px;
	}

	/* Transport buttons row */
	.mobile-controls-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.ctrl-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.ctrl-btn:active {
		transform: scale(0.9);
	}

	.reset-btn {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.6);
	}

	.reset-btn:active {
		background: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.9);
	}

	.first-btn {
		width: 42px;
		height: 42px;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.75);
	}

	.first-btn:active {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.prev-btn,
	.next-btn {
		width: 46px;
		height: 46px;
		background: rgba(255, 255, 255, 0.12);
		color: white;
	}

	.prev-btn:active,
	.next-btn:active {
		background: rgba(255, 255, 255, 0.25);
	}

	.play-btn {
		width: 56px;
		height: 56px;
		background: var(--highlight-color, #0377fd);
		color: white;
		box-shadow: 0 4px 16px rgba(3, 119, 253, 0.4);
	}

	.play-btn:active {
		box-shadow: 0 2px 8px rgba(3, 119, 253, 0.3);
	}

	.play-btn.running {
		background: #ff4757;
		box-shadow: 0 4px 16px rgba(255, 71, 87, 0.4);
	}

	.play-btn.running:active {
		box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
	}

	@media (max-width: 1024px) {
		.mobile-controls {
			display: flex;
		}
	}
</style>
