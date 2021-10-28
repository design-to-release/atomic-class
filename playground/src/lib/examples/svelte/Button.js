export default `<script>
  /** https://github.com/design-to-release/atomic-class/blob/main/svelte/demo/Button.svelte **/
  import { Button } from '@atomic-class/playground/svelte-components';
  import { onMount } from 'svelte';
  onMount(() => { /** startup **/ });
</script>

<Button keycode=65 text="Please Press A"></Button>
<Button keycode=66 text="Please Press B" state="disabled"></Button>
<Button keycode=67 text="Please Press C"></Button>

<style>
</style>
`;