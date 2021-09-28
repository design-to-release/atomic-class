<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { base } from '$app/paths';

	const defaultComponent = {
		san: 'button',
		svelte: 'button'
	};
	export async function load({ page: { params } }: LoadInput): Promise<LoadOutput> {
		const { framework } = params;
		return {
			status: 302,
			redirect: `${base}/${framework}/${defaultComponent[framework]}`
		};
	}
</script>
