<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	const icon_overrides = {
		'/posts': 'pencil',
		'/projects': 'hammer',
		'/shelf': 'sword',
		'/contact': 'bubble'
	};

	/** @type {string} */
	let selected_route = '';
	let bubble = '';
	$: {
		let newBubble = '';
		for (const [key, val] of Object.entries(icon_overrides)) {
			if ($page.url.pathname.startsWith(key)) {
				newBubble = val;
			}
		}
		if (bubble != newBubble) bubble = newBubble; // weird logic due to reactive purporses and #key interactions.
	}
</script>

<header>
	<div class="header-logo">
		<h1 class="oxygen-mono-regular">kentmakes.games</h1>
		<div class="icon-container">
			{#key bubble}
				<div
					class="header-icon {bubble}"
					in:fly={{ y: -20, duration: 250 }}
					out:fly={{ y: 20, duration: 250 }}
				></div>
			{/key}
		</div>
		<div class="subheader">
			<NavPath typed_pathname={selected_route}></NavPath>
		</div>
	</div>
	<div class="navbar-container">
		<NavBar bind:selected_route></NavBar>
	</div>
</header>

<style>
	header {
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		background-color: #e33969;
	}
	.header-logo {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		margin-right: auto;
	}
	.header-logo > h1 {
		margin: 0;
		padding: 0;
		color: #eee;
	}
	.header-icon {
		margin: 0 4px;
		width: 32px;
		height: 32px;
		background-image: url($lib/images/pfl-icons.png);
		background-position: 64px 0px;
		image-rendering: crisp-edges;
		background-size: 400%;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.401));
	}
	.header-icon.pencil {
		background-position: 0px 0px;
	}
	.header-icon.hammer {
		background-position: -32px 0px;
	}
	.header-icon.sword {
		background-position: -64px 0px;
	}
	.header-icon.bubble {
		background-position: -96px 0px;
	}
	.icon-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.icon-container > * {
		grid-row: 1;
		grid-column: 1;
	}
	.subheader {
		margin: 0 0.2rem;
	}
</style>
