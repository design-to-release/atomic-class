<script lang="ts">
	import { base } from '$app/paths';

	import { onMount } from 'svelte';
	import { element } from 'svelte/internal';

	export let framework: string;
	export let js: string;
	export let css = '';
	export let error: Error;

	const codeRunner = {
		san: runSanCode,
		svelte: runSvelteCode
	};

	let selfRootRef: HTMLElement;
	let appEl: HTMLElement;
	let styleEl: HTMLStyleElement;

	$: {
		if (typeof js === 'string') {
			const dataURI = `data:text/javascript;charset=utf-8,${encodeURIComponent(js)}`;
			import(dataURI)
				.then(({ default: App }) => {
					error = undefined;

					selfRootRef.innerHTML = '';
					codeRunner[framework](App);
				})
				.catch((e) => (error = e));
		}
	}

	$: {
		if (styleEl) {
			styleEl.textContent = css;
		}
	}

	onMount(() => {
		const root = selfRootRef.attachShadow({ mode: 'open' });
		const linkEl = element('link');
		linkEl.rel = 'stylesheet';
		linkEl.href = `${base}/packages/playground/svelte-components/mod.css`;
		appEl = element('section');
		styleEl = element('style');
		root.append(linkEl, styleEl, appEl);
	});

	function runSanCode(App: new () => { attach(el: HTMLElement): void }) {
		appEl.replaceChildren();
		const app = new App();
		app.attach(appEl);
	}

	function runSvelteCode(App: HTMLElement) {
		appEl.replaceChildren(App);
	}
</script>

<section id="preview" class="h-80 p-4" bind:this={selfRootRef} />
