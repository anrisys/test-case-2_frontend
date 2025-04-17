import axios from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data?.error;
    if (apiError) {
      toast.error(apiError.message, {
        description: apiError.details
          ? JSON.stringify(apiError.details)
          : apiError.code,
      });
      return;
    }
  }

  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};
