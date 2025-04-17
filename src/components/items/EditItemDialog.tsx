import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useItems } from "../../api/useItems";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Item } from "@/types";
import {
  ItemValidationSchema,
  UpdateItemInputType,
} from "@/schemas/ItemValidationSchema";
import { Loader2 } from "lucide-react";

interface EditItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
}

export default function EditItemDialog({
  open,
  onOpenChange,
  item,
}: EditItemDialogProps) {
  const { updateItem, isMutating } = useItems();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateItemInputType>({
    resolver: zodResolver(ItemValidationSchema.UPDATE),
    defaultValues: {
      id: item?.id ?? undefined,
      name: "",
      description: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: UpdateItemInputType) => {
    try {
      await updateItem(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-full p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Edit Item
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("id")} />
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Item name"
              className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Harga</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              placeholder="Item price"
              className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Item description"
              className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isMutating}>
            {isMutating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
