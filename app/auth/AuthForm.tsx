"use client";

import { useState } from "react";
import { guest, login } from "./actions";

export default function AuthForm() {
  const [tab, setTab] = useState<"in" | "up">("in");

  return (
    <>
      <div className="auth-tabs">
        <button type="button" className={tab === "in" ? "on" : ""} onClick={() => setTab("in")}>
          INICIAR SESIÓN
        </button>
        <button type="button" className={tab === "up" ? "on" : ""} onClick={() => setTab("up")}>
          CREAR CUENTA
        </button>
      </div>

      <form action={login}>
        <div className="field">
          <label htmlFor="user">Usuario</label>
          <input id="user" name="user" placeholder="px_kai" autoComplete="off" />
        </div>
        {tab === "up" && (
          <div className="field slide-in">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="jugador@vault.gg" />
          </div>
        )}
        <div className="field">
          <label htmlFor="pass">Contraseña</label>
          <input id="pass" name="pass" type="password" placeholder="••••••••" />
        </div>

        <button className="btn lg" type="submit" style={{ width: "100%", marginTop: 8 }}>
          {tab === "in" ? "ENTRAR AL VAULT" : "CREAR Y JUGAR"}
        </button>
      </form>

      <form action={guest}>
        <button className="btn ghost" type="submit" style={{ width: "100%", marginTop: 10 }}>
          JUGAR COMO INVITADO
        </button>
      </form>
    </>
  );
}
