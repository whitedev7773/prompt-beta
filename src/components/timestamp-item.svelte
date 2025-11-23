<script lang="ts">
	import '$lib/global.css';

	export let type: string = 'none';
	export let timecode: string = '00:00:00:00';
	export let onDelete: (() => void) | undefined = undefined;
	export let onEdit: ((newTimecode: string) => void) | undefined = undefined;

	let isEditing = false;
	let editValue = timecode;

	function startEdit(): void {
		isEditing = true;
		editValue = timecode;
	}

	function saveEdit(): void {
		if (onEdit && editValue.trim() !== '') {
			onEdit(editValue);
		}
		isEditing = false;
	}

	function cancelEdit(): void {
		isEditing = false;
		editValue = timecode;
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			saveEdit();
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	}

	function focusElement(node: HTMLElement): void {
		node.focus();
	}
</script>

<div class="item-box">
	<div class="type">
		<p class="bold">{type}</p>
	</div>
	<div
		class="timecode"
		role="button"
		tabindex="0"
		on:dblclick={onEdit ? startEdit : undefined}
		on:keydown={(e) => e.key === 'Enter' && onEdit && startEdit()}
	>
		{#if isEditing}
			<input
				type="text"
				bind:value={editValue}
				on:keydown={handleKeydown}
				on:blur={saveEdit}
				class="timecode-input"
				use:focusElement
			/>
		{:else}
			<p class="normal">{timecode}</p>
		{/if}
	</div>
	{#if onDelete}
		<button class="delete-btn" on:click={onDelete} title="삭제">×</button>
	{/if}
</div>

<style>
	.item-box {
		background-color: rgb(243, 243, 243);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 30px;
		height: 30px;
		margin: 8px 0px 8px 0px;
		padding: 0 4px;
		gap: 4px;
		position: relative;
	}

	.type {
		min-width: 70px;
		width: 70px;
		height: 30px;
		background-color: #deedff;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.type > p {
		margin: 0;
		color: var(--highlight-color);
		font-size: 12px;
	}

	.timecode {
		flex: 1;
		height: 30px;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.timecode > p {
		margin: 0;
		color: black;
		font-size: 12px;
	}

	.delete-btn {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: none;
		background-color: #ff4444;
		color: white;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition: background-color 0.2s;
	}

	.delete-btn:hover {
		background-color: #cc0000;
	}

	.delete-btn:active {
		background-color: #990000;
	}

	.timecode-input {
		width: 100%;
		padding: 4px 8px;
		border: 2px solid var(--highlight-color);
		border-radius: 4px;
		background-color: white;
		color: black;
		font-size: 12px;
		text-align: center;
		outline: none;
	}

	.timecode {
		cursor: pointer;
	}

	.timecode:hover {
		background-color: rgba(0, 0, 0, 0.03);
		border-radius: 4px;
	}
</style>