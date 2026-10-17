import type { Category } from "@/app/data/types";

export const ALL_CATEGORIES = "TODOS";

export const CATS: readonly (typeof ALL_CATEGORIES | Category)[] = [
  ALL_CATEGORIES,
  "ARCADE",
  "PUZZLE",
  "SHOOTER",
  "VERSUS",
];
