import { defineComponent as r, useCssVars as p, computed as s, openBlock as l, createElementBlock as u, renderSlot as c } from "vue";
import './assets/main.css';const a = { id: "appButton" }, d = /* @__PURE__ */ r({
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
    const o = t, n = s(() => `${o.size}px`);
    return (e, f) => (l(), u("button", a, [
      c(e.$slots, "default")
    ]));
  }
}), i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as AppButton
};
