export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts/media.json`);
	const posts = await response.json();
	return {
		posts
	};
};
