<script context="module" lang="ts">
	import { base } from '$app/paths';

	export async function load() {
		return {
			status: 302,
			redirect: `${base}/svelte`
		};
	}
</script>
