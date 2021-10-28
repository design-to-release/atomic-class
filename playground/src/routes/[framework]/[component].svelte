<script lang="ts">
	import type { EditorTextChangeEvent, EditorWindow } from '$lib/Editor/Editor.svelte';

	import { Writable, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import Examples from '$lib/examples';
	import Sidebar from '$lib/Sidebar.svelte';
	import Editor from '$lib/Editor/Editor.svelte';
	import Preview from '$lib/Preview.svelte';
	import Console from '$lib/Console.svelte';

	let framework: string;
	let component: string;
	let code: string;
	let components: string[];
	let editorWindows: Writable<EditorWindow[]> = writable([]);
	const edRefresh = writable(0);

	$: {
		const { framework: f, component: c } = $page.params;
		framework = f;
		component = c;

		code = Examples[framework][component];
		components = Object.keys(Examples[framework]);

		const editorConfig = {
			'svelte': [{
					name: 'Svelte',
					code,
					lang: 'svelte'
				},
			],
			'san': [{
					name: 'JavaScript',
					code,
					lang: 'js'
				},
				{
					name: 'CSS',
					code: '',
					lang: 'css'
				},
			]
		};
		// console.log(editorConfig[framework]);

		editorWindows.set(editorConfig[framework]);

		edRefresh.set(Math.random());
	}

	let error: Error;

	// TODO: Use window change event.
	function editorTextChangeHandler({ detail }: EditorTextChangeEvent) {
		const { lang, source } = detail;
		$editorWindows.filter(ew => ew.lang == lang).forEach(ew => {
			ew.code = source;
		});
		editorWindows.set($editorWindows);
	}
</script>

<Sidebar list={components} actived={component} />
<section class="flex flex-col w-full">
	<Preview
		{editorWindows}
		{framework}
		bind:error />
	<Editor
		className="border-b border-t border-gray-200"
		{editorWindows}
		refresh={edRefresh}
		on:textchange={editorTextChangeHandler}
	/>
	<Console {error} />
</section>
