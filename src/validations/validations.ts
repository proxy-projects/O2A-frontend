import { z } from "zod";
import { FormInput } from "../types/types";

export const createValidationSchema = (inputs: FormInput[]) => {
  const schemaObject: { [key: string]: z.ZodType<any> } = {};

  inputs.forEach((input) => {
    let fieldSchema: z.ZodType<any>;

    if (input.required) {
      fieldSchema = z.string().trim().min(1, `${input.label} is required`);
    } else {
      fieldSchema = z.string().trim().optional();
    }

    if (input.type === "email") {
      if (input.required) {
        fieldSchema = z.string().trim().min(1, `${input.label} is required`).email("Invalid email address");
      } else {
        fieldSchema = z.string().trim().email("Invalid email address").optional();
      }
    }

    if (input.type === "tel") {
      const phoneRegex = /^\d{10}$/;
      if (input.required) {
        fieldSchema = z.string()
          .trim()
          .min(1, `${input.label} is required`)
          .regex(phoneRegex, "Please enter a valid 10-digit phone number");
      } else {
        fieldSchema = z.string()
          .trim()
          .regex(phoneRegex, "Please enter a valid 10-digit phone number")
          .optional();
      }
    }

    if (input.minLength) {
      if (input.required) {
        fieldSchema = z.string()
          .trim()
          .min(1, `${input.label} is required`)
          .min(input.minLength, `Minimum length is ${input.minLength} characters`);
      } else {
        fieldSchema = z.string()
          .trim()
          .min(input.minLength, `Minimum length is ${input.minLength} characters`)
          .optional();
      }
    }

    schemaObject[input.id] = fieldSchema;
  });

  return z.object(schemaObject);
};
