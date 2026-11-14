/**
 * SAMPLE FILE
 *
 * Registration validation schema.
 */

import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
});