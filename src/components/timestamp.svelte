<script>
	import { timestamps } from '$lib/store';
	import TimestampItem from './timestamp-item.svelte';
</script>

<div id="list">
	{#each $timestamps as timestamp}
		<TimestampItem type={timestamp.type} timecode={timestamp.time} />
	{:else}
		<p style="text-align:center">비어있음</p>
	{/each}
</div>
