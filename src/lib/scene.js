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
export let renderer;

let _init = false;
const init = (el) => {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	geometry = new THREE.BoxGeometry();
	material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	cube = new THREE.Mesh(geometry, material);

	scene.add(cube);
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
	animate();
	resize();
	_init = true;
};

const animate = () => {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
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
	if (!_init) init(el);
};
