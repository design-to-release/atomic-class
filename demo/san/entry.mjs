const Button = `
import { defineComponent } from "san";
import { Button } from "@atomic-class/san/demo";

const MyApp = defineComponent({
  template: \`
    <div>
      <my-button
        text="{{ button.text }}"
        keycode="{{ button.keycode }}"
      ></my-button>

      <my-button
        text="{{ buttonDisabled.text }}"
        keycode="{{ buttonDisabled.keycode }}"
        states="{{ buttonDisabled.states }}"
      ></my-button>

      <my-button
        text="{{ buttonCustom.text }}"
        keycode="{{ buttonCustom.keycode }}"
        props="{{ buttonCustom.props }}"
      ></my-button>
    </div>
  \`,

  components: {
    "my-button": Button,
  },

  initData() {
    return {
      button: {
        text: "Please Press A",
        keycode: 65,
      },
      buttonDisabled: {
        text: "Please Press B",
        keycode: 66,
        states: ["disable"],
      },
      buttonCustom: {
        keycode: 67,
        text: "Please Press C",
        props: {
          base: { classes: "text-yellow" },
          default: { classes: "bg-green", overlap: false },
          hover: {
            classes: "bg-greenyellow cursor-pointer",
            overlap: false,
          },
          active: { classes: "bg-orange", overlap: true },
          disable: {
            classes: "bg-black-400 text-white-900 cursor-not-allowed",
            overlap: true,
          },
        },
      },
    };
  },
});

const myApp = new MyApp();
myApp.attach(document.querySelector(".root"));
`;

export const script = {
  Button,
};
