export const prerender = true;
// This causes a change in CSS for some reason
// export const ssr = false;
export const load = ({ url }) => {
	const { pathname } = url;
	return { pathname };
};
