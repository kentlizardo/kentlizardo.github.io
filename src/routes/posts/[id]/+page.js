/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const post = await import(`../${params.id}.md`);
	const { title, date } = post.metadata ?? {
		title: 'Untitled Post',
		date: new Date().toISOString().split('T')[0]
	};
	const Content = post.default;
	return {
		Content,
		title,
		date
	};
}
