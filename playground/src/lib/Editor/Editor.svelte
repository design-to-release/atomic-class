<script context="module" lang="ts">
	type SupportedLang = 'js' | 'css' | 'html' | 'svelte';
	interface TextChangeEventDetail {
		lang: SupportedLang;
		state: EditorState;
		source: string;
	}

	export type EditorTextChangeEvent = CustomEvent<TextChangeEventDetail>;
	export interface EditorWindow {
		name: string;
		code: string;
		lang: SupportedLang;
	}
</script>

<script lang="ts">
	import type { Readable } from 'svelte/store';

	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { basicSetup, EditorView, EditorState } from '@codemirror/basic-setup';
	import { javascript } from '@codemirror/lang-javascript';
	import { css } from '@codemirror/lang-css';
	import { html } from '@codemirror/lang-html';
	import { keymap } from '@codemirror/view';
	import { emacsStyleKeymap } from '@codemirror/commands';

	import TabList from './TabList.svelte';
	import { edStateByKey, edActiveWindowByKey, edViewByState, edSourceCodeByKey } from './store.js';
	import { genKeyByTabIndex } from './util.js';

	export let className: string;
	export let editorWindows: Readable<EditorWindow[]>;
	export let refresh: Readable<number>;

	let edNodeRef: HTMLElement;

	const dispatch = createEventDispatcher<{
		textchange: TextChangeEventDetail;
	}>();

	onMount(() => {
		refresh.subscribe(() => {
			const path = $page.path;

			const selectedTab = edActiveWindowByKey.get(path) ?? 0;
			changeActiveWindow(selectedTab);
			const key = genKey();
			const state = edStateByKey.get(key);
			if (!edSourceCodeByKey.has(key)) {
				edSourceCodeByKey.set(key, state.doc.toString());
			}
			const source = edSourceCodeByKey.get(key);
			dispatch('textchange', {
				lang: $editorWindows[selectedTab].lang,
				state,
				source
			});
		});
	});

	function changeActiveWindow(selectedTab: number) {
		const path = $page.path;
		edActiveWindowByKey.set(path, selectedTab);
		const key = genKey();
		if (!edStateByKey.has(key)) {
			const defaultCode = $editorWindows[selectedTab].code;
			edStateByKey.set(
				key,
				createCodeMirror(defaultCode, { lang: $editorWindows[selectedTab].lang })
			);
		}
		const edState = edStateByKey.get(key);

		if (!edViewByState.has(edState)) {
			edViewByState.set(edState, new EditorView({ state: edState }));
		}
		const edView = edViewByState.get(edState);
		edNodeRef.replaceChildren(edView.dom);
	}

	function genKey() {
		const path = $page.path;
		return genKeyByTabIndex(path, edActiveWindowByKey.get(path) ?? 0);
	}

	function createCodeMirror(doc: string, cfg: { lang: SupportedLang }): EditorState {
		const key = genKey();
		const { tabSize, create } = EditorState;
		const { updateListener } = EditorView;

		let langExt = javascript();
		if (cfg.lang === 'css') {
			langExt = css();
		}
		if (cfg.lang === 'html' || cfg.lang === 'svelte') {
			langExt = html();
		}

		const extensions = [
			basicSetup,
			langExt,
			tabSize.of(2),
			keymap.of(emacsStyleKeymap),
			updateListener.of((update) => {
				if (update.docChanged) {
					const state = update.state;
					const source = state.doc.toString();
					edSourceCodeByKey.set(key, source);
					dispatch('textchange', {
						lang: cfg.lang,
						state,
						source
					});
				}
			})
		];

		return create({ doc, extensions });
	}
</script>

<section class="flex flex-col flex-grow {className}">
	<TabList
		list={$editorWindows.map((i) => i.name)}
		on:selectedchange={(ev) => changeActiveWindow(ev.detail.selectedIndex)}
		selectedIndex={edActiveWindowByKey.get($page.path)}
	/>
	<section class="flex-grow overflow-auto" bind:this={edNodeRef} />
</section>

<style>
	:global(.cm-editor) {
		height: 100%;
	}
</style>
