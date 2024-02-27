<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { bounceOut, quadOut, quartInOut, quartOut } from 'svelte/easing';

	/** @type { {[key: string]: string[][]} }*/
	const SUBROUTES = {
		'/posts': [
			['/media', '/posts/media'],
			['/blog', '/posts/blog']
		]
	};

	/** @type {string} */
	export let selected_route = '';

	/** @type {string[][]} */
	let subroutes = [];

	let subroute_key = '';

	// $: {
	// 	if (selected_route == '')
	// 		subroute_key = $page.url.pathname;
	// 	else
	// 		subroute_key = selected_route;
	// }
	$: subroute_key = $page.url.pathname;
	$: subroutes = SUBROUTES[subroute_key];
</script>

<svelte:head>
	<!-- PT Sans -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<nav class="sub">
	{#if subroutes}
		<ul
			class="nav-list overpass-nav"
			transition:slide={{ delay: 100, duration: 500, easing: quadOut }}
		>
			{#each subroutes as [subroute_name, subroute]}
				<li>
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<a
						on:focusin={() => {
							selected_route = subroute;
						}}
						on:focusout={() => {
							if (selected_route == subroute) selected_route = '';
						}}
						on:mouseover={() => {
							selected_route = subroute;
						}}
						on:mouseleave={() => {
							if (selected_route == subroute) selected_route = '';
						}}
						href={base + subroute}>{subroute_name}</a
					>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

<style>
	nav {
		padding: 0.25rem 0.5rem;
		background-color: #7ab6cd;
	}
	ul.nav-list {
		display: flex;
		flex-wrap: nowrap;
		justify-content: end;
		list-style-type: none;
		margin: 0;
		margin-left: auto;
		gap: 10px;
		padding: 1rem;
	}
	a {
		border-radius: 5px;
		background-color: #f8f8f8;
		padding: 0.25rem 0.5rem;
		text-decoration: none;
		color: inherit;
		font-size: 1rem;
	}
	.overpass-nav {
		font-family: 'Overpass', sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: italic;
	}
</style>
