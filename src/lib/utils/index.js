export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/routes/posts/*.md');
	const iterablePosts = Object.entries(allPostFiles);
	const allPosts = await Promise.all(
		// @ts-ignore
		iterablePosts.map(async ([path, resolver]) => {
			try {
				const resolved = await resolver();
				// @ts-ignore
				const meta = resolved.metadata;
				// @ts-ignore
				const content = resolved.default.render();
				return {
					meta: meta,
					path: path.slice(11, -3), // convert route to path
					content: content
				};
			} catch (error) {
				return {
					meta: undefined,
					path: path.slice(11, -3),
					content: error
				};
			}
		})
	);
	return allPosts;
};
