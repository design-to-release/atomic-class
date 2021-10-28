# Atomic-Class
A reactive framework for component to control classsheet.

## Usage

```svelte
<script lang=ts>
    import { onMount } from 'svelte';

    import { mouse, keyboard } from '@atomic-class/action';

    export let text;
    export let keycode;

    export let state = 'default';

    /** keyboard support start*/
    onMount(() => {
        document.addEventListener('keydown', keyboardHandler);
        document.addEventListener('keyup', keyboardHandler);
    });
    function keyboardHandler(event) {
        state = keyboard(event, state, keycode);
    }
    /** keyboard support end*/

    function mouseHandler(event) {
        state = mouse(event, state);
    }
</script>
<span
    on:mouseenter={mouseHandler}
    on:mouseleave={mouseHandler}
    on:mousedown={mouseHandler}
    on:mouseup={mouseHandler}
    ac-state={state}
    ac-class="px-4 py-2 rounded-lg text-white font-bold m-2 text-base"
    ac-default="bg-green-600"
    ac-hover="bg-green-500 cursor-pointer"
    ac-active="bg-yellow-500"
    ac-disabled="bg-gray-500 text-gray-100 cursor-not-allowed"
    >
    <span
        class="material-icons align-bottom"
        ac-id="icon"
        ac-state={state.indexOf('disabled') == -1 ? 'default' : 'block'}
        ac-default="%icon-done"
        ac-block="%icon-block"
    ></span>
    {text}
</span>

<style lang="scss">
    @import './icon.scss';
</style>
```


After Pre Compile:

```svelte
<script lang=ts> /** ... **/ </script>
<span
    class="_D9W0 {state} px-4 py-2 rounded-lg text-white font-bold m-2 text-base" on:mouseenter={mouseHandler}
    on:mouseleave={mouseHandler}
    on:mousedown={mouseHandler}
    on:mouseup={mouseHandler}>
    <span class="icon {state.indexOf('disabled') == -1 ? 'default' : 'block'} material-icons align-bottom" >
    </span>
    {text}
</span>

<style lang="scss">
    @import './icon.scss';
    ._D9W0{@apply px-4 py-2 rounded-lg text-white font-bold m-2 text-base;}
    ._D9W0.default{@apply bg-green-600;}
    ._D9W0.hover{@apply bg-green-500 cursor-pointer;}
    ._D9W0.active{@apply bg-yellow-500;}
    ._D9W0.disabled{@apply bg-gray-500 text-gray-100 cursor-not-allowed;}
    .icon.default{@extend %icon-done;}
    .icon.block{@extend %icon-block;}
</style>
```

You can try this demo in [Atomic Class REPL](https://design-to-release.github.io/atomic-class/).

## Configuration

```
npm install @atomic-class/svelte -D
```

Building with Rollup：

```javascript

import ac from '@atomic-class/svelte';

export default {
	input: 'src/demo/index.ts',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		file: '../demo/svelte/dist.js'
	},
	external: ['@atomic-class/action'],
	plugins: [
        ac({
            // prefix: 'ac'
            // include: []
            // exclude: []
        }),

    ]
}
```

## Features

### Use TailwindCSS

```
<span ac-default="text-red-100 text-center" ></span>
```

### Use Scss/Sass

```
<style>
%icon-done {
    font-size: 1.4rem;
}
%icon-done:after {
    content: "done"
}
<style>
<span ac-default="%var_name" ></span>
```

### Use Less

[Todo]

```
<span ac-default="%var_name %var_name %var_name" ></span>
```
