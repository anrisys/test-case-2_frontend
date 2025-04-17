// src/App.tsx
import { useState } from "react";
import ItemTable from "./components/items/ItemTable";
import CreateItemDialog from "./components/items/CreateItemDialog";
import EditItemDialog from "./components/items/EditItemDialog";
import DeleteItemDialog from "./components/items/DeleteItemDialog";
import { useItems } from "./api/useItems";
import { Item } from "./types";
import { Button } from "./components/ui/button";

function App() {
  const { items, isLoading, isError, error } = useItems();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [dialogType, setDialogType] = useState<
    "create" | "edit" | "delete" | null
  >(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading items: {error?.message}</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">List item</h1>
        <Button variant="default" onClick={() => setDialogType("create")}>
          Tambah item
        </Button>
      </div>

      <ItemTable
        items={items || []}
        onEdit={(item) => {
          setSelectedItem(item);
          setDialogType("edit");
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDialogType("delete");
        }}
      />

      <CreateItemDialog
        open={dialogType === "create"}
        onOpenChange={(open) => setDialogType(open ? "create" : null)}
      />

      <EditItemDialog
        open={dialogType === "edit"}
        onOpenChange={(open) => setDialogType(open ? "edit" : null)}
        item={selectedItem}
      />

      <DeleteItemDialog
        open={dialogType === "delete"}
        onOpenChange={(open) => setDialogType(open ? "delete" : null)}
        item={selectedItem}
      />
    </div>
  );
}

export default App;
