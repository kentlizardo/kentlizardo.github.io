<script>
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';
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
	<div class="navbar-container">
		<NavBar bind:selected_route></NavBar>
	</div>
</div>

<style>
	.header {
		margin: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.navbar-container {
		margin: 0;
		margin-left: auto;
	}

	.header-logo {
		display: flex;
		flex-wrap: nowrap;
	}
	.header-logo > h1 {
		margin: 0;
		padding: 0;
	}

	.subheader {
		/* position: relative; */
		top: 0%;
		left: 0%;
		align-self: center;
	}
</style>
