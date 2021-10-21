<script context="module" lang="ts">
	interface SelectedChangeEventDetail {
		selectedIndex: number;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let list: string[];
	export let selectedIndex = 0;

	const dispatch = createEventDispatcher<{
		selectedchange: SelectedChangeEventDetail;
	}>();
</script>

<section class="flex">
	{#each list as title, index}
		<div
			class="relative"
			on:click={() => {
				if (selectedIndex !== index) {
					selectedIndex = index;
					dispatch('selectedchange', { selectedIndex });
				}
			}}
		>
			<i class="icon" />
			<div class="content" class:active={selectedIndex === index}>{title}</div>
		</div>
	{/each}
</section>

<style lang="postcss">
	.icon {
		@apply absolute;
		width: 5px;
		height: 25px;
		left: 5px;
		top: 9px;
		--drag-handle-color: #dedede;
		background: linear-gradient(
			to right,
			var(--drag-handle-color) 1px,
			white 1px,
			white 2px,
			var(--drag-handle-color) 2px,
			var(--drag-handle-color) 3px,
			white 3px,
			white 4px,
			var(--drag-handle-color) 4px
		);
	}
	.content {
		@apply text-sm bg-white px-4 pt-3 pb-2 border-b-4 border-transparent text-gray-400 cursor-pointer;
	}
	.content.active {
		@apply border-green-600;
	}
</style>
