<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import launchIcon from './launch.svg';

	const frameworks = ['angular', 'react', 'svelte', 'san', 'vue'];
	const supportedFrameworks = new Set([...['svelte', 'san']]);
	function isSupported(framework: string): boolean {
		return supportedFrameworks.has(framework.toLowerCase());
	}

	$: currFwk = $page.params.framework;
</script>

<header>
	<div class="text-lg font-bold text-gray-500">Atomic Class REPL</div>
	<nav class="text-sm">
		{#each frameworks as fwk}
			<a
				class="link"
				class:active={currFwk === fwk}
				class:disabled={!isSupported(fwk)}
				href="{base}/{fwk}">{fwk}</a
			>
		{/each}
		<a
			class="text-green-600 inline-flex ml-7"
			href="https://github.com/design-to-release/atomic-class"
			target="_blank"
		>
			<span>GitHub</span>
			<img class="inline ml-1" src={launchIcon} alt="GitHub" />
		</a>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply flex justify-between items-center bg-white border-b border-gray-100 px-5 py-3;
	}

	.link {
		@apply inline-block capitalize ml-2 text-green-600 border-b-2 border-transparent hover:border-green-600;
	}

	.link.active {
		@apply border-green-600;
	}

	.link.disabled {
		@apply text-opacity-40 cursor-not-allowed pointer-events-none;
	}
</style>
