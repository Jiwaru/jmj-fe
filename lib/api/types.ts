export interface ApiSuccess<T> {
  success: true;
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}
