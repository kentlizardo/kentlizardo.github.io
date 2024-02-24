<script>
	import MediaCard from '$lib/components/MediaCard.svelte';
	import Masonry from 'svelte-bricks/Masonry.svelte';
	import { slide } from 'svelte/transition';

	/**
	 * @typedef {Object} MediaPost
	 * @property {string} title
	 * @property {string} url
	 * @property {number} aspectRatio
	 */

	/** @type {MediaPost[]} */
	let posts = [];

	for (let i = 0; i < 20; i++) {
		const w = Math.floor(Math.random() * 101) + 100;
		const h = Math.floor(Math.random() * 101) + 100;
		posts.push({
			title: 'bruh ' + i.toString(),
			url: '/media/' + i.toString(),
			aspectRatio: w / h
		});
	}
</script>

<h1>Media</h1>

<div>
	<Masonry items={posts} idKey="url" minColWidth={200} maxColWidth={600} gap={10} let:item>
		<div class="grid-item"><MediaCard post={item}></MediaCard></div>
	</Masonry>
</div>

<style>
	:global(div.masonry) {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	.grid-item {
		margin: 0;
		padding: 1rem;
		border: solid 1px;
	}
</style>
