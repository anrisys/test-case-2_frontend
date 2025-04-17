// src/components/ItemTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Item } from "@/types";

interface ItemTableProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemTable({
  items = [],
  onEdit,
  onDelete,
}: ItemTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead className="text-center font-medium text-gray-700 dark:text-gray-300">
            Nama
          </TableHead>
          <TableHead className="text-center font-medium text-gray-700 dark:text-gray-300">
            Harga
          </TableHead>
          <TableHead className="text-center font-medium text-gray-700 dark:text-gray-300">
            Deskripsi
          </TableHead>
          <TableHead className="text-center font-medium text-gray-700 dark:text-gray-300">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length > 0 ? (
          items.map((item) => (
            <TableRow key={item.id} className="border-b dark:border-gray-700">
              <TableCell className="text-center">{item.name}</TableCell>
              <TableCell className="text-center">
                {item.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">{item.description}</TableCell>
              <TableCell className="text-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => onEdit(item)}
                  className="text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 p-2 rounded-md"
                >
                  <SquarePen className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onDelete(item)}
                  className="text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-400 p-2 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-8 text-gray-500 dark:text-gray-400"
            >
              Currently there are no items
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
