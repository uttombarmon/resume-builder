"use server";

import { z } from "zod";
import { signIn } from "./auth-clients";
import { emailSignInType } from "../utils/signInTypes";

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function signInAction(
  prevState: ActionState | null,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  console.log("raw: ", rawData);
  const validated = emailSignInType.safeParse(rawData);
  console.log(validated);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      errors: fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    const { email, password, rememberMe } = validated.data;
    const { data, error } = await signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: "/dashboard",
    });
    if (error) {
      console.error("Better Auth Error:", error);
      return {
        success: false,
        message: error.message || "Authentication failed.",
        code: error.code,
      };
    }

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
