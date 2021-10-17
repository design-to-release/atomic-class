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
    class="px-4 py-2 rounded-lg text-white font-bold m-2"
    ac-state={state}
    ac-default="bg-green-600"
    ac-hover="bg-green-500 cursor-pointer"
    ac-active="bg-yellow-500"
    ac-disabled="bg-gray-500 text-gray-100 cursor-not-allowed">
    {text}
</span>
<style></style>