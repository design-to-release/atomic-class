<script lang="ts">
	import Header from '$lib/Header/Header.svelte';
	import '../app.postcss';
</script>

<Header />

<main class="h-full flex overflow-auto">
	<slot />
</main>
