<script>
	import { page } from '$app/stores';
	/**
	 * @typedef SlugPath
	 * @prop {string} slug The slug, e.g 'about'
	 * @prop {string} full_path The full path a slug leads to, e.g. 'posts/5'
	 */

	/**
	 * @param {string} path
	 * @returns {SlugPath[]}
	 *  */
	function split_path(path) {
		if (path == '/') {
			return [
				{
					slug: 'home',
					full_path: '/'
				}
			];
		}
		/**
		 * @type {SlugPath[]}
		 */
		const paths = [];
		var route = '';
		path = path.substring(1); // remove leading '/'
		path.split('/').forEach((slug) => {
			route += '/' + slug;
			/** @type {SlugPath} */
			const newSlugPath = {
				slug: slug,
				full_path: route
			};
			paths.push(newSlugPath);
		});
		return paths;
	}
	$: path_slugs = split_path($page.url.pathname);
</script>

<div>
	<ul class="path-list">
		{#each path_slugs as slug}
			<li class="path-item">
				{#if $page.url.pathname != slug.full_path}
					<a href={slug.full_path}>{slug.slug}</a>
				{:else}
					{slug.slug}
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	ul.path-list {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	li.path-item {
		text-decoration: none;
		color: inherit;
	}
</style>
