import Examples from '$lib/examples';

export async function get({ params }) {
	const { framework, component } = params;

	return {
		body: {
			code: Examples[framework][component],
			components: Object.keys(Examples[framework])
		}
	};
}
