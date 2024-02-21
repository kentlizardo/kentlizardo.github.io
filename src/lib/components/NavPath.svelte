<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { fly, slide } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';
	/**
	 * @typedef SlugPath
	 * @prop {string} slug The slug, e.g 'about'
	 * @prop {string} full_path The full path a slug leads to, e.g. 'posts/5'
	 */

	/**
	 * @type {string}
	 */
	export let typed_pathname = '';

	/** @type {SlugPath[]} */
	let path_slugs = [];
	/** @type {SlugPath[]} */
	let typed_slugs = [];

	/**
	 * @type SlugPath
	 */
	const home_slug = {
		slug: '/',
		full_path: '/'
	};

	/**
	 * @param {string} path
	 * @returns {SlugPath[]}
	 *  */
	function split_path(path) {
		if (path == '') {
			return [];
		}
		if (path == '/') {
			return [home_slug];
		}
		/**
		 * @type {SlugPath[]}
		 */
		const paths = [];
		var route = path;
		var i = route.lastIndexOf('/');
		while (i >= 0) {
			const slug = route.substring(i + 1);
			/** @type {SlugPath} */
			const newSlugPath = {
				slug: slug,
				full_path: route
			};
			paths.unshift(newSlugPath);
			route = route.substring(0, i);
			i = route.lastIndexOf('/');
		}
		paths.unshift(home_slug);
		return paths;
	}
	$: typed_slugs = split_path(typed_pathname);
	$: path_slugs = split_path($page.url.pathname);
</script>

<div class="container pt-sans">
	{#if $page.url.host != 'sveltekit-prerender'}
		{#if typed_pathname == '' || typed_pathname == $page.url.pathname}
			<ul class="path-list" in:fly={{ y: -20, duration: 250 }} out:fly={{ y: -20, duration: 250 }}>
				{#each path_slugs as slug, index}
					<li class="path-item" transition:slide={{ axis: 'x' }}>
						{#if index != path_slugs.length - 1}
							{#if slug.full_path != '/'}
								<a class="path-slug active" href={base + slug.full_path}>
									<span>{slug.slug}</span><span>/</span>
								</a>
							{:else}
								<a class="path-slug active" href={base + slug.full_path}>
									<span>{slug.slug}</span>
								</a>
							{/if}
						{:else}
							<span class="path-slug">{slug.slug}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<ul
				class="path-list path-list-typed"
				in:fly={{ y: 20, duration: 250 }}
				out:fly={{ y: 20, duration: 250 }}
			>
				<Typewriter mode="cascade">
					{#key typed_slugs}
						{#each typed_slugs as slug, index}
							<li class="path-item">
								{#if index != typed_slugs.length - 1}
									{#if slug.full_path != '/'}
										<span>{slug.slug}</span><span>/</span>
									{:else}
										<span>{slug.slug}</span>
									{/if}
								{:else}
									<span>{slug.slug}</span>
								{/if}
							</li>
						{/each}
					{/key}
				</Typewriter>
			</ul>
		{/if}
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.container > * {
		grid-row: 1;
		grid-column: 1;
	}
	ul.path-list {
		display: flex;
		flex-wrap: wrap;
		background-color: #f8f8f8;
		border-radius: 8px;
		list-style-type: none;
		margin: 0 auto;
		margin-left: 0;
		padding: 0.2rem;
	}
	ul.path-list-typed {
		background-color: antiquewhite;
	}
	li.path-item {
		padding: 0;
	}
	span {
		padding: 0.2rem;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	.path-slug {
		border-radius: 8px;
		background-color: inherit;
		transition: background-color 0.5s ease-out;
	}
	.active:hover {
		background-color: #ccc;
	}
</style>
