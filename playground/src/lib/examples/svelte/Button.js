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
		ac: {
			shape: {
				base: { classes: 'px-12 py-5 bw-2 br-5 text-white weight text-yellow'},
				default: { classes: 'bg-green'},
				hover: { classes: 'bg-greenyellow cursor-pointer'},
				active: { classes: 'bg-orange', overlap: true},
				disabled: { classes: 'bg-black-400 text-white-900  cursor-not-allowed'},
			}
		}
	},
});

export default root;`;
