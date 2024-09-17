import { defineComponent as s, useCssVars as p, computed as r, openBlock as u, createElementBlock as c, renderSlot as a } from "vue";
import './assets/main.css';const l = { id: "appButton" }, i = /* @__PURE__ */ s({
  __name: "AppButton",
  props: {
    size: { default: 16 },
    color: { default: "skyblue" }
  },
  setup(t) {
    p((e) => ({
      "98e5bef4": e.color,
      "613a0e26": n.value
    }));
    const o = t, n = r(() => `${o.size}px`);
    return (e, d) => (u(), c("button", l, [
      a(e.$slots, "default")
    ]));
  }
});
export {
  i as AppButton
};
