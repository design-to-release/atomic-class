<script lang="ts">
	import { compile } from 'svelte/compiler';
	import { base } from '$app/paths';

	import { onMount } from 'svelte';
	import { element } from 'svelte/internal';
	import type { Readable } from 'svelte/store';
	import type { EditorWindow } from './Editor/Editor.svelte';

	export let framework: string;
	export let error: Error;
	export let editorWindows: Readable<EditorWindow[]>;

	$: js = $editorWindows.filter(ew => ew.lang == 'js')[0]?.code;
	$: css = $editorWindows.filter(ew => ew.lang == 'css')[0]?.code;
	$: svelte = $editorWindows.filter(ew => ew.lang == 'svelte')[0]?.code;

	const codeRunner = {
		san: runSanCode,
		svelte: runSvelteCode
	};

	let selfRootRef: HTMLElement;
	let appEl: HTMLElement;
	let styleEl: HTMLStyleElement;
	let linkEl: HTMLLinkElement;

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
		if (typeof svelte === 'string') {
			// console.log(svelte);
			let rs;
			try {
				rs = compile(
					svelte,
					Object.assign({}, {
							// dev: false, css: false
						}, {
						filename: 'app.svelte',
					}),
				);
			} catch (e) {
				error = e;
			}
			if (rs) {
				const dataURI = `data:text/javascript;charset=utf-8,${encodeURIComponent(rs.js.code)}`;
				import(dataURI)
					.then(({ default: App }) => {
						error = undefined;

						selfRootRef.innerHTML = '';
						codeRunner[framework](App);
					})
					.catch((e) => (error = e));
			}
		}
	}

	$: {
		if (styleEl) {
			styleEl.textContent = css;
		}
	}

	onMount(() => {
		const root = selfRootRef.attachShadow({ mode: 'open' });
		linkEl = element('link');
		linkEl.rel = 'stylesheet';
		appEl = element('section');
		styleEl = element('style');
		root.append(linkEl, styleEl, appEl);
	});

	function runSanCode(App: new () => { attach(el: HTMLElement): void }) {
		linkEl.href = `${base}/packages/playground/san-components/mod.css`;
		appEl.replaceChildren();
		const app = new App();
		app.attach(appEl);
	}

	// function runSvelteCode(App: HTMLElement) {
	// 	appEl.replaceChildren(App);
	// }
	function runSvelteCode(App) {
		linkEl.href = `${base}/packages/playground/svelte-components/mod.css`;
		const root = document.createElement('div');
		appEl.replaceChildren(root);
		const button = new App({
			target: root,
		});

	}
</script>

<section id="preview" class="h-80 p-4" bind:this={selfRootRef} />
