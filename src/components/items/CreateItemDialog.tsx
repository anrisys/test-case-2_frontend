// src/components/CreateItemDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { useItems } from "../../api/useItems";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import {
  CreateItemInputType,
  ItemValidationSchema,
} from "@/schemas/ItemValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateItemDialog({
  open,
  onOpenChange,
}: CreateItemDialogProps) {
  const { createItem, isMutating } = useItems();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateItemInputType>({
    resolver: zodResolver(ItemValidationSchema.CREATE),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const onSubmit = async (data: CreateItemInputType) => {
    await createItem(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat item baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nama</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label>Harga</Label>
            <Input
              type="number"
              step="0.01"
              defaultValue={0}
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Input {...register("description")} />
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
                Menambahkan...
              </>
            ) : (
              "Tambah"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
