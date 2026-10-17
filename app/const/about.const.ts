import { NeonColor } from "@/app/enum/game.enum";
import { HighlightIcon } from "@/app/enum/about.enum";
import type { ContactTip, Highlight } from "@/app/data/types";

export const ABOUT_MISSION =
  "ARCADE VAULT nació del amor por los videojuegos clásicos. Nuestra misión es preservar y celebrar los arcades que definieron una generación, haciéndolos accesibles para todos, en cualquier lugar y sin costo.";

export const HIGHLIGHTS: Highlight[] = [
  { icon: HighlightIcon.Heart, text: "HECHO CON ❤️ PARA JUGADORES", color: NeonColor.Magenta },
  { icon: HighlightIcon.Browser, text: "JUEGOS EN HTML — CORREN EN CUALQUIER NAVEGADOR", color: NeonColor.Cyan },
  { icon: HighlightIcon.Plant, text: "PROYECTO EN CONSTANTE CRECIMIENTO", color: NeonColor.Green },
];

export const CONTACT_TIPS: ContactTip[] = [
  { text: "RESPUESTA EN 24-48H", color: NeonColor.Green },
  { text: "SUGERENCIAS BIENVENIDAS", color: NeonColor.Yellow },
  { text: "SIN SPAM, JAMÁS", color: NeonColor.Magenta },
];

export const ABOUT_TITLE = "ACERCA DE ARCADE VAULT";
export const DIVIDER_PIXELS = 24;
export const DIVIDER_STEP_MS = 80;
export const HIGHLIGHT_STEP_MS = 80;

export const TIP_LED_CLASS: Record<NeonColor, string> = {
  [NeonColor.Green]: "",
  [NeonColor.Yellow]: "y",
  [NeonColor.Magenta]: "m",
  [NeonColor.Cyan]: "",
};
