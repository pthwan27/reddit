export type ValidationRule = {
  condition: boolean;
  message: string;
};

export interface CustomError extends Error {
  response?: {
    data?: { error?: string };
    status?: number;
  };
}
