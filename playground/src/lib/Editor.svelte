<script context="module" lang="ts">
	interface TextChangeEventDetail {
		state: EditorState;
	}

	export type EditorTextChangeEvent = CustomEvent<TextChangeEventDetail>;
</script>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { basicSetup, EditorView } from '@codemirror/basic-setup';
	import { EditorState } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { keymap } from '@codemirror/view';
	import { emacsStyleKeymap } from '@codemirror/commands';

	export let className: string;
	export let docStr: string;
	export let edView: EditorView;

	onMount(() => {
		createCodeMirror('');
	});

	const dispatch = createEventDispatcher<{
		textchange: TextChangeEventDetail;
	}>();

	let edNodeRef: HTMLElement;
	let edState: EditorState;

	const { tabSize, create } = EditorState;
	const { updateListener } = EditorView;

	function createCodeMirror(doc: string) {
		const extensions = [
			basicSetup,
			javascript(),
			tabSize.of(4),
			keymap.of(emacsStyleKeymap),
			updateListener.of((update) => {
				if (update.docChanged) {
					docStr = update.state.doc.toString();
					dispatch('textchange', {
						state: update.state
					});
				}
			})
		];

		edState = create({ doc, extensions });
		edView = new EditorView({
			state: edState,
			parent: edNodeRef
		});
	}
</script>

<section class="flex-grow overflow-auto {className}" bind:this={edNodeRef} />

<style>
	:global(.cm-editor) {
		height: 100%;
	}
</style>
