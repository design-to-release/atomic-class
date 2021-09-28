<script lang="ts">
	export let framework: string;
	export let code: string;
	export let error: Error;

	const codeRunner = {
		san: runSanCode,
		svelte: runSvelteCode
	};

	$: {
		if (typeof code === 'string') {
			const dataURI = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
			import(dataURI)
				.then(({ default: App }) => {
					error = undefined;

					selfRootRef.innerHTML = '';
					codeRunner[framework](App);
				})
				.catch((e) => (error = e));
		}
	}

	let selfRootRef: HTMLElement;

	function runSanCode(App: new () => { attach(el: HTMLElement): void }) {
		const app = new App();
		app.attach(selfRootRef);
	}

	function runSvelteCode(App: HTMLElement) {
		selfRootRef.append(App);
	}
</script>

<section id="preview" class="h-80 p-4" bind:this={selfRootRef} />
