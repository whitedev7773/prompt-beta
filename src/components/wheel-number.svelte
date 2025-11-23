<script lang="ts">
	import '$lib/global.css';
	import { startTime } from '$lib/store';

	export let number: number = 0;

	export let max_scroll: number = 60;
	export let min_scroll: number = 0;

	export let type: 'hour' | 'min' | 'sec' | 'fps' | 'none' = 'none';

	function handleScroll(event: WheelEvent): void {
		const delta = Math.sign(event.deltaY); // Get the scroll direction (+1 or -1)
		number -= delta;
		if (number <= min_scroll) {
			number = min_scroll;
		}

		if (number >= max_scroll) {
			number = max_scroll;
		}

		switch (type) {
			case 'hour':
				startTime.set([number, $startTime[1], $startTime[2], $startTime[3]]);
				break;
			case 'min':
				startTime.set([$startTime[0], number, $startTime[2], $startTime[3]]);
				break;
			case 'sec':
				startTime.set([$startTime[0], $startTime[1], number, $startTime[3]]);
				break;
			case 'fps':
				startTime.set([$startTime[0], $startTime[1], $startTime[2], number]);
				break;
		}
	}

	export let style = '';
</script>

<p {style} on:wheel={handleScroll}>{number.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>

<style>
	p {
		cursor: none;
	}

	p:hover {
		color: var(--highlight-color);
		font-weight: bold;
	}
</style>
