<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	/** @type {THREE.Scene} */
	let scene;
	/** @type {THREE.PerspectiveCamera} */
	let camera;
	/** @type {THREE.BoxGeometry} */
	let geometry;
	/** @type {THREE.MeshBasicMaterial} */
	let material;
	/** @type {THREE.Mesh} */
	let cube;
	/** @type {THREE.WebGLRenderer} */
	let renderer;

	const init = () => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		geometry = new THREE.BoxGeometry();
		material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		camera.getWorldPosition;
		// @ts-ignore
		camera.position.z = 5;
	};

	const animate = () => {
		requestAnimationFrame(animate);
		// @ts-ignore
		cube.rotation.x += 0.01;
		// @ts-ignore
		cube.rotation.y += 0.01;
		renderer.render(scene, camera);
	};

	let pixelRatio = 1;
	export const resize = () => {
		const canv = renderer.domElement;
		const w = canv.clientWidth;
		const h = canv.clientHeight;
		if (canv.width !== w || canv.height !== h) {
			renderer.setSize(w, h, false);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setPixelRatio(window.devicePixelRatio);
		}
	};

	export const createScene = (/** @type {HTMLCanvasElement} */ el) => {
		init();
		renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
		animate();
		resize();
	};

	/** @type {HTMLCanvasElement} */
	let canvas;
	/** @type {DOMRectReadOnly} */
	let wrapperRect;
	onMount(() => {
		createScene(canvas);
	});
	$: if (wrapperRect) resize();
</script>

<div bind:contentRect={wrapperRect}>
	<canvas bind:this={canvas} />
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
