import z from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3).max(100),

  email: z.email().trim().toLowerCase(),

  password: z.string().min(8).max(100),
});
