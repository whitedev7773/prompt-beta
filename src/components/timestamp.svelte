<script lang="ts">
	import { timestamps } from '$lib/store';
	import TimestampItem from './timestamp-item.svelte';

	function deleteTimestamp(index: number): void {
		timestamps.update((items) => items.filter((_, i) => i !== index));
	}

	function editTimestamp(index: number, newTimecode: string): void {
		timestamps.update((items) => {
			const updated = [...items];
			updated[index] = { ...updated[index], time: newTimecode };
			return updated;
		});
	}
</script>

<div id="list">
	{#each $timestamps as timestamp, index}
		<TimestampItem
			type={timestamp.type}
			timecode={timestamp.time}
			onDelete={() => deleteTimestamp(index)}
			onEdit={(newTimecode) => editTimestamp(index, newTimecode)}
		/>
	{:else}
		<p style="text-align:center">비어있음</p>
	{/each}
</div>
