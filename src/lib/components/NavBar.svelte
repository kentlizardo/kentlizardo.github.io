<script>
	import { base } from '$app/paths';

	/** @type {string} */
	export let selected_route = '';

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
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<a
					on:focusin={() => {
						selected_route = route;
					}}
					on:focusout={() => {
						if (selected_route == route) selected_route = '';
					}}
					on:mouseover={() => {
						selected_route = route;
					}}
					on:mouseleave={() => {
						if (selected_route == route) selected_route = '';
					}}
					href={base + route}>{route_name}</a
				>
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
		gap: 10px;
		padding: 0;
		padding-inline: 4rem;
	}
	a {
		background-color: antiquewhite;
		padding: 0.25rem 1.5rem;
		text-decoration: none;
		color: inherit;
	}
</style>
