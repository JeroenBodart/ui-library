import { defineComponent as c, openBlock as r, createElementBlock as _, toDisplayString as a } from "vue";
const p = { class: "btn-cta" }, u = /* @__PURE__ */ c({
  __name: "TestButton",
  props: {
    text: {}
  },
  setup(t) {
    return (o, e) => (r(), _("button", p, a(o.text), 1));
  }
}), i = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, m = /* @__PURE__ */ i(u, [["__scopeId", "data-v-48dbaa24"]]);
export {
  m as TestButton
};
