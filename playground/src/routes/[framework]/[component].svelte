<script context="module" lang="ts">
	export async function load({ page: { params, host }, fetch }: LoadInput): Promise<LoadOutput> {
		const { framework, component } = params;
		const resp = await fetch(`${host ? base : ''}/${framework}/${component}.json`);
		const { code, components } = await resp.json();

		return {
			props: {
				framework,
				exampleCode: code,
				currComponent: component,
				components
			}
		};
	}
</script>

<script lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import type { EditorView } from '@codemirror/basic-setup';

	import { base } from '$app/paths';
	import Sidebar from '$lib/Sidebar.svelte';
	import Editor from '$lib/Editor.svelte';
	import Preview from '$lib/Preview.svelte';
	import Console from '$lib/Console.svelte';

	export let framework: string;
	export let exampleCode: string;
	export let currComponent: string;
	export let components: string[];

	let code = exampleCode;
	let edView: EditorView;
	let error: Error;

	$: {
		if (edView) {
			edView.dispatch({ changes: { from: 0, to: edView.state.doc.length, insert: exampleCode } });
		}
	}
</script>

<Sidebar list={components} actived={currComponent} />
<section class="flex flex-col w-full">
	<Preview {code} {framework} bind:error />
	<Editor className="border-b border-t border-gray-200" bind:edView bind:docStr={code} />
	<Console {error} />
</section>

<link rel="stylesheet" href="{base}/packages/playground/svelte-components/mod.css">