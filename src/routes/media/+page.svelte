<script>
	import MediaCard from '$lib/components/MediaCard.svelte';
	import { onMount } from 'svelte';

	// export let data;

	let posts = [
		{
			title: 'test',
			desc: 'huh',
			height: 200
		},
		{
			title: 'hi',
			desc: 'huh',
			height: 400
		},
		{
			title: 'random 1',
			desc: 'huh',
			height: 100
		},
		{
			title: 'random 2',
			desc: 'huh',
			height: 200
		},
		{
			title: 'random 3',
			desc: 'huh',
			height: 400
		},
		{
			title: 'random 4',
			desc: 'huh',
			height: 200
		}
	];

	onMount(() => {});
</script>

<h1>Media</h1>
<div>
	<ul>
		{#each posts as post, index}
			<li>{index}<MediaCard {post}></MediaCard></li>
		{/each}
	</ul>
</div>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		gap: 25px;
	}

	ul > li {
		padding: 0;
		margin: 0;
		display: block;
		border: solid 1px;
	}
</style>
