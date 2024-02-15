import static_adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: static_adapter({
			fallback: '404.html'
		}),
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		},
		prerender: {
			entries: ['*']
		}
	},
	preprocess: [sveltePreprocess()],
};

export default config;
