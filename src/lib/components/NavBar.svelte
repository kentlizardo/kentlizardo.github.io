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

<div>
	<nav>
		<NavPath></NavPath>
		<ul class="nav-list">
			{#each Object.entries(routes) as [route, route_name]}
				<li class="nav-item">
					<a href={base + route}>{route_name}</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
	}
	ul.nav-list {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	li.nav-item {
		text-decoration: none;
		color: inherit;
	}
</style>
