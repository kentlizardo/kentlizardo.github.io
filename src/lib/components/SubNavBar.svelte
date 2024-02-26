<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	/** @type { {[key: string]: string[][]} }*/
	const SUBROUTES = {
		'/posts': [
			['media', '/posts/media'],
			['blog', '/posts/blog']
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

<nav class="sub">
	{#if subroutes}
		<ul class="nav-list pt-sans-bold" transition:slide={{ duration: 500, easing: bounceOut }}>
			{#each subroutes as [subroute_name, subroute]}
				<li class="nav-item">
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
		padding: 0.25rem 1.5rem;
		text-decoration: none;
		color: inherit;
	}
</style>
