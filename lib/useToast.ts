"use client";

import { useState } from "react";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastState {
  title?: string;
  message: string;
  action?: ToastAction;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (options: ToastState) => setToast(options);
  const hideToast = () => setToast(null);

  return { toast, showToast, hideToast };
}