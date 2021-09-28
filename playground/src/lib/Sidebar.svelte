<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	$: framework = $page.params.framework;

	export let list: string[];
	export let actived: string;
</script>

<section class="px-4 py-3 flex flex-col items-center border-r border-gray-100 w-36 text-green-600">
	{#each list as item}
		<a href="{base}/{framework}/{item}" class="link" class:active={actived === item}>{item}</a>
	{/each}
</section>

<style lang="postcss">
	.link {
		@apply capitalize inline-block text-green-600 border-b-2 border-transparent hover:border-green-600;
	}

	.link.active {
		@apply border-green-600;
	}
</style>
