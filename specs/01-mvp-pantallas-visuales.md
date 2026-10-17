# SPEC 01 — MVP visual de Arcade Vault (5 pantallas)

> **Status:** Implementado
> **Depends on:** —
> **Date:** 2026-10-10
> **Objective:** Portar a Next.js (App Router, Tailwind v4) las 5 pantallas de `references/templates/` con datos ficticios en `app/data/` y sesión fake por cookie, sin implementar ningún juego.

## Por qué existe esta spec

Los templates en `references/templates/` son prototipos React+Babel con hash-routing, estado en `localStorage` y CSS global. Hay que llevarlos al stack real del proyecto (Next 16 App Router, TypeScript, Tailwind v4) dejando la capa de datos preparada para reemplazar mocks por una base de datos sin tocar la UI.

## Scope

**In:**

- 5 pantallas con rutas reales:
  - `/` Biblioteca (hero, búsqueda, chips de categoría, grid de cards con tilt).
  - `/games/[id]` Detalle (portada, tags, stats, leaderboard top 10).
  - `/games/[id]/play` Reproductor simulado (HUD, CRT, pausa, fin, modal guardar score).
  - `/auth` Login / Crear cuenta / Jugar como invitado.
  - `/hall-of-fame` Salón de la Fama (tabs por juego, podio, tabla, "tu mejor marca").
- Layout global: `Nav` (desktop + panel móvil con hamburguesa, contador de créditos, botón sesión) y footer.
- Capa de datos ficticia en `app/data/` con funciones async tipadas (`getGames`, `getGame`, `getScores`, `saveScore`), pensada para sustituirse por DB.
- Sesión fake: cookie `httpOnly` `av_session` gestionada con Server Actions.
- Scores guardados desde el reproductor en memoria del servidor.
- Port de `styles.css` a tokens `@theme inline` + `app/globals.css` + clases Tailwind. Mismo look (neón, CRT, scanlines, animaciones).
- Responsive (desktop + móvil) como en `Arcade Vault.html`.
- Textos en español, idénticos a los templates.

**Out of scope (para futuras specs):**

- Cualquier juego jugable real (el reproductor solo simula score aleatorio).
- Backend / base de datos real, Route Handlers `/api/*`.
- Validación de formularios de auth, OAuth real (Google/GitHub son decorativos).
- Persistencia de scores entre reinicios del servidor.
- Tests automatizados (Vitest/Playwright).
- i18n, SEO avanzado, analytics.

## Data model

Archivos en `app/data/`. Tipos y datos mock; hoy salen de arrays, mañana de DB.

```ts
// app/data/types.ts
export type Category = "ARCADE" | "PUZZLE" | "SHOOTER" | "VERSUS";
export type NeonColor = "cyan" | "magenta" | "green" | "yellow";

export interface Game {
  id: string;          // "bloque-buster"
  title: string;       // "BLOQUE BUSTER"
  short: string;
  long: string;
  cat: Category;
  cover: string;       // "cover-bricks" → clase CSS de portada
  color: NeonColor;
  best: number;
  plays: string;       // "12.4K"
}

export interface ScoreRow {
  rank: number;
  name: string;
  score: number;
  date: string;        // "dd/mm/yyyy"
}

export interface SavedScore {
  game: string;        // Game.id
  name: string;
  score: number;
  at: number;          // Date.now()
}

export interface Session {
  name: string;        // máx 10 chars, mayúsculas; vacío → "PLAYER1"
}
```

Utilizar enum o const cuando convenga, pero los tipos de arriba son la fuente de verdad para la UI.
Crear sus propias carpeta para esos datos estaticos, por ejemplo `app/enum/game.enum.ts` y `app/const/scores.const.ts`. No leer arrays directos desde las pantallas.

Archivos:

- `app/data/types.ts` — tipos de arriba.
- `app/data/games.ts` — los 8 juegos de `data.jsx` + `CATS = ["TODOS", ...]`.
- `app/data/scores.ts` — `seededScores(seed, count)` portado, `getScores(gameId, count)`, `saveScore(entry)` (array en memoria del módulo).
- `app/data/session.ts` — `getSession()`, `setSession(name)`, `clearSession()` sobre `cookies()` de `next/headers`.

Convenciones:

- Todas las funciones de `app/data/` son `async` aunque hoy no lo necesiten.
- Las pantallas solo importan de `app/data/`; nunca leen arrays directo.
- Cookie `av_session`: JSON `{ name }`, `httpOnly`, `sameSite: "lax"`, `path: "/"`.
- Invitado = sin cookie (`Session | null`).
- Números con `toLocaleString("es-ES")`.

## Implementation plan

Antes de escribir código Next, leer la guía relevante en `node_modules/next/dist/docs/` (ver `AGENTS.md`).

