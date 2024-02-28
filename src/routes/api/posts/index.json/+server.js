import { fetchAllPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const allPosts = await fetchAllPosts();
	const sortedPosts = allPosts.sort((a, b) => {
		return Number(new Date(b.meta.date)) - Number(new Date(a.meta.date));
	});
	return json(sortedPosts);
};
