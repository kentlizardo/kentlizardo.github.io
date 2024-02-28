export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts/blog.json`);
	const posts = await response.json();
	return {
		posts
	};
};
