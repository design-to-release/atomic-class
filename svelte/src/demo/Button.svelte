<script>
    import Icon from './Icon.svelte';
    import { stateHandler } from '../lib/index';
    export let name;
    
    function ui(node) {
        const h = stateHandler("hover"), d = stateHandler("default");
        node.addEventListener('mouseenter', h);
        node.addEventListener('mouseleave', d);
		return {
			destroy() {
                node.removeEventListener('mouseenter', h);
                node.removeEventListener('mouseleave', d);
            }
		};
	}
</script>
<main>
	<button
    use:ui
    on:click={stateHandler("active")}
    class="ss" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello! {name}</button>
</main>
<Icon entityId="icon-blue"></Icon>
<Icon ></Icon>