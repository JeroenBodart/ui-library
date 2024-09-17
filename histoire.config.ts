import { defineConfig, defaultColors } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  vite: {
    base: process.env.HISTOIRE_BASE || "/",
  }
});
