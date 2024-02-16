<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import NavPath from './NavPath.svelte';

	const routes = {
		'/': 'home',
		'/shelf': 'shelf',
		'/about': 'about',
		'/about/contact': 'contact'
	};
</script>

<nav>
	<ul class="nav-list">
		{#each Object.entries(routes) as [route, route_name]}
			<li class="nav-item">
				<a href={base + route}>{route_name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	ul.nav-list {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 0;
		padding-inline: 4rem;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
