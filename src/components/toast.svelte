<script lang="ts">
	import { toasts } from '$lib/store';
	import type { Toast } from '$lib/store';
</script>

<div class="toast-container">
	{#each $toasts as toast (toast.id)}
		<div class="toast toast-{toast.type}">
			<p>{toast.message}</p>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: 80px;
		right: 20px;
		z-index: 10000;
		display: flex;
		flex-direction: column;
		gap: 10px;
		pointer-events: none;
	}

	.toast {
		min-width: 250px;
		padding: 12px 16px;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		animation: slideIn 0.3s ease-out;
		pointer-events: auto;
	}

	.toast p {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
	}

	.toast-success {
		background-color: #4caf50;
		color: white;
	}

	.toast-error {
		background-color: #f44336;
		color: white;
	}

	.toast-info {
		background-color: #2196f3;
		color: white;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (max-width: 768px) {
		.toast-container {
			bottom: auto;
			top: 20px;
			left: 20px;
			right: 20px;
		}

		.toast {
			min-width: unset;
			width: 100%;
		}
	}
</style>
