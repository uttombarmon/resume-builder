import z from "zod";
export const emailSignInType = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});
