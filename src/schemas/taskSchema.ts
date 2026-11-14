/**
 * SAMPLE FILE
 *
 * Task validation rules belong here.
 */

import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup
    .string()
    .required("Task title is required"),

  description: yup.string().default(""),

  status: yup
    .mixed<"todo" | "in-progress" | "done">()
    .oneOf(["todo", "in-progress", "done"])
    .required(),
});