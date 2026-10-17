# SPEC 02 — Home, biblioteca en `/games` y 404 personalizada

> **Status:** Aprobado
> **Ticket:** none
> **Branch:** feature/spec-02-home-games-404
> **Depends on:** SPEC 01
> **Date:** 2026-10-17
> **Objective:** Crear el Home (landing) en `/` a partir de `references/templates/home-about/`, mover la biblioteca a `/games` y añadir una 404 personalizada con la estética arcade, dejando "Acerca de" solo como link sin contenido.

## Por qué existe esta spec

Hoy `/` es la biblioteca (spec 01). El template `home-about/` trae una landing (`home.jsx`) y una página "Acerca de" (`about.jsx`). Esta spec porta solo la landing, libera `/` para ella, mueve la biblioteca a `/games` y cubre las rutas inexistentes con una 404 coherente con el diseño. El contenido de "Acerca de" queda para otra spec.

## Scope

**In:**

- Home en `/` con las 7 secciones de `home.jsx`:
  - Hero con siluetas pixel flotantes, título 3 líneas, CTAs y "DESLIZA".
  - `// 01` ¿POR QUÉ ARCADE VAULT? (4 feature cards con icono pixel).
  - `// 02` JUEGOS DISPONIBLES AHORA (6 mini cards + botón VER TODOS LOS JUEGOS → `/games`).
  - Stats (3 bloques).
  - `// 03` ACTIVIDAD EN VIVO (últimas puntuaciones + top jugadores hoy, link VER SALÓN → `/hall-of-fame`).
  - `// 04` PRECIOS (plan único + 3 FAQ).
  - CTA final INSERTAR MONEDA → `/games`.
- Animación `reveal` (IntersectionObserver) en las secciones, portada a un Client Component pequeño.
- Con sesión activa se ocultan CREAR CUENTA (hero) y se reemplaza EMPEZAR GRATIS (precios) por EXPLORAR JUEGOS → `/games`. Sin sesión apuntan a `/auth`.
- Biblioteca movida de `/` a `/games` (`app/games/page.tsx`), manteniendo hero propio, búsqueda y chips tal como están.
- Actualizar links internos: nav (desktop y móvil), `VOLVER AL VAULT` (detalle y reproductor), `VOLVER A LA BIBLIOTECA` (salón).
- Nav: añadir "Inicio" (`/`) y "Acerca de" (`/about`, sin ruta → cae en la 404). "Biblioteca" activa en `/games` y `/games/[id]*`; "Inicio" activa solo en `/`.
- 404 personalizada `app/not-found.tsx`: "404" gigante neón con flicker, texto `GAME OVER · PÁGINA NO ENCONTRADA`, botones VOLVER AL INICIO (`/`) y EXPLORAR JUEGOS (`/games`). Sirve para rutas inexistentes, `/about` y `notFound()` de `/games/[id]`.
- Datos mock del home: textos estáticos en `app/const/home.const.ts`, actividad y top vía `app/data/activity.ts` (async).
- CSS del home portado a `app/globals.css` / clases Tailwind (siluetas, reveal, feature, mini-card, stats, activity, pricing, faq, final), mismo look del template.
- Responsive (desktop + móvil).

**Out of scope (futuras specs):**

- Página `/about` y su contenido (misión, contacto) de `about.jsx`.
- Actividad en vivo real (WebSocket, polling, DB); es mock determinístico.
- Redirect desde la URL vieja de la biblioteca (`/` ahora es home, no hay nada que redirigir).
- Cambiar destino del redirect post-login/invitado (`/` se mantiene).
- Tests automatizados, i18n, SEO avanzado.
- Cambios en reproductor, detalle, salón o auth más allá de actualizar links.

## Data model

Estructuras nuevas en `app/data/types.ts` (tipos) y `app/const/home.const.ts` (datos estáticos). Colores con el enum `NeonColor` existente; nada de literales repetidos.

```ts
// app/data/types.ts
export interface ActivityEntry {
  player: string;      // "NEONFOX"
  game: string;        // "Caída" (título corto del juego)
  score: number;       // 184220
  ago: string;         // "hace 2 min"
  color: NeonColor;
}

export interface TopPlayer {
  rank: number;        // 1..5
  player: string;
  score: number;
}
```

