import { NeonColor } from "@/app/enum/game.enum";
import { FeatureIcon } from "@/app/enum/home.enum";
import type { Feature, FaqItem, HomeStat, Pricing } from "@/app/data/types";

export const FEATURES: Feature[] = [
  {
    icon: FeatureIcon.Gamepad,
    title: "JUEGOS CLÁSICOS",
    description: "Arkanoid, Tetris, Snake y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    color: NeonColor.Cyan,
  },
  {
    icon: FeatureIcon.Free,
    title: "100% GRATIS",
    description: "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    color: NeonColor.Yellow,
  },
  {
    icon: FeatureIcon.Trophy,
    title: "LADDER BOARDS",
    description: "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    color: NeonColor.Magenta,
  },
  {
    icon: FeatureIcon.Rocket,
    title: "SIEMPRE CRECIENDO",
    description: "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    color: NeonColor.Green,
  },
];

export const HOME_STATS: HomeStat[] = [
  { value: "12+", unit: "JUEGOS", sub: "Y CONTANDO" },
  { value: "MILES", unit: "DE PARTIDAS", sub: "JUGADAS CADA DÍA" },
  { value: "GLOBAL", unit: "RANKING", sub: "COMPITE CON EL MUNDO" },
];

export const PRICING: Pricing = {
  label: "PLAN ÚNICO",
  name: "JUGADOR VAULT",
  amount: "$0",
  unit: "/ SIEMPRE",
  tag: "SIN TRUCOS · SIN LETRA PEQUEÑA",
  perks: [
    "Acceso a todos los juegos",
    "Ranking global y salón de la fama",
    "Sin anuncios entre partidas",
    "Guarda tus puntuaciones",
    "Nuevos juegos cada mes",
    "Funciona en cualquier navegador",
  ],
  foot: "No pedimos tarjeta. Nunca lo haremos.",
};

export const FAQ: FaqItem[] = [
  {
    question: "¿REALMENTE ES GRATIS?",
    answer: 'Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión "premium" escondida.',
  },
  {
    question: "¿NECESITO CREAR CUENTA?",
    answer: "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
  },
  {
    question: "¿CÓMO SOBREVIVEN SIN COBRAR?",
    answer: "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
  },
];
