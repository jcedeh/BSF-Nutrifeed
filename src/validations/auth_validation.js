import { z } from "zod";

// SIGNUP

export const signup_schema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters"),

  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  confirm_password: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"] // attaches error to this field
  
});

// LOGIN
export const login_schema = z.object({
  email: z.string().email(),

  password: z.string().min(6)
});