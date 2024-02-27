<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	/** @type { {[key: string]: string} }*/
	const ROUTES = {
		'/': 'home',
		// '/projects': 'projects',
		'/about': 'about',
		// '/shelf': 'shelf',
		'/posts': 'posts',
		'/contact': 'contact'
	};

	/** @type {string} */
	export let selected_route = '';

	let activeMainRoute = '';

	$: {
		const trimmedRoute = $page.url.pathname.substring(1);
		const nextSlash = trimmedRoute.indexOf('/');
		let mainRoute;
		if (nextSlash != -1) mainRoute = '/' + trimmedRoute.substring(0, nextSlash);
		else mainRoute = '/' + trimmedRoute;
		activeMainRoute = mainRoute;
		console.log(mainRoute);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<nav class="main">
	<ul class="nav-list overpass-nav">
		{#each Object.entries(ROUTES) as [route, route_name]}
			<li>
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<a
					class:active={activeMainRoute == route}
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
		margin: 0.5rem;
	}
	ul.nav-list {
		display: flex;
		flex-wrap: nowrap;
		justify-content: end;
		list-style-type: none;
		margin: 0;
		margin-left: auto;
		gap: 10px;
		padding: 0;
	}
	a {
		border-radius: 5px;
		padding: 0.25rem 1rem;
		padding-top: 0.3rem;
		text-decoration: none;
		color: #f8f8f8f8;
		font-size: 1.5rem;
		text-align: start;
	}
	a.active::before {
		content: '*';
	}

	.overpass-nav {
		font-family: 'Overpass', sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: italic;
	}
</style>
