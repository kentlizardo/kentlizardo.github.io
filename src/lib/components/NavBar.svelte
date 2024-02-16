<script>
	import { base } from '$app/paths';

	const routes = {
		'/': 'home',
		'/shelf': 'shelf',
		'/about': 'about',
		'/posts': 'posts',
		'/about/contact': 'contact'
	};
</script>

<nav>
	<ul class="nav-list pt-sans-bold">
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
		margin: 1rem;
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
