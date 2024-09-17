(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("#baseButton{padding:1rem 2rem;cursor:pointer;border:none;background-color:var(--23c3b7e8);font-size:var(--303d8e4b)}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
import { defineComponent as n, useCssVars as r, computed as c, openBlock as u, createElementBlock as a, renderSlot as l } from "vue";
const p = { id: "baseButton" }, f = /* @__PURE__ */ n({
  __name: "BaseButton",
  props: {
    size: { default: 16 },
    color: { default: "skyblue" }
  },
  setup(t) {
    r((e) => ({
      "23c3b7e8": e.color,
      "303d8e4b": s.value
    }));
    const o = t, s = c(() => `${o.size}px`);
    return (e, d) => (u(), a("button", p, [
      l(e.$slots, "default")
    ]));
  }
});
export {
  f as BaseButton
};
