export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastOptions = {
  messages: string;
  variant?: ToastVariant;
  duration?: number;
};

export const DEFAULT_DURATION = 3000;
