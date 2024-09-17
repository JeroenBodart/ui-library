<script setup lang="ts">
import { computed } from "vue";
type AppButtonProps = {
  size?: number;
  color?: string;
};

const props = withDefaults(defineProps<AppButtonProps>(), {
  size: 16,
  color: "skyblue",
});

const fontSize = computed(() => `${props.size}px`);
</script>

<template>
  <button id="appButton">
    <slot />
  </button>
</template>

<style>
#appButton {
  padding: 1rem 2rem;
  cursor: pointer;
  border: none;
  background-color: v-bind(color);
  font-size: v-bind(fontSize);
}
</style>
