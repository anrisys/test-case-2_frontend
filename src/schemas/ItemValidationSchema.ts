import { z } from "zod";

const id = z.number();
const name = z
  .string()
  .min(1, "Nama wajib diisi")
  .max(100, "Nama maksimal 100 karakter");
const description = z
  .string()
  .min(1, "Deskripsi wajib diisi")
  .max(500, "Deskripsi maksimal 500 karakter");
const price = z.number().min(0.01, "Harga harus lebih besar dari 0");

export class ItemValidationSchema {
  static readonly CREATE = z.object({
    name,
    description,
    price,
  });

  static readonly UPDATE = z.object({
    id,
    name,
    description,
    price,
  });
}

export type CreateItemInputType = z.infer<typeof ItemValidationSchema.CREATE>;
export type UpdateItemInputType = z.infer<typeof ItemValidationSchema.UPDATE>;
