import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number("user_id harus angka"),
  name: z.string().min(3, "name minimal 3 karakter"),
  description: z.string().min(3, "description minimal 3 karakter"),
  price: z.number("price harus angka").min(0, "price minimal 0"),
  stock: z.number("stock harus angka").min(0, "stock minimal 0"),
});

export const updateProductSchema = z.object({
  user_id: z.number("user_id harus angka").optional(),
  name: z.string().min(3, "name minimal 3 karakter").optional(),
  description: z.string().min(3, "description minimal 3 karakter").optional(),
  price: z.number("price harus angka").min(0, "price minimal 0").optional(),
  stock: z.number("stock harus angka").min(0, "stock minimal 0").optional(),
});