1. Tokens y estilos base: portar variables de `styles.css` (`:root`) a `@theme inline` en `app/globals.css`; añadir fondo, scanlines, clases utilitarias (`.pixel`, `.neon-*`, `.btn*`, `.chip`) y keyframes (`fade-in`, `flicker`, `blink`, `pulse`). Verificar: `npm run dev` carga con fondo y fuentes correctas.
2. `app/data/`: crear `types.ts`, `games.ts`, `scores.ts`, `session.ts`. Verificar: `npm run build` sin errores de tipos.
3. Layout global en `app/layout.tsx`: `Nav` (Client Component, panel móvil) + `<main>` + footer. Nav recibe `session` desde el layout (Server). Verificar: nav y footer visibles en `/`.
4. Server Actions de auth (`app/auth/actions.ts`): `login(formData)`, `guest()`, `signOut()`. Verificar: botón en nav cambia tras login.
5. `/auth`: tabs entrar/crear, campos, invitado, social decorativos; envía a Server Actions y redirige a `/`. Verificar: login muestra nombre en nav; invitado no.
6. `/` Biblioteca: `GameCard` con tilt (Client), búsqueda + chips (Client, filtrado en cliente sobre juegos recibidos del servidor), estado vacío. Verificar: filtrar por texto y categoría.
7. `/games/[id]`: detalle + leaderboard vía `getScores`; `notFound()` si id inválido. Verificar: navegar desde card; id falso → 404.
8. `/games/[id]/play`: reproductor (Client) con HUD, pausa, fin, modal; guardar llama Server Action `saveScoreAction` → `saveScore`. Verificar: ciclo jugar → fin → guardar → "PUNTUACIÓN GUARDADA".
9. `/hall-of-fame`: tabs por juego, podio, tabla, fila "tu mejor marca" solo con sesión. Verificar: cambiar tab cambia datos; sin sesión no hay fila propia.
10. Pulido responsive y comparación visual contra `references/templates/Arcade Vault.html`.

## Acceptance criteria

- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] Existen las rutas `/`, `/games/[id]`, `/games/[id]/play`, `/auth`, `/hall-of-fame`.
- [ ] `/games/inexistente` devuelve 404.
- [ ] La biblioteca muestra 8 cards; buscar "caída" deja 1; categoría PUZZLE deja 1; búsqueda sin match muestra "NO HAY RESULTADOS".
- [ ] Clic en una card o su botón JUGAR navega a `/games/[id]`.
- [ ] El detalle muestra tags, descripción larga, stats y 10 filas de leaderboard.
- [ ] "JUGAR AHORA" lleva a `/games/[id]/play`; "VOLVER AL VAULT" a `/`.
- [ ] En el reproductor el score aumenta solo; PAUSA lo detiene y muestra "EN PAUSA"; REANUDAR continúa.
- [ ] FIN abre el modal con puntuación final; GUARDAR muestra "PUNTUACIÓN GUARDADA_"; JUGAR DE NUEVO reinicia a 0.
- [ ] Login con usuario "kai" muestra `KAI` en el nav y la cookie `av_session` existe; recargar mantiene la sesión.
- [ ] Usuario vacío al entrar → `PLAYER1`. Nombres truncados a 10 caracteres.
- [ ] "Jugar como invitado" redirige a `/` sin cookie; el nav muestra "Iniciar Sesión".
- [ ] Cerrar sesión borra la cookie.
- [ ] El Salón de la Fama muestra podio (3), tabla (12 filas) y cambia al seleccionar otro juego.
- [ ] La fila "TU MEJOR MARCA" aparece solo con sesión.
- [ ] Ningún componente de pantalla importa arrays/datos fuera de `app/data/`.
- [ ] A ≤ 768 px el nav muestra hamburguesa y abre/cierra el panel lateral.
- [ ] Fuentes Press Start 2P / JetBrains Mono / Courier Prime se aplican vía variables ya definidas en `app/layout.tsx`.

## Decisions

- **Sí:** rutas App Router reales. URLs compartibles e idiomáticas en Next; el hash-routing del template no aplica.
- **No:** hash + estado cliente. Rompe SSR y no escala a backend.
- **Sí:** `app/data/` con funciones async. Cambiar a DB = reescribir esos archivos, UI intacta.
- **No:** Route Handlers `/api/*` fake. Código extra sin beneficio mientras no haya backend.
- **Sí:** sesión por cookie `httpOnly` + Server Actions. Evita hydration mismatch de `localStorage` y simula auth real.
- **No:** `localStorage` para usuario/scores (lo que hacía el template). Obliga a todo cliente.
- **Sí:** scores en memoria del servidor. Suficiente para MVP visual; se pierden al reiniciar (aceptado).
- **Sí:** auth sin validación (como template). Es solo visual.
- **Sí:** CSS portado a Tailwind v4 + `globals.css`, no copia literal de `styles.css`. Respeta el stack del proyecto.
- **Sí:** verificación manual + lint/build. **No:** runner de tests; amplía scope.
- **Sí:** Server Components por defecto; Client solo donde hay estado (Nav, filtros, tilt, reproductor, tabs auth/salón).
- **Sí:** créditos "03" y datos del salón/leaderboard determinísticos (seed), igual que template. **No:** datos reales.

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Next 16 difiere del conocimiento previo (`cookies()` async, APIs cambiadas) | Leer `node_modules/next/dist/docs/` antes de cada paso con APIs de Next. |
| Scores en memoria se pierden en HMR/reinicio | Aceptado para MVP; documentado en `scores.ts`. |
| Divergencia visual al portar CSS a Tailwind | Comparar contra `Arcade Vault.html` en el paso 10; clases complejas (portadas, CRT) pueden quedar en `globals.css`. |
| Valores aleatorios del reproductor causan hydration mismatch | Score solo se calcula tras montar (`useEffect`), nunca en render inicial. |

## What is **not** in this spec

- Ningún juego real (lógica, canvas, controles).
- Backend, base de datos, API REST.
- Auth real / OAuth / validaciones.
- Tests automatizados.
- Persistencia durable de scores.

Cada uno, si llega, va en su propia spec.
