/**
 * SAMPLE FILE
 *
 * Project validation rules belong here.
 */

import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup
    .string()
    .required("Project name is required"),

  description: yup
    .string()
    .required("Project description is required"),
});