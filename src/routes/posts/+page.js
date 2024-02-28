export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts/index.json`);
	const posts = await response.json();
	return {
		posts
	};
};
