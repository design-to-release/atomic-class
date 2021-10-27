export default `import { defineComponent } from "skypack/san";
import { Button } from "@atomic-class/playground/san-components";

export default defineComponent({
  template: \`
  <div>
    <ac-button
      text="{{ buttonA.text }}"
      keycode="{{ buttonA.keycode }}"
    ></ac-button>

    <ac-button
      text="{{ buttonB.text }}"
      keycode="{{ buttonB.keycode }}"
      state="{{ buttonB.state }}"
    ></ac-button>

    <ac-button
      text="{{ buttonC.text }}"
      keycode="{{ buttonC.keycode }}"
    ></ac-button>
  </div>
  \`,

  components: {
    "ac-button": Button,
  },

  initData() {
    return {
      buttonA: {
        text: "Please Press A",
        keycode: 65,
      },
      buttonB: {
        text: "Please Press B",
        keycode: 66,
        state: "disabled",
      },
      buttonC: {
        text: "Please Press C",
        keycode: 67,
      },
    };
  },
});`;
