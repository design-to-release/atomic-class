export const Button = `
import { Button } from '@atomic-class/svelte/demo';

const button = new Button({
	target: root,
	props: { keycode: 65, text: 'Please Press A', },
});
		
const buttonDisabled = new Button({
    target: root,
	props: { keycode: 66, text: 'Please Press B', state: ['disable'] },
});
		
const buttonCustom = new Button({
	target: root,
	props: {
		keycode: 67,
		text: 'Please Press C',
		props: {
			base: { classes: 'px-12 py-5 bw-2 br-5 text-white weight text-yellow'},
			default: { classes: 'bg-green', overlap: false},
			hover: { classes: 'bg-greenyellow cursor-pointer', overlap: false},
			active: { classes: 'bg-orange', overlap: true},
			disable: { classes: 'bg-black-400 text-white-900  cursor-not-allowed', overlap: true},
		}
	},
});
`;

export const script = {
	Button,
};
