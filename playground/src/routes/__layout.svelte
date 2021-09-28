<script lang="ts">
	import { base } from '$app/paths';

	import Header from '$lib/header/Header.svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<base href="{base}/" />
</svelte:head>

<Header />

<main class="h-full flex overflow-auto">
	<slot />
</main>
