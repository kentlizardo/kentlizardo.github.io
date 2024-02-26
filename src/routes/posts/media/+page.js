export const load = async ({ fetch }) => {
	const response = await fetch(`api/posts/media`);
	const posts = await response.json();
	return {
		posts
	};
};
