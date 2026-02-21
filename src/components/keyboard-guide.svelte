<script lang="ts">
	let isVisible = false;

	function toggleGuide(): void {
		isVisible = !isVisible;
	}
</script>

<button class="help-btn" on:click={toggleGuide} title="키보드 단축키">?</button>

{#if isVisible}
	<button class="overlay" on:click={toggleGuide} aria-label="가이드 닫기"></button>
	<div class="guide-modal">
		<div class="guide-header">
			<h2>키보드 단축키</h2>
			<button class="close-btn" on:click={toggleGuide}>×</button>
		</div>
		<div class="guide-content">
			<div class="shortcut-item">
				<kbd>Enter</kbd>
				<span>스톱워치 시작/정지</span>
			</div>
			<div class="shortcut-item">
				<kbd>R</kbd>
				<span>스톱워치 초기화</span>
			</div>
			<div class="shortcut-item">
				<kbd>→</kbd>
				<span>다음 가사로 이동 + 타임스탬프 기록</span>
			</div>
			<div class="shortcut-item">
				<kbd>←</kbd>
				<span>이전 가사로 이동 + 타임스탬프 기록</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.help-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: none;
		background-color: var(--highlight-color, #4a90e2);
		color: white;
		font-size: 24px;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		transition: all 0.3s;
		z-index: 1000;
	}

	@media (max-width: 1024px) {
		.help-btn {
			display: none;
		}
	}

	.help-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1001;
		cursor: pointer;
	}

	.guide-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 12px;
		padding: 24px;
		max-width: 500px;
		width: 90%;
		z-index: 1002;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.guide-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 2px solid #f0f0f0;
		padding-bottom: 12px;
	}

	.guide-header h2 {
		margin: 0;
		color: #333;
		font-size: 24px;
	}

	.close-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: none;
		background-color: #f0f0f0;
		color: #666;
		font-size: 24px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background-color: #e0e0e0;
		color: #333;
	}

	.guide-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.shortcut-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px;
		background-color: #f9f9f9;
		border-radius: 8px;
		transition: background-color 0.2s;
	}

	.shortcut-item:hover {
		background-color: #f0f0f0;
	}

	kbd {
		display: inline-block;
		min-width: 60px;
		padding: 8px 12px;
		background-color: white;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-family: monospace;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		color: #333;
	}

	.shortcut-item span {
		flex: 1;
		color: #555;
		font-size: 15px;
	}
</style>
