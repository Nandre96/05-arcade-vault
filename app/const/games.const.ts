import { Category } from "@/app/enum/game.enum";

export const ALL_CATEGORIES = "TODOS";

export const CATS: readonly (typeof ALL_CATEGORIES | Category)[] = [
  ALL_CATEGORIES,
  Category.Arcade,
  Category.Puzzle,
  Category.Shooter,
  Category.Versus,
];
