export default `import { Button } from '@atomic-class/playground/svelte-components';

const root = document.createElement('div');

const button = new Button({
	target: root,
	props: { keycode: 65, text: 'Please Press A', },
});

const buttonDisabled = new Button({
	target: root,
	props: { keycode: 66, text: 'Please Press B', state: 'disabled' },
});

const buttonCustom = new Button({
	target: root,
	props: {
		keycode: 67,
		text: 'Please Press C',
	},
});

export default root;`;
