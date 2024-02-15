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
		slug: 'home_sub',
		full_path: '/'
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

<div>
	<ul class="path-list">
		{#if $page.url.host != 'sveltekit-prerender'}
			{#each path_slugs as slug}
				<li class="path-item">
					{#if $page.url.pathname != slug.full_path}
						<a href={base + slug.full_path}>({base + slug.full_path}){slug.slug}</a>
					{:else}
						{slug.slug}
					{/if}
				</li>
				::
			{/each}
		{/if}
	</ul>
</div>

<style>
	ul.path-list {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
	}
	li.path-item::before {
		content: '/';
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
