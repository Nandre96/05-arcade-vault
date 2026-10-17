"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/app/auth/actions";
import type { NavProps } from "@/app/interfaces/components.interface";

export default function Nav({ session }: NavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isLibrary = pathname.startsWith("/games");
  const isHall = pathname.startsWith("/hall-of-fame");
  const isAbout = pathname.startsWith("/about");
  const isAuth = pathname.startsWith("/auth");
  const active = (on: boolean) => (on ? "active" : undefined);

  return (
    <>
      <nav className="av-nav">
        <Link href="/" className="logo">
          <div className="logo-mark"></div>
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </Link>
        <div className="links">
          <Link href="/" className={active(isHome)}>Inicio</Link>
          <Link href="/games" className={active(isLibrary)}>Biblioteca</Link>
          <Link href="/hall-of-fame" className={active(isHall)}>Salón de la Fama</Link>
          <Link href="/about" className={active(isAbout)}>Acerca de</Link>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        {session ? (
          <form action={signOut} className="auth-btn">
            <button type="submit" className="btn ghost" title="Cerrar sesión">
              {session.name} ▾
            </button>
          </form>
        ) : (
          <Link href="/auth" className="btn auth-btn">Iniciar Sesión</Link>
        )}
        <button
          type="button"
          className="btn ghost hamburger"
          aria-label="Menú"
          onClick={() => setOpen(true)}
        >
          ≡
        </button>
      </nav>

      <div
        className={"av-mobile-backdrop" + (open ? " open" : "")}
        onClick={() => setOpen(false)}
      ></div>
      <aside className={"av-mobile-panel" + (open ? " open" : "")}>
        <div className="pixel neon-cyan mb-4 text-[11px]">MENÚ</div>
        <Link href="/" className={active(isHome)} onClick={() => setOpen(false)}>Inicio</Link>
        <Link href="/games" className={active(isLibrary)} onClick={() => setOpen(false)}>Biblioteca</Link>
        <Link href="/hall-of-fame" className={active(isHall)} onClick={() => setOpen(false)}>Salón de la Fama</Link>
        <Link href="/about" className={active(isAbout)} onClick={() => setOpen(false)}>Acerca de</Link>
        <Link href="/auth" className={active(isAuth)} onClick={() => setOpen(false)}>
          {session ? "Cuenta" : "Iniciar Sesión"}
        </Link>
        <div className="flex-1"></div>
        <div className="pixel text-[9px] tracking-[0.16em] text-ink-faint">CRÉDITOS · 03</div>
      </aside>
    </>
  );
}
