import { fetchPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const files = import.meta.glob(`/src/routes/posts/blog/*.md`);
	const allPosts = await fetchPosts(files);
	const sortedPosts = allPosts.sort((a, b) => {
		return Number(new Date(b.meta.date)) - Number(new Date(a.meta.date));
	});
	return json(sortedPosts);
};
