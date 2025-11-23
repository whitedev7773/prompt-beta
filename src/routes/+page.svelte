<script lang="ts">
	import '$lib/app.css';
	import Lyric from '../components/Lyric.svelte';
	import Container from '../components/container.svelte';
	import Control from '../components/control.svelte';
	import Timestamp from '../components/timestamp.svelte';
	import Stopwatch from '../components/stopwatch.svelte';
	import KeyboardGuide from '../components/keyboard-guide.svelte';
	import Toast from '../components/toast.svelte';
	import { onMount } from 'svelte';

	import { timestamps } from '$lib/store';
	import type { LyricState, StopwatchComponent } from '$lib/types';

	export let dev = false;

	let focusing_index = -2;
	let lyric_input: string = '';
	let lyrics: string[][] = [];
	let validation_error: string = '';
	let isLoaded = false;

	// Load from localStorage on mount
	onMount(() => {
		const savedLyrics = localStorage.getItem('lyric_input');
		const savedTimestamps = localStorage.getItem('timestamps');
		const savedIndex = localStorage.getItem('focusing_index');

		if (savedLyrics) lyric_input = savedLyrics;
		if (savedTimestamps) {
			try {
				timestamps.set(JSON.parse(savedTimestamps));
			} catch (e) {
				console.error('Failed to parse saved timestamps:', e);
			}
		}
		if (savedIndex) focusing_index = parseInt(savedIndex);

		isLoaded = true;
	});

	$: {
		const parsed = lyric_input
			.split('\n\n')
			.map((line) => line.split('\n'))
			.filter((lyric) => lyric.some((line) => line.trim() !== ''));

		// Validate each lyric has exactly 3 lines
		const invalid = parsed.find((lyric) => lyric.length !== 3);
		if (invalid && lyric_input.trim() !== '') {
			validation_error = `가사 형식 오류: 각 가사 블록은 정확히 3줄이어야 합니다. (현재 ${invalid.length}줄)`;
			lyrics = parsed.map((lyric) => {
				while (lyric.length < 3) lyric.push('.');
				return lyric.slice(0, 3);
			});
		} else {
			validation_error = '';
			lyrics = parsed;
		}
	}

	function getState(index: number, focusing_index: number): LyricState {
		if (index <= focusing_index - 1) {
			return 'exit';
		} else if (index === focusing_index) {
			return 'focus';
		} else if (index === focusing_index + 1) {
			return 'preview';
		} else {
			return 'queue';
		}
	}

	let scrollContainer: HTMLDivElement;
	let target_fps: number = 60;
	let stopwatch: StopwatchComponent;

	const addTimestamp = (type: string, timecode: string): void => {
		timestamps.set([...$timestamps, { type, time: timecode }]);
	};

	function onKeyDown(e: KeyboardEvent): void {
		// 입력창에서는 무시
		const target = e.target as HTMLElement;
		if (target.tagName === 'TEXTAREA') return;

		console.log(e.code);
		if (e.repeat) return;

		switch (e.code) {
			case 'KeyR':
				stopwatch.Reset();
				break;
			case 'Enter':
				if (stopwatch.isRun()) {
					stopwatch.Stop();
				} else {
					stopwatch.Start();
				}
				break;
			case 'ArrowRight':
				focusing_index++;
				addTimestamp('next', stopwatch.GetTime());
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: 'smooth'
				});
				break;
			case 'ArrowLeft':
				focusing_index--;
				addTimestamp('prev', stopwatch.GetTime());
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: 'smooth'
				});
				break;
		}
	}

	// FPS 변경 시 stopwatch 재초기화
	$: if (stopwatch && target_fps) {
		stopwatch.Relaunch(target_fps);
	}

	// Save to localStorage when data changes
	$: if (isLoaded && lyric_input !== undefined) {
		localStorage.setItem('lyric_input', lyric_input);
	}

	$: if (isLoaded && $timestamps) {
		localStorage.setItem('timestamps', JSON.stringify($timestamps));
	}

	$: if (isLoaded && focusing_index !== undefined) {
		localStorage.setItem('focusing_index', focusing_index.toString());
	}
</script>

