// src/api/items.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, ApiSuccessResponse, Item } from "@/types";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import { UpdateItemInputType } from "@/schemas/ItemValidationSchema";

const API_URL = import.meta.env.VITE_API_URL;

export const useItems = () => {
  const queryClient = useQueryClient();

  // Fetch items
  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useQuery<ApiSuccessResponse<Item[]>>({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const response = await axios.get<ApiResponse<Item[]>>(
          `${API_URL}/data`
        );

        // Check if this is an error response
        if ("error" in response.data) {
          throw new Error(response.data.error.message);
        }

        // This is a success response
        if (!Array.isArray(response.data.data)) {
          throw new Error(
            "Invalid data format: expected array in data property"
          );
        }

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error) {
            const apiError = error.response.data.error;
            throw new Error(apiError.message || "Request failed");
          }
        }
        throw error;
      }
    },
  });

  const items: Item[] = response?.data || [];

  // Create item
  const createMutation = useMutation({
    mutationFn: (newItem: Omit<Item, "id">) =>
      axios.post(`${API_URL}/create`, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item created successfully");
    },
    onError: handleApiError,
  });

  // Update item
  const updateMutation = useMutation({
    mutationFn: (item: UpdateItemInputType) =>
      axios.put(`${API_URL}/${item.id}`, {
        name: item.name,
        price: item.price,
        description: item.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item updated successfully");
    },
    onError: handleApiError,
  });

  // Delete item
  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item deleted successfully");
    },
    onError: handleApiError,
  });

  return {
    items,
    isLoading,
    error,
    isError,
    createItem: createMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};
