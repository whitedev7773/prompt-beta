<script lang="ts">
	import '$lib/global.css';

	export let color: string = '#eaeaea';
	export let width: string = '120px';
	export let height: string = '44px';
	export let text_color: string = '#0a0a0a';

	export let onClick: (() => void) | undefined = undefined;
</script>

<button
	on:click={onClick}
	class="bold"
	style="background-color: {color}; width: {width}; height: {height}; color: {text_color}"
>
	<slot></slot>
</button>

<style>
	button {
		padding: 0;
		border-radius: 44px;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 3px;
		transition: filter 0.2s ease-out;
	}

	button:hover {
		filter: brightness(0.95);
	}
</style>
