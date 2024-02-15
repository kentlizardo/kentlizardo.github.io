<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const routes = {
		'/': 'home',
		'/about': 'about'
	};

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
	<nav>
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
		<ul class="nav-list">
			{#each Object.entries(routes) as [route, route_name]}
				<li class="nav-item">
					<a href={base + route}>{route_name}</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
	}
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
	ul.nav-list {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	li.nav-item {
		text-decoration: none;
		color: inherit;
	}
</style>
