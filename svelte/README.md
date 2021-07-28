# Atomic-Class
A reactive framework for component to control classsheet.

## Usage

Set state with state subject Handler:

```svelte
<script>
import { stateHandler } from 'reactive-class';
</script>
<main>
	<button
    on:click={stateHandler('active')}
    class="w-100 h-100" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello!</button>
</main>
```


Set state with use action:

```svelte
<script>
import { stateHandler } from 'reactive-class';
function hoverUI(node) {
  const h = stateHandler("hover"), d = stateHandler("default"); // return type EventSubject with Subscriber (hover)
  node.addEventListener('mouseenter', h);
  node.addEventListener('mouseleave', d);
	return {destroy() {
        node.removeEventListener('mouseenter', h);
        node.removeEventListener('mouseleave', d);
    }};
}
</script>
<main>
	<button
    use:hoverUI
    class="w-100 h-100" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello!</button>
</main>
```

or

```svelte
<script>
import { makeSubscriber } from 'reactive-class';
import { fromEvent } from 'rxjs/Observable';
import { map } from 'rxjs/operator'
function hoverUI(node) {
  const subscriber = makeSubscriber(node);
  fromEvent(node, 'mouseenter').map(() => 'active').subscribe(subscriber);
  fromEvent(node, 'mouseleave').map(() => 'default').subscribe(subscriber);
}
</script>
<main>
	<button
    use:hoverUI
    class="w-100 h-100" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello!</button>
</main>
```

Set state with binding:

```svelte
<script>
import { onMount } from 'svelte';
import { makeSubscriber } from 'reactive-class';
let $b;
onMount(() => {
    of('active').subscribe(
      makeSubscriber($b) // ElementClassSubscriber
    );
});
</script>
<main>
	<button
    bind:this={$b}
    class="w-100 h-100" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello!</button>
</main>
```

Set state with bind in SSR:

```svelte
<script>
import { makeSubscriber } from 'reactive-class';
// const props_xxx =  props('xxx');
// const state_xxx =  state('xxx');

of('hover').subscribe(makeSubscriber('xxx'));

</script>
<main>
	<button
    entity = 'xxx'
    class="w-100 h-100" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue" >Hello!</button>
</main>
```