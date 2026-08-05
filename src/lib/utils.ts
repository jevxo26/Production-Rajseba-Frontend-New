import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatImageUrl(url?: string): string {
  if (!url) return "";
  return url.replace(/https?:\/\/api\.rajseba\.com/g, "https://rajseba-api.onrender.com");
}

