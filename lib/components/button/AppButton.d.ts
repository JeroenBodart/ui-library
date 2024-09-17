/**
 *
 * Button is an extension to standard button element with icons and theming.
 *
 * @module app-button
 *
 */
import type {ButtonHTMLAttributes, DefineComponent, EmitFn, VNode} from "vue";
import {GlobalComponentConstructor} from "../../component";

/**
 * Defines valid properties in Button component.
 */
export interface ButtonProps extends ButtonHTMLAttributes {
  /**
   * Inline style of the button.
   */
  style?: any;
  /**
   * Style class of the button.
   */
  class?: any;
  /**
   * Text of the button.
   */
  label?: string | undefined;
}

/**
 * Defines current options in Button component.
 */
export interface ButtonContext {
  /**
   * Current disabled state of the element as a boolean.
   * @defaultValue false
   */
  disabled: boolean;
}

/**
 * Defines valid slots in Button component.
 */
export interface ButtonSlots {
  /**
   * Custom content such as icons, images and text can be placed inside the button via the default slot.
   * Note that when slot is used, label, icon and badge properties are not included.
   */
  default(): VNode[];
}

/**
 * Defines valid emits in Button component.
 */
export interface ButtonEmitsOptions {}

export declare type ButtonEmits = EmitFn<ButtonEmitsOptions>;


declare const Button: DefineComponent<ButtonProps, ButtonSlots, ButtonEmits>;

export default Button;
