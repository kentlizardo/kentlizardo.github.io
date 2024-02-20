<script>
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';
	import Typewriter from './Typewriter.svelte';
	let path = $page.url.host;
	const allowed_hosts = ['kentmakes.games', 'kentlizardo.github.io'];

	/** @type {string} */
	let selected_route = '';
	/** @type {Typewriter} */
	let path_typer;
	$: {
		if (path_typer) path_typer.setTarget(selected_route);
	}
</script>

<div class="header">
	<div class="header-logo">
		<h1 class="oxygen-mono-regular">
			{#if $page.url.host != 'sveltekit-prerender'}
				{#if allowed_hosts.includes($page.url.host)}
					{path}
				{:else}
					dev({path})
				{/if}
			{/if}
		</h1>
		<div class="subheader">
			<NavPath typed_pathname={selected_route}></NavPath>
		</div>
	</div>
</div>
<NavBar bind:selected_route></NavBar>

<style>
	.header {
		margin: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.header-logo {
		display: flex;
		justify-content: center;
		position: relative;
	}

	.subheader {
		position: absolute;
		right: 10%;
		bottom: -10%;
	}

	h1 {
		margin: 1rem 2rem;
	}
</style>
