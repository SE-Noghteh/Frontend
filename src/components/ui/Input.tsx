/**
 * SAMPLE FILE
 *
 * Generic reusable input component.
 */

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return <input {...props} />;
}