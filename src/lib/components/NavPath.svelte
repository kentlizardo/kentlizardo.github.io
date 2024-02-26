<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { fly, slide, fade } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';
	import { expoInOut, quadIn } from 'svelte/easing';
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

	let show_normal_slugs = true;

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
		let route = path;
		let i = route.lastIndexOf('/');
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
	$: {
		typed_slugs = split_path(typed_pathname);
		path_slugs = split_path($page.url.pathname);
		show_normal_slugs = typed_pathname == '' || typed_pathname == $page.url.pathname;
	}
</script>

<div class="container pt-sans">
	{#if $page.url.host != 'sveltekit-prerender'}
		{#if show_normal_slugs}
			<ul class="path-list" in:fly={{ y: -20, duration: 300, easing: expoInOut }}>
				{#each path_slugs as slug, index}
					<li class="path-item" transition:slide={{ axis: 'x' }}>
						{#if index != path_slugs.length - 1}
							{#if slug.full_path != '/'}
								<a class="active" href={base + slug.full_path}>
									<span class="path-slug">{slug.slug}</span><span>/</span>
								</a>
							{:else}
								<a class="active" href={base + slug.full_path}>
									<span class="path-slug">{slug.slug}</span>
								</a>
							{/if}
						{:else}
							<span class="path-slug tail">{slug.slug}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
		{#if !show_normal_slugs}
			<ul class="path-list typed" in:fly={{ y: 20, duration: 300, easing: expoInOut }}>
				<Typewriter mode="cascade" interval={60}>
					{#key typed_slugs}
						{#each typed_slugs as slug, index}
							<li class="path-item">
								{#if index != typed_slugs.length - 1}
									{#if slug.full_path != '/'}
										<span class="path-slug">{slug.slug}</span><span>/</span>
									{:else}
										<span class="path-slug">{slug.slug}</span>
									{/if}
								{:else}
									<span class="path-slug tail">{slug.slug}</span>
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
		padding: 0.2rem 0.4rem;
		padding-right: 0;
		overflow: hidden;
	}
	ul.path-list.typed {
		background-color: #7ab6cd;
	}
	li.path-item {
		display: inline-block;
		text-wrap: nowrap;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	.path-slug {
		padding: 0.2rem;
		border-radius: 8px;
		background-color: inherit;
		transition: background-color 0.5s ease-out;
	}
	.tail {
		padding-right: 0.4rem;
	}
	.active:hover > .path-slug {
		background-color: #ccc;
	}
</style>
