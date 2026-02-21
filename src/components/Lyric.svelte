<script lang="ts">
	export let dev = false;
	export let lyric = ['Noto Sans CJK Here', 'NanumSquare Neo Here', 'Another Neo Here'];
	export let state: 'queue' | 'preview' | 'focus' | 'exit' | string = 'preview';
	export let style = '';
</script>

<div id="lyricbox" class={state} style={`${dev ? 'border: 2px solid red;' : ''}; ${style}`}>
	<p id="jp">{lyric[0] === '.' ? ' ' : lyric[0]}</p>
	<p id="kr">{lyric[1] === '.' ? ' ' : lyric[1]}</p>
	<p id="kr">{lyric[2] === '.' ? ' ' : lyric[2]}</p>
</div>

<style>
	#lyricbox {
		transition:
			transform var(--duration) var(--velocity),
			color var(--duration) var(--velocity);

		user-select: none;
		position: absolute;
		top: 50%;
		left: 50%;

		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	#lyricbox.exit {
		color: #ffffff00;
		/* PC */
		transform: translate(-50%, calc(-50% - 200px)) scale(0.75) !important;
		/* Mobile */
		@media (max-width: 1024px) {
			transform: translate(-50%, calc(-50% - 100px)) scale(0.75) !important;
		}
	}

	#lyricbox.focus {
		color: #ffffffff;
		transform: translate(-50%, calc(-50% + 0px)) !important;
	}

	#lyricbox.preview {
		color: #ffffff88;
		/* PC */
		transform: translate(-50%, calc(-50% + 200px)) scale(0.75) !important;
		/* Mobile */
		@media (max-width: 1024px) {
			transform: translate(-50%, calc(-50% + 100px)) scale(0.75) !important;
		}
	}

	#lyricbox.queue {
		color: #ffffff00;
		/* PC */
		transform: translate(-50%, calc(-50% + 400px)) scale(0.75) !important;
		/* Mobile */
		@media (max-width: 1024px) {
			transform: translate(-50%, calc(-50% + 200px)) scale(0.75) !important;
		}
	}

	p {
		color: inherit;
		text-align: center;
		text-wrap-mode: nowrap;
	}

	#jp {
		font-family: var(--jp-font-family);
		font-size: var(--jp-font-size);
		font-weight: var(--jp-font-weight);
		line-height: var(--jp-font-size);
	}

	#kr {
		font-family: var(--kr-font-family);
		font-size: var(--kr-font-size);
		font-weight: var(--kr-font-weight);
		line-height: var(--kr-font-size);
	}

	@media (max-width: 1024px) {
		#lyricbox {
			width: 90vw;
			left: 50%;
		}

		p {
			text-wrap-mode: wrap;
			word-break: keep-all;
		}
	}

	@media (max-width: 480px) {
		#lyricbox {
			gap: 6px;
		}
	}
</style>
