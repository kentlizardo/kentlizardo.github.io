<script>
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';
	let path = $page.url.host;
	const allowed_hosts = ['kentmakes.games', 'kentlizardo.github.io'];
</script>

<div class="header">
	<div class="header-logo">
		<h1 class="oxygen-mono-regular">
			<!-- {#if $page.url.host != 'sveltekit-prerender'} -->
			{#if allowed_hosts.includes($page.url.host)}
				{path}
			{:else}
				dev({path})
			{/if}
		</h1>
		<div class="subheader">
			<NavPath></NavPath>
		</div>
	</div>
</div>
<NavBar></NavBar>

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
