import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rajseba-api.onrender.com";

export function formatImageUrl(url?: string): string {
  if (!url) return "";
  return url.replace(/https?:\/\/(api\.rajseba\.com|rajseba-api\.onrender\.com)/g, DEFAULT_API_URL);
}

