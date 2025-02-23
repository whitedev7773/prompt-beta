<script>
	import Button from './button.svelte';
	import { ask_confirm, clearTimestamp, timestamps, copyToClipBoard } from '$lib/store';
</script>

<div id="control">
	<Button
		onClick={() => {
			if ($timestamps.length <= 0) {
				return;
			}

			if ($ask_confirm('기록된 Beat를 초기화할까요?')) {
				$clearTimestamp();
			}
		}}
	>
		<p>초기화</p>
	</Button>
	<Button
		onClick={() => {
			if ($timestamps.length <= 0) {
				return;
			}

			var content = $timestamps.map(({ type, time }) => `${type},${time}`).join('\n');
			$copyToClipBoard(content);
			alert('복사 완료!');
		}}
		color="var(--highlight-color)"
		text_color="#ffffff"
	>
		<p>클립보드에 복사</p>
	</Button>
</div>

<style>
	#control {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0px -6px 0px -6px;
	}
</style>
