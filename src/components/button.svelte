<script>
	import '$lib/global.css';

	export let color = '#eaeaea';
	export var width = '120px';
	export var height = '44px';
	export let text_color = '#0a0a0a';

	export let onClick = () => {};
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
