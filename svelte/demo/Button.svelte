<script lang=ts>
    import { onMount } from 'svelte';

    import { mouse, keyboard } from '@atomic-class/action';

    export let text;
    export let keycode;

    export let state = 'default';

    onMount(() => {
        document.addEventListener('keydown', keyboardHandler);
        document.addEventListener('keyup', keyboardHandler);
    });

    function mouseHandler(event) {
        state = mouse(event, state);
    }
    function keyboardHandler(event) {
        state = keyboard(event, state, keycode);
    }
</script>
<span
    on:mouseenter={mouseHandler}
    on:mouseleave={mouseHandler}
    on:mousedown={mouseHandler}
    on:mouseup={mouseHandler}
    class="px-12 py-5 bw-2 br-5 text-white weight"
    ac-state={state}
    ac-default="bg-black-700"
    ac-hover="bg-blue cursor-pointer"
    ac-active="bg-purple"
    ac-disabled="bg-black-400 text-white-900 cursor-not-allowed">
    {text}
</span>