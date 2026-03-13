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
    // console.log(name, email, password);
    const { data, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    });
    if (error) {
      console.error("Better Auth Error:", error);
      return {
        success: false,
        message: error.message || "Authentication failed.",
        code: error.code, // Useful for specific UI logic (e.g., 'USER_ALREADY_EXISTS')
      };
    }

    return { success: true, errors: {} };
    return { success: true, errors: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Unexpected System Error:", error);
    return {
      success: false,
      message: "A server error occurred. Please try again later.",
    };
  }
}
