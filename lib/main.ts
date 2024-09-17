export function helloAnything(thing: string): string {
  return `Hello ${thing}!`;
}

export * from "./components/button/AppButton.vue";
export { default as Button } from "./components/button/AppButton.vue";
