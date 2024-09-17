import { defineComponent as s, useCssVars as r, computed as l, openBlock as u, createElementBlock as p, renderSlot as c } from "vue";
import './assets/main.css';const a = { id: "appButton" }, d = /* @__PURE__ */ s({
  __name: "AppButton",
  props: {
    size: { default: 16 },
    color: { default: "skyblue" }
  },
  setup(e) {
    r((t) => ({
      "98e5bef4": t.color,
      "613a0e26": n.value
    }));
    const o = e, n = l(() => `${o.size}px`);
    return (t, i) => (u(), p("button", a, [
      c(t.$slots, "default")
    ]));
  }
});
function m(e) {
  return `Hello ${e}!`;
}
export {
  d as Button,
  m as helloAnything
};
