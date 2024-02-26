/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const post = await import(`../${params.id}.md`);
	const { title, date, src } = post.metadata; //?? {
	const Content = post.default;
	return {
		Content,
		title,
		date,
		src
	};
}
