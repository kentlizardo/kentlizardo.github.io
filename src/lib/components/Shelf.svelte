<script>
	import { onMount } from 'svelte';
	import { createScene, renderer, resize } from '$lib/scene';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let ref;

	/**
	 * @type {DOMRectReadOnly}
	 */
	let wrapperRect;

	onMount(() => {
		createScene(ref);
	});
	$: if (wrapperRect) {
		resize();
	}
</script>

<div bind:contentRect={wrapperRect}>
	<canvas bind:this={ref} />
</div>

<style>
	div {
		background-color: antiquewhite;
		aspect-ratio: 1/1;
	}
	canvas {
		position: relative;
		width: 100%;
		height: 100%;
		border: 2px solid lime;
	}
</style>
