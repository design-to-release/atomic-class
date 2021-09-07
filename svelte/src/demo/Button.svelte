<script lang=ts>
    import Icon from './Icon.svelte';
    import { writable, derived } from 'svelte/store';
    import { createStatus } from '../lib'; // '@atomic-class/san'
    import { createMouseUI, createKeyboardUI} from '../packages/ui/index';
    import { css, tailwindcss} from '../packages/derive/index';
    import { onMount, onDestroy } from 'svelte';
    export let name;
    let status = createStatus('default');
    let classes = derived(status, tailwindcss);


    let node;
    let mouseUI;
    let keyboardUI;

    onMount(() => {
        mouseUI = createMouseUI(node, status);
        keyboardUI = createKeyboardUI(document, status, {keycode: 65});
    });

    onDestroy(() => {
        mouseUI.destroy();
        keyboardUI.destroy();
    })


    status.setProps({
        default: { classes: 'bg-gray', overlap: false},
        hover: { classes: 'bg-red', overlap: false},
        active: { classes: 'bg-blue', overlap: true},
    });
    
</script>
<main>
	<span
    bind:this={node}
    class="bw-2 br-5 {$classes}" ac-bind="{$status}" rc-default="bg-gray" rc-hover="bg-red" rc-active-ol="bg-blue" >Please Press {name} !</span>
</main>
<!-- <Icon ></Icon> -->