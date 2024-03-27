import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters required" }),
    name: z.string().min(1, { message: "Name is required" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

const forgetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const newPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters required" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export { LoginSchema, RegisterSchema, forgetPasswordSchema, newPasswordSchema };
