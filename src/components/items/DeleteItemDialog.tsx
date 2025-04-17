// src/components/DeleteItemDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useItems } from "../../api/useItems";
import { Button } from "../ui/button";
import { Item } from "@/types";

interface DeleteItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
}

export default function DeleteItemDialog({
  open,
  onOpenChange,
  item,
}: DeleteItemDialogProps) {
  const { deleteItem } = useItems();

  const handleDelete = async () => {
    if (!item) return;
    await deleteItem(item.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus item</DialogTitle>
        </DialogHeader>
        <p className="mb-4">
          Apakah Anda yakin untuk menghapus item "{item?.name}"?
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
