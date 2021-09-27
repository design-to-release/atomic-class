<script lang="ts">
	export let error: Error;
</script>

<section class="flex-shrink-0 h-16 bg-gray-50 text-gray-500 p-3 text-xs">
	{#if error}
		<span class="font-bold text-red-800">{error.message}</span>
	{/if}
</section>
