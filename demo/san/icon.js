import { defineComponent } from "san";

export default defineComponent({
  template: `<span>{{ icon[type] }}</span>`,
  initData() {
    return {
      icon: "☑☒★☆♂♀☎☏✄☪☣☢☠♨",
      type: 0
    };
  }
});
