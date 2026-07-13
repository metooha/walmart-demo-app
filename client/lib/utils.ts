import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a root-relative public asset path (e.g. "/assets/foo.svg") with
 * Vite's configured base URL, so static assets resolve correctly both in
 * dev (base "/") and when deployed under a subpath (e.g. GitHub Pages'
 * "/walmart-demo-app/").
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}