<div class="input-container">
	<div class="dev-toggle-wrapper">
		<input id="dev-toggle" type="checkbox" bind:checked={dev} class="dev-toggle-input" />
		<label for="dev-toggle" class="dev-toggle-label">
			<span class="dev-toggle-slider"></span>
			<span class="dev-toggle-text">Dev Mode</span>
		</label>
	</div>

	<div class="lyric-input-wrapper">
		<label for="lyric-textarea" class="lyric-input-label">가사 입력</label>
		<textarea
			id="lyric-textarea"
			bind:value={lyric_input}
			class="lyric-textarea"
			placeholder="가사를 입력하세요&#10;&#10;각 가사 블록은 3줄로 구성되며&#10;블록 사이는 빈 줄로 구분합니다.&#10;&#10;예시:&#10;첫 번째 줄&#10;두 번째 줄&#10;세 번째 줄&#10;&#10;다음 블록 첫 줄&#10;다음 블록 두 번째 줄&#10;다음 블록 세 번째 줄"
		></textarea>
		{#if validation_error}
			<p class="validation-error">{validation_error}</p>
		{/if}
	</div>
</div>

{#each lyrics as lyric, index}
	<Lyric {dev} {lyric} state={getState(index, focusing_index)}></Lyric>
{/each}

<div id="sidebar">
	<Container style="width: 250px">
		<p class="container-title bold">타임스탬프</p>
		<p class="container-subtitle normal">복사 후 Script를 사용합니다.</p>
		<div
			bind:this={scrollContainer}
			style="
			max-height: 200px;
			overflow-y: auto;
			margin: 40px 0px 40px 0px;
			padding: 0px 0px 30px 0px;
		"
		>
			<Timestamp />
		</div>
		<Control />
	</Container>
	<Container style="width: 250px">
		<div style="display: flex; justify-content: space-between; align-items: center; height: 36px;">
			<p class="container-subtitle bold" style="color:black;">타켓 프레임</p>
			<select bind:value={target_fps} style="width: 80px;">
				<option value="60">60fps</option>
				<option value="30">30fps</option>
				<option value="24">24fps</option>
			</select>
		</div>
		<div style="display: flex; justify-content: space-between; align-items: center; height: 36px;">
			<p class="container-subtitle bold" style="color:black;">타임코드 진행</p>
			<Stopwatch bind:this={stopwatch} />
		</div>
		<p class="container-subtitle" style="font-size: 12px; text-align: right;">R:초기화</p>
		<p class="container-subtitle" style="font-size: 12px; text-align: right;">Enter:시작/정지</p>
	</Container>
</div>

<KeyboardGuide />
<Toast />

<svelte:window on:keydown={onKeyDown} />

<style>
	.container-title {
		margin: 0;
		font-size: 24px;
	}

	.container-subtitle {
		margin: 0;
		font-size: 15px;
		color: gray;
	}

	select {
		padding: 4px;
		border-radius: 30px;
		color: var(--highlight-color);
		border: 1px solid var(--highlight-color);
	}

	.validation-error {
		color: #ff4444;
		background-color: rgba(255, 68, 68, 0.1);
		padding: 8px 12px;
		border-radius: 4px;
		border-left: 3px solid #ff4444;
		margin: 8px 0;
		font-size: 14px;
		font-weight: bold;
	}

	/* Input Container */
	.input-container {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 500px;
	}

	/* Dev Toggle Styles */
	.dev-toggle-wrapper {
		display: flex;
		align-items: center;
	}

	.dev-toggle-input {
		display: none;
	}

	.dev-toggle-label {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		user-select: none;
	}

	.dev-toggle-slider {
		position: relative;
		width: 50px;
		height: 26px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 34px;
		transition: background-color 0.3s ease;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.dev-toggle-slider::before {
		content: '';
		position: absolute;
		height: 18px;
		width: 18px;
		left: 4px;
		top: 2px;
		background-color: white;
		border-radius: 50%;
		transition: transform 0.3s ease;
	}

	.dev-toggle-input:checked + .dev-toggle-label .dev-toggle-slider {
		background-color: var(--highlight-color, #00ff88);
		border-color: var(--highlight-color, #00ff88);
	}

	.dev-toggle-input:checked + .dev-toggle-label .dev-toggle-slider::before {
		transform: translateX(24px);
	}

	.dev-toggle-text {
		color: white;
		font-size: 14px;
		font-weight: 600;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Lyric Input Styles */
	.lyric-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.lyric-input-label {
		color: white;
		font-size: 14px;
		font-weight: 600;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		margin-bottom: 4px;
	}

	.lyric-textarea {
		width: 100%;
		min-height: 200px;
		padding: 16px;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		color: white;
		font-size: 14px;
		font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
		line-height: 1.6;
		resize: vertical;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.lyric-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
		line-height: 1.6;
	}

	.lyric-textarea:focus {
		outline: none;
		border-color: var(--highlight-color, #00ff88);
		background-color: rgba(0, 0, 0, 0.8);
		box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4);
	}

	.lyric-textarea:hover {
		border-color: rgba(255, 255, 255, 0.3);
	}
</style>
