export type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type ApiSuccessResponse<T> = {
  status: "success";
  code: string;
  message: string;
  statusCode: number;
  data: T;
};

export type ApiErrorResponse = {
  error: {
    type: string;
    message: string;
    code: string;
    statusCode: number;
    details?: Record<string, unknown> | unknown[];
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