```ts
// app/const/home.const.ts (estático, solo textos; tipos en app/data/types.ts)
FEATURES   // { icon: FeatureIcon; title; description; color: NeonColor }[]  (4)
HOME_STATS // { value; unit; sub }[]                                          (3)
PRICING    // { label; name; amount; unit; tag; perks: string[]; foot }
FAQ        // { question; answer }[]                                          (3)
```

```ts
// app/enum/home.enum.ts
export enum FeatureIcon { Gamepad = "GAMEPAD", Free = "FREE", Trophy = "TROPHY", Rocket = "ROCKET" }
```

Funciones nuevas en `app/data/activity.ts` (async, sustituibles por DB): `getRecentActivity()` (7 filas), `getTopPlayers()` (5 filas). Datos tomados del template. Props de componentes en `app/interfaces/components.interface.ts`.

Convenciones heredadas de SPEC 01: pantallas solo importan de `app/data/` y `app/const/`; números con `toLocaleString("es-ES")`; Server Components por defecto, Client solo para reveal.

Rutas resultantes:

| Ruta | Pantalla |
| ---- | -------- |
| `/` | Home (nuevo) |
| `/games` | Biblioteca (movida) |
| `/games/[id]`, `/games/[id]/play` | Sin cambios |
| `/hall-of-fame`, `/auth` | Sin cambios |
| `*` (incl. `/about`) | 404 personalizada |

## Implementation plan

Antes de escribir código Next, leer la guía relevante en `node_modules/next/dist/docs/` (ver `AGENTS.md`), en especial `not-found` y routing.

1. Mover biblioteca a `/games`: crear `app/games/page.tsx` con el contenido actual de `app/page.tsx`; actualizar links `/` → `/games` en `[id]/page.tsx`, `GamePlayer.tsx`, `HallOfFame.tsx`. Dejar `app/page.tsx` temporal con un placeholder mínimo para no romper `/`. Commit: `refactor: mover biblioteca a /games`. Verificar: `/games` muestra las 8 cards; links "volver" llevan a `/games`.
2. Nav: añadir "Inicio" y "Acerca de" en desktop y panel móvil; activos según ruta (`/` exacto para Inicio, `/games*` para Biblioteca). Commit: `feat: añadir Inicio y Acerca de al nav`. Verificar: resaltado correcto en `/`, `/games`, `/games/[id]`.
3. 404 personalizada: `app/not-found.tsx` + estilos (404 gigante, flicker, botones). Commit: `feat: añadir 404 personalizada`. Verificar: `/ruta-falsa`, `/about` y `/games/inexistente` muestran la 404 con nav y footer.
4. Datos del home: `app/enum/home.enum.ts`, `app/const/home.const.ts`, tipos en `app/data/types.ts`, `app/data/activity.ts`. Commit: `feat: añadir datos mock del home`. Verificar: `npm run build` sin errores de tipos.
5. Estilos del home: portar de `references/templates/home-about/styles.css` las clases del home a `app/globals.css`/Tailwind (siluetas, hero, reveal, secciones, cards, stats, activity, pricing, faq, final). Commit: `feat: portar estilos del home`. Verificar: `npm run dev` compila sin errores.
6. Componentes del home: `FloatingSilhouettes`, `FeatureIcon`, `MiniCard`, `Reveal` (Client) y secciones; props en `components.interface.ts`. Commit: `feat: añadir componentes del home`. Verificar: build sin errores.
7. Ensamblar `app/page.tsx` (Server): lee `getGames`, `getRecentActivity`, `getTopPlayers`, `getSession`; oculta CREAR CUENTA y cambia CTA de precios con sesión; todos los CTAs a `/games` o `/auth` según corresponda. Commit: `feat: crear home en /`. Verificar: criterios de aceptación del home.
8. Pulido responsive y comparación visual con `references/templates/home-about/arcade-vault-standalone.html`. Commit: `style: pulir responsive del home`.

## Acceptance criteria

- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] `/` muestra hero, 4 feature cards, 6 mini cards, 3 stats, actividad (7 filas) + top (5 filas), precios con 3 FAQ y CTA final.
- [ ] Las secciones con `reveal` aparecen al hacer scroll y no producen hydration mismatch.
- [ ] EXPLORAR JUEGOS, VER TODOS LOS JUEGOS e INSERTAR MONEDA navegan a `/games`.
- [ ] Clic en una mini card navega a `/games/[id]`; VER SALÓN navega a `/hall-of-fame`.
- [ ] Sin sesión: CREAR CUENTA y EMPEZAR GRATIS navegan a `/auth`.
- [ ] Con sesión: no aparece CREAR CUENTA y el CTA de precios es EXPLORAR JUEGOS → `/games`.
- [ ] `/games` muestra 8 cards; buscar "caída" deja 1; PUZZLE deja 1; sin match muestra "NO HAY RESULTADOS".
- [ ] No quedan links internos a `/` con intención de biblioteca (`VOLVER AL VAULT` x2 y `VOLVER A LA BIBLIOTECA` van a `/games`).
- [ ] Nav (desktop y móvil) muestra Inicio, Biblioteca, Salón de la Fama y Acerca de; resaltado: Inicio solo en `/`, Biblioteca en `/games` y `/games/[id]`.
- [ ] `/about` devuelve la 404 personalizada (no existe contenido de about).
- [ ] `/ruta-falsa` y `/games/inexistente` muestran la 404 con "404", "GAME OVER · PÁGINA NO ENCONTRADA" y botones a `/` y `/games`.
- [ ] La 404 conserva nav, footer, CRT y scanlines del layout.
- [ ] A ≤ 768 px el home y la 404 no tienen scroll horizontal y el nav usa hamburguesa.
- [ ] Ningún componente nuevo define interfaces/tipos inline ni repite literales de color; usan `NeonColor`/`FeatureIcon`.

## Decisions

- **Sí:** `/` = home, `/games` = biblioteca. Landing en la raíz; URL de catálogo explícita.
- **No:** redirect desde la URL vieja. `/` sigue existiendo (ahora home), no hay URL huérfana.
- **Sí:** "Acerca de" como link sin ruta que cae en la 404. Decisión del usuario; evita crear una página placeholder fuera de scope. Se reemplaza al crear la spec de about.
- **No:** página `/about` placeholder ni portar `about.jsx`. Pertenece a otra spec.
- **Sí:** las 7 secciones del home, incluida Precios/FAQ. Decisión del usuario; copia fiel del template.
- **Sí:** ocultar CREAR CUENTA/EMPEZAR GRATIS con sesión. Evita CTAs sin sentido; el home lee `getSession()` en el Server.
- **Sí:** estáticos en `app/const/home.const.ts`, actividad/top en `app/data/activity.ts` async. Cambiar a DB = tocar solo `app/data/`.
- **Sí:** `not-found.tsx` global con estética GAME OVER y dos CTAs. **No:** countdown (más JS cliente sin valor funcional).
- **Sí:** mantener `redirect("/")` tras login/invitado/cerrar sesión. Aterrizar en el home; cambiarlo sería otra decisión.
- **Sí:** sin ticket → rama fallback `feature/spec-02-home-games-404`. Commits: `<type>: descripción` (sin KEY).
- **Sí:** `Reveal` como único Client Component nuevo; el resto Server Components.

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Next 16 difiere del conocimiento previo (`not-found`, `cookies()` async) | Leer `node_modules/next/dist/docs/` antes de los pasos 3 y 7. |
| `reveal` con IntersectionObserver causa hydration mismatch o contenido invisible sin JS | Clase `in` solo se añade tras montar (`useEffect`); contenido presente en el HTML del servidor. |
| Divergencia visual al portar ~86 reglas CSS del home | Comparar contra `arcade-vault-standalone.html` en el paso 8; clases complejas pueden quedar en `globals.css`. |
| Links a `/` omitidos al mover la biblioteca | Grep de `href="/"` tras el paso 1 y criterio de aceptación explícito. |
| "Acerca de" lleva a 404 y puede parecer bug | Aceptado y documentado; se resuelve con la spec de about. |

## What is **not** in this spec

- Página "Acerca de" y su contenido (misión, contacto).
- Actividad en vivo real, backend o base de datos.
- Redirect desde URLs antiguas.
- Tests automatizados.
- Cambios funcionales en reproductor, detalle, salón de la fama o auth.

Cada uno, si llega, va en su propia spec.
