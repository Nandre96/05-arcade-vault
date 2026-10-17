# SPEC 03 — Página "Acerca de" y formulario de contacto con Resend

> **Status:** Aprobado
> **Ticket:** none
> **Branch:** feature/spec-03-about-contacto-resend
> **Depends on:** SPEC 02
> **Date:** 2026-10-17
> **Objective:** Crear la página `/about` a partir de `references/templates/home-about/about.jsx` (misión + contacto) y hacer que su formulario envíe un correo real al equipo mediante Resend desde una Server Action.

## Por qué existe esta spec

SPEC 02 dejó "Acerca de" como link en el nav que cae en la 404, y dejó `about.jsx` fuera de scope. Esta spec porta esa página y añade lo que el template solo simulaba: el envío del formulario de contacto, que hoy solo muestra el terminal de éxito sin mandar nada.

## Scope

**In:**

- Página `/about` (Server Component) con las secciones de `about.jsx`:
  - Hero `▸ ACERCA DE`: título, misión y 3 highlights con icono pixel (HEART, BROWSER, PLANT).
  - Divisor decorativo con 24 pixeles animados.
  - Sección `▸ CONTACTO`: intro + 3 tips + formulario.
- Animación `reveal` reutilizando el `Reveal` Client Component de SPEC 02.
- Formulario (Client Component) con `NOMBRE`, `CORREO ELECTRÓNICO`, `MENSAJE`, botón `▶ ENVIAR MENSAJE`, que llama a una Server Action con `useActionState`.
- Server Action `sendContact` en `app/about/actions.ts`: valida en servidor y envía el correo vía Resend.
- Validación en servidor:
  - Campos requeridos (trim).
  - Email con formato válido.
  - Largos máximos: nombre 50, email 100, mensaje 2000.
  - Honeypot: campo oculto `website`; si viene con valor se responde éxito falso sin enviar.
- Correo al equipo con React Email (`app/emails/ContactEmail.tsx`): nombre, email del visitante y mensaje; `replyTo` = email del visitante; versión texto plana incluida.
- Estados de UI:
  - Idle: formulario.
  - Pendiente: botón deshabilitado, texto `ENVIANDO…`.
  - Error de validación: animación `shake` del template y mensaje bajo cada campo inválido.
  - Error de envío (Resend falla / falta config): mensaje `NO SE PUDO ENVIAR. INTÉNTALO DE NUEVO.` sin perder lo escrito.
  - Éxito: terminal `VAULT-OS // TERMINAL` con `GRACIAS, {NOMBRE}.` y botón `ENVIAR OTRO MENSAJE` que vuelve al formulario vacío.
- Configuración por variables de entorno: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
- CSS de about portado a `app/globals.css` / Tailwind (about-hero, highlight, divider, contact-grid, contact-form, field, terminal-success, shake), mismo look del template.
- Responsive (desktop + móvil).
- El link "Acerca de" del nav ya existe; pasa a mostrar la página real y a resaltarse en `/about`.

**Out of scope (futuras specs):**

- Correo de confirmación al visitante.
- Rate limit, CAPTCHA, persistencia de mensajes en DB.
- Dominio propio verificado en Resend (se usa `onboarding@resend.dev`).
- Cola/reintentos de envío, webhooks de Resend, tracking de entrega.
- Tests automatizados, i18n, SEO avanzado.
- Cambios en home, biblioteca, reproductor, salón o auth.

## Data model

Tipos en `app/data/types.ts`, enums en `app/enum/about.enum.ts`, constantes en `app/const/about.const.ts` y `app/const/contact.const.ts`.

```ts
// app/enum/about.enum.ts
export enum HighlightIcon { Heart = "HEART", Browser = "BROWSER", Plant = "PLANT" }
export enum ContactStatus { Idle = "idle", Success = "success", Error = "error" }
export enum ContactField { Name = "name", Email = "email", Message = "message" }
```

```ts
// app/data/types.ts
export interface ContactFormState {
  status: ContactStatus;
  name?: string;                                   // nombre para el terminal de éxito
  fieldErrors?: Partial<Record<ContactField, string>>;
  formError?: string;                              // fallo de envío
  values?: Partial<Record<ContactField, string>>;  // para no perder lo escrito
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
```

