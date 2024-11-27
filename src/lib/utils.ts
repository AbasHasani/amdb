import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const originalImgUrl = "https://image.tmdb.org/t/p/original";

export const calculateAge = (dateString: string) => {
  const birthDate = new Date(dateString);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} years, ${months} months, and ${days} days old`;
};

export const truncateAfterSpace = (str: string, limit = 100) => {
  if (str.length <= limit) return str;

  // Find the last space within the limit
  const truncatedIndex = str.lastIndexOf(" ", limit);

  // If a space is found within the limit, truncate at that point; otherwise, use the full limit
  const cutOffIndex = truncatedIndex > -1 ? truncatedIndex : limit;

  return str.slice(0, cutOffIndex) + "...";
};
