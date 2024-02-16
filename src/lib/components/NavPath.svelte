<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	/**
	 * @typedef SlugPath
	 * @prop {string} slug The slug, e.g 'about'
	 * @prop {string} full_path The full path a slug leads to, e.g. 'posts/5'
	 */

	/**
	 * @type SlugPath
	 */
	const home_slug = {
		slug: '/',
		full_path: ''
	};

	/**
	 * @param {string} path
	 * @returns {SlugPath[]}
	 *  */
	function split_path(path) {
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
	$: path_slugs = split_path($page.url.pathname);
	$: console.log(path_slugs);
</script>

<div class="pt-sans-bold">
	<ul class="path-list">
		{#if $page.url.host != 'sveltekit-prerender'}
			{#each path_slugs as slug}
				<li class="path-item">
					{#if $page.url.pathname != slug.full_path}
						<a class="path-slug" href={base + slug.full_path}>{slug.slug}</a>
					{:else}
						<span class="path-slug">{slug.slug}</span>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
</div>

<style>
	ul.path-list {
		background-color: #f8f8f8;
		border-radius: 8px;
		list-style-type: none;
		padding: 0.2rem;
		display: flex;
		flex-wrap: wrap;
	}
	li.path-item {
		padding: 0;
	}
	.path-slug {
		border-radius: 8px;
		background-color: inherit;
		transition: background-color 0.5s ease-out;
		padding: 0.2rem;
		text-decoration: none;
		color: inherit;
	}
	.path-slug:hover {
		background-color: #ccc;
	}
</style>
