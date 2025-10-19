export type APIResponse<T = unknown> = {
  status: number;
  message: string | null;
  errors: string[] | null;
  data: T;
};

export type APIPaginatedResponse<T = unknown, U = Record<string, unknown>> = {
  status: number;
  message: string | null;
  errors: string[] | null;
  data: {
    items: T[];
  } & U;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  totalItems: number;
};
