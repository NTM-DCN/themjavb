import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a string to the specified length and adds an ellipsis
 */
export function truncateString(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

/**
 * Formats a number as a compact representation (e.g., 1.2k, 3.4M)
 */
export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" })
  return formatter.format(number)
}

/**
 * Formats a date in a human-readable format
 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}