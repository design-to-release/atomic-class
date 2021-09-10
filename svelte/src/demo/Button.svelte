<script lang=ts>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import { mouse, keyboard } from '@atomic-class/action';
    import { tailwindcss} from '@atomic-class/process';
    import { Status } from '@atomic-class/core';

    import Icon from './Icon.svelte';

    export let text;
    export let keycode;
    export let state = ['default'];
    export let props = {
        default: { classes: 'bg-black-700', overlap: false},
        hover: { classes: 'bg-blue cursor-pointer', overlap: false},
        active: { classes: 'bg-purple', overlap: true},
        disable: { classes: 'bg-black-400 text-white-900  cursor-not-allowed', overlap: true},
    };
    
    $: status = new Status(props, state);
    $: classes = tailwindcss(status)

    onMount(() => {
        document.addEventListener('keydown', keyboardHandler);
        document.addEventListener('keyup', keyboardHandler);        
    });

    function mouseHandler(event) {
        status = mouse({status, event});
    }
    function mouseAction(node) {
        node.addEventListener('mouseenter', mouseHandler);
        node.addEventListener('mouseleave', mouseHandler);
    }
    function keyboardHandler(event) {
        status = keyboard({status, event, keycode});
    }
    let iconType = writable(status);
</script>
<span
    use:mouseAction
    ac-props={props} on:mousedown={mouseHandler} on:mouseup={mouseHandler}
    class="px-12 py-5 bw-2 br-5 text-white weight {classes}"
    ac-default="bg-black-700" ac-hover="bg-blue cursor-pointer" ac-active-ol="bg-purple" ac-disable-ol="bg-black-400 text-white-900 cursor-not-allowed">
    <Icon type={ state.includes('disable') ? 1 : 0 } ></Icon> 
    {text}</span>
