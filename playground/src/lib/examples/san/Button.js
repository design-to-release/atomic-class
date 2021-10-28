export default `/** https://github.com/design-to-release/atomic-class/blob/main/san/playground/src/Button.san **/
import { defineComponent } from "skypack/san";
import { Button } from "@atomic-class/playground/san-components";

export default defineComponent({
  template: \`
  <div>
    <ac-button text="Please Press A" keycode="65" ></ac-button>
    <ac-button text="Please Press B" keycode="66" state="disabled" ></ac-button>
    <ac-button text="Please Press C" keycode="67" ></ac-button>
  </div>
  \`,
  components: { "ac-button": Button },
  initData() {
    return {};
  },
});`;
