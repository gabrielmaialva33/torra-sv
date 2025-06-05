import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * This helps prevent class conflicts and allows for easy overrides
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}