```ts
// app/const/about.const.ts (solo textos del template)
ABOUT_MISSION   // string
HIGHLIGHTS      // { icon: HighlightIcon; text; color: NeonColor }[]   (3)
CONTACT_TIPS    // { text; color: NeonColor }[]                        (3)

// app/const/contact.const.ts
CONTACT_LIMITS  // { name: 50; email: 100; message: 2000 }
CONTACT_FROM    // "Arcade Vault <onboarding@resend.dev>"
CONTACT_SUBJECT // (name) => `Nuevo mensaje de ${name} · Arcade Vault`
```

Capa de datos nueva: `app/data/contact.ts` con `sendContactEmail(payload: ContactPayload): Promise<void>` (async, lanza si Resend devuelve error). Cambiar de proveedor = tocar solo este archivo y `app/emails/`. Props de componentes en `app/interfaces/components.interface.ts`.

Variables de entorno (`.env.local`, ignorado por git):

| Variable | Valor |
| -------- | ----- |
| `RESEND_API_KEY` | API key de Resend |
| `CONTACT_TO_EMAIL` | `nohelvismd18@gmail.com` |

Convenciones heredadas: pantallas solo importan de `app/data/` y `app/const/`; Server Components por defecto, Client solo para el formulario; sin interfaces inline ni literales repetidos.

## Implementation plan

Antes de escribir código Next, leer la guía relevante en `node_modules/next/dist/docs/` (ver `AGENTS.md`), en especial Server Actions / `useActionState` y formularios.

1. Dependencias: instalar `resend` y `@react-email/components`. Commit: `chore: añadir resend y react-email`. Verificar: `npm run build` sin errores.
2. Datos: `app/enum/about.enum.ts`, `app/const/about.const.ts`, `app/const/contact.const.ts`, tipos en `app/data/types.ts`. Commit: `feat: añadir datos de about y contacto`. Verificar: build sin errores de tipos.
3. Estilos: portar de `references/templates/home-about/styles.css` las clases de about a `app/globals.css`/Tailwind. Commit: `feat: portar estilos de about`. Verificar: `npm run dev` compila.
4. Correo: `app/emails/ContactEmail.tsx` (React Email) y `app/data/contact.ts` con `sendContactEmail` (Resend, `from` `CONTACT_FROM`, `to` `CONTACT_TO_EMAIL`, `replyTo` visitante, `react` + `text`). Commit: `feat: añadir correo de contacto con Resend`. Verificar: build sin errores; con `RESEND_API_KEY` falsa, `sendContactEmail` lanza.
5. Server Action: `app/about/actions.ts` con `sendContact(prevState, formData)`: honeypot, validación, llamada a `sendContactEmail`, `try/catch` → `ContactFormState`. Commit: `feat: añadir server action de contacto`. Verificar: build sin errores.
6. Componentes: `HighlightGlyph`, `AboutHero`, `AboutDivider`, `ContactSection`, `ContactForm` (Client, `useActionState`, shake, terminal de éxito); props en `components.interface.ts`. Commit: `feat: añadir componentes de about`. Verificar: build sin errores.
7. Ensamblar `app/about/page.tsx` (Server). Commit: `feat: crear página about`. Verificar: criterios de aceptación de la página y del envío real.
8. Pulido responsive y comparación visual con `references/templates/home-about/arcade-vault-standalone.html`. Commit: `style: pulir responsive de about`.

## Acceptance criteria

- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] `/about` muestra hero con misión y 3 highlights, divisor y sección de contacto con 3 tips y formulario.
- [ ] El link "Acerca de" (desktop y móvil) lleva a `/about` y queda resaltado ahí; ya no cae en la 404.
- [ ] Enviar con campos vacíos no envía correo: activa `shake` y muestra error bajo cada campo vacío.
- [ ] Email inválido (`abc`) muestra error de formato y no envía.
- [ ] Mensaje de más de 2000 caracteres (o nombre > 50) es rechazado con mensaje de error.
- [ ] Con datos válidos y config correcta llega un correo a `nohelvismd18@gmail.com` con nombre, email y mensaje; al responderlo, el destinatario es el email del visitante (`replyTo`).
- [ ] Tras el envío se muestra el terminal con `GRACIAS, {NOMBRE EN MAYÚSCULAS}.`; `ENVIAR OTRO MENSAJE` vuelve al formulario vacío.
- [ ] Mientras se envía el botón está deshabilitado y dice `ENVIANDO…`.
- [ ] Con `RESEND_API_KEY` inválida o ausente se muestra `NO SE PUDO ENVIAR. INTÉNTALO DE NUEVO.` y los campos conservan lo escrito; no se muestra el terminal de éxito.
- [ ] Con el honeypot `website` relleno no se envía correo y no hay error visible.
- [ ] `RESEND_API_KEY` no aparece en el bundle del cliente ni en el HTML (solo se lee en servidor).
- [ ] Las secciones con `reveal` aparecen al hacer scroll sin hydration mismatch.
- [ ] A ≤ 768 px `/about` no tiene scroll horizontal y el formulario es usable.
- [ ] Ningún componente nuevo define interfaces/tipos inline ni repite literales de color/estado; usan `NeonColor`, `HighlightIcon`, `ContactStatus`, `ContactField`.

## Decisions

- **Sí:** Server Action + `useActionState`. Coherente con auth (SPEC 01); sin ruta `/api` extra ni exponer la key.
- **No:** Route Handler `/api/contact`. Más código sin otro consumidor del endpoint.
- **Sí:** remitente `onboarding@resend.dev`. Sin dominio verificado; suficiente para dev/curso. Limitación: Resend solo entrega al correo dueño de la cuenta, por lo que `nohelvismd18@gmail.com` debe ser el email de la cuenta de Resend.
- **Sí:** destinatario en `CONTACT_TO_EMAIL`, no hardcodeado. Cambiar de buzón sin tocar código.
- **Sí:** validación básica + honeypot. Cubre bots simples sin infraestructura. **No:** rate limit ni CAPTCHA (en memoria no es fiable en serverless; fuera de scope).
- **No:** correo de confirmación al visitante. Requiere dominio verificado; un solo correo al equipo.
- **Sí:** React Email para la plantilla. Decisión del usuario. Se envía también `text` plano como respaldo.
- **Sí:** `replyTo` = email del visitante. Responder desde el buzón sin copiar el correo a mano.
- **Sí:** `app/data/contact.ts` async como capa de envío. Mismo patrón que el resto de `app/data/`; el proveedor es sustituible.
- **Sí:** reutilizar `Reveal` de SPEC 02; `ContactForm` es el único Client Component nuevo.
- **Sí:** no perder lo escrito si falla el envío (`values` en el estado). Evita frustración en error transitorio.
- **Sí:** sin ticket → rama fallback `feature/spec-03-about-contacto-resend`. Commits: `<type>: descripción` (sin KEY).

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Con `onboarding@resend.dev` Resend rechaza destinatarios que no son el dueño de la cuenta | Usar el email de la cuenta de Resend como `CONTACT_TO_EMAIL`; documentado. Si falla, el usuario ve el error de envío. |
| `@react-email/components` puede no ser compatible con React 19.3 / Next 16 | Verificar en el paso 1 con `npm run build`; si falla, plantilla HTML en string como fallback (decisión a reabrir). |
| Next 16 difiere del conocimiento previo (Server Actions, `useActionState`) | Leer `node_modules/next/dist/docs/` antes de los pasos 5 y 6. |
| API key filtrada al cliente o commiteada | Solo `process.env` en archivos de servidor; `.env*` ya está en `.gitignore`. |
| Spam por abuso del formulario | Honeypot + límites de largo; rate limit queda para otra spec. |
| Hydration mismatch por animación `reveal` o estado del formulario | Clase `in` solo tras montar; estado del formulario solo en cliente tras interacción. |

## What is **not** in this spec

- Correo de confirmación al visitante.
- Dominio verificado, rate limit, CAPTCHA, guardado de mensajes en DB.
- Tests automatizados.
- Cambios en home, biblioteca, reproductor, salón de la fama o auth.

Cada uno, si llega, va en su propia spec.
