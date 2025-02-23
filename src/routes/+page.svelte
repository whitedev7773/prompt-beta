<script lang="ts">
	import '$lib/app.css';
	import Lyric from '../components/Lyric.svelte';
	import Container from '../components/container.svelte';
	import Control from '../components/control.svelte';
	import Timestamp from '../components/timestamp.svelte';
	import Stopwatch from '../components/stopwatch.svelte';

	import { timestamps, startTime } from '$lib/store';

	export let dev = false;

	let focusing_index = -2;
	let lyric_input: string = '';
	let lyrics = [];

	$: lyrics = lyric_input.split('\n\n').map((line) => line.split('\n'));

	function getState(index: number, focusing_index: number): string {
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

	let scrollContainer, target_fps: number, stopwatch: any;

	const addTimestamp = (type, timecode) => {
		timestamps.set([...$timestamps, { type: type, time: timecode }]);
	};

	function onKeyDown(e) {
		// 입력창에서는 무시
		if (e.target.tagName === 'TEXTAREA') return;

		console.log(e.code);
		if (e.repeat) return;

		switch (e.code) {
			case 'KeyR':
				stopwatch.Reset();
				break;
			case 'Enter':
				if (stopwatch.isRun() == true) {
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

	function _formatTime(arr: any) {
		const filledArray = Array(4).fill('00');
		arr.forEach((value: any, index: number) => {
			filledArray[index] = value < 10 ? `0${value}` : value;
		});
		return filledArray.join(':');
	}
</script>

<div>
	<input name="dev" type="checkbox" bind:checked={dev} />
	<label for="dev" style="color: white">dev</label>
	<textarea bind:value={lyric_input}></textarea>
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
</style>
