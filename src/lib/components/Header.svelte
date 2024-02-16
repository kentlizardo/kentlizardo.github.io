<script>
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';
	let path = $page.url.host;
	const allowed_hosts = ['kentmakes.games', 'kentlizardo.github.io'];
</script>

<div class="header oxygen-mono-regular">
	<h1>
		<!-- {#if $page.url.host != 'sveltekit-prerender'} -->
		{#if allowed_hosts.includes($page.url.host)}
			{path}
		{:else}
			dev({path})
		{/if}
	</h1>
	<NavPath></NavPath>
</div>
<NavBar></NavBar>

<style>
	div.header {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	h1 {
		margin: 2rem;
	}
</style>
