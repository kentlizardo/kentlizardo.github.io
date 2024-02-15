<script>
	import { base } from '$app/paths';
	const routes = {
		'/': 'home',
		'/about': 'about'
	};
	console.log(base);
</script>

<nav>
	<ul>
		{#each Object.entries(routes) as [route, route_name]}
			<li>
				<a href={route}>{route_name}</a>
			</li>
		{/each}
	</ul>
</nav>
