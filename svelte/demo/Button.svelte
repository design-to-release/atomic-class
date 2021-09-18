<script lang=ts>
    import { onMount } from 'svelte';

    import { mouse, keyboard } from '@atomic-class/action';
    import { tailwindcss} from '@atomic-class/process';
    import { Status } from '@atomic-class/core';

    import Icon from './Icon.svelte';

    export let text;
    export let keycode;
    export let state = ['default'];
    export let props;
    
    $: status = new Status(props, state);
    $: classes = tailwindcss(status)

    onMount(() => {
        document.addEventListener('keydown', keyboardHandler);
        document.addEventListener('keyup', keyboardHandler);        
    });

    function mouseHandler(event) {
        status = mouse({status, event});
    }
    function keyboardHandler(event) {
        status = keyboard({status, event, keycode});
    }
    const a = {
			default: { classes: 'bg-white', overlap: false},
			hover: { classes: 'bg-orange', overlap: false}
	};
</script>
<span
    on:mousedown={mouseHandler}
    on:mouseup={mouseHandler}
    on:mouseenter={mouseHandler}
    on:mouseleave={mouseHandler}
    class="px-12 py-5 bw-2 br-5 text-white weight {classes}"
    ac-props={props}
    ac-default="bg-black-700"
    ac-hover="bg-blue cursor-pointer"
    ac-active-ol="bg-purple"
    ac-disable-ol="bg-black-400 text-white-900 cursor-not-allowed">
    <Icon type={ state.includes('disable') ? 1 : 0 } ></Icon> 
    {text}
</span>