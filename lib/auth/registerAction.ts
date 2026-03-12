"use server";

import { z } from "zod"; // Ensure z is imported
import { registerSchema } from "../utils/registerTypes";
import { signUp } from "./auth-clients";

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerAction(
  prevState: ActionState | null,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      errors: fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    const { name, email, password } = validated.data;
    await signUp.email({ name, email, password });
    return { success: true, errors: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred during sign up.",
    };
  }
}
