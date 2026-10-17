"use client";

import { useActionState, useState } from "react";
import { sendContact } from "@/app/about/actions";
import { CONTACT_HONEYPOT } from "@/app/const/contact.const";
import type { ContactFormState } from "@/app/data/types";
import { ContactField, ContactStatus } from "@/app/enum/about.enum";

const INITIAL_STATE: ContactFormState = { status: ContactStatus.Idle };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, INITIAL_STATE);
  const [seen, setSeen] = useState(state);
  const [shake, setShake] = useState(false);
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);

  if (seen !== state) {
    setSeen(state);
    setShake(Boolean(state.fieldErrors));
  }

  const showSuccess = state.status === ContactStatus.Success && dismissed !== state;
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  return (
    <form
      className={`contact-form${shake ? " shake" : ""}`}
      action={formAction}
      noValidate
      onAnimationEnd={() => setShake(false)}
    >
      {showSuccess ? (
        <div className="terminal-success">
          <div className="term-bar">
            <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
            <span className="term-title">VAULT-OS // TERMINAL</span>
          </div>
          <div className="term-body">
            <div className="line"><span className="prompt">vault@arcade:~$</span> ./send_message --to=team</div>
            <div className="line dim">[OK] Conectando con servidor…</div>
            <div className="line dim">[OK] Validando contenido…</div>
            <div className="line dim">[OK] Transmitiendo paquete…</div>
            <div className="line success">
              &gt; MENSAJE RECIBIDO. TE RESPONDEREMOS PRONTO. GRACIAS, {(state.name ?? "").toUpperCase()}.
              <span className="caret">_</span>
            </div>
            <div style={{ marginTop: 18 }}>
              <button className="btn ghost" type="button" onClick={() => setDismissed(state)}>
                ENVIAR OTRO MENSAJE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`field${errors[ContactField.Name] ? " invalid" : ""}`}>
            <label htmlFor={ContactField.Name}>NOMBRE</label>
            <input
              id={ContactField.Name}
              name={ContactField.Name}
              placeholder="px_kai"
              defaultValue={values[ContactField.Name]}
            />
            {errors[ContactField.Name] && <span className="field-error">{errors[ContactField.Name]}</span>}
          </div>
          <div className={`field${errors[ContactField.Email] ? " invalid" : ""}`}>
            <label htmlFor={ContactField.Email}>CORREO ELECTRÓNICO</label>
            <input
              id={ContactField.Email}
              name={ContactField.Email}
              type="email"
              placeholder="jugador@vault.gg"
              defaultValue={values[ContactField.Email]}
            />
            {errors[ContactField.Email] && <span className="field-error">{errors[ContactField.Email]}</span>}
          </div>
          <div className={`field${errors[ContactField.Message] ? " invalid" : ""}`}>
            <label htmlFor={ContactField.Message}>MENSAJE</label>
            <textarea
              id={ContactField.Message}
              name={ContactField.Message}
              rows={5}
              placeholder="Cuéntanos qué tienes en mente…"
              defaultValue={values[ContactField.Message]}
            ></textarea>
            {errors[ContactField.Message] && <span className="field-error">{errors[ContactField.Message]}</span>}
          </div>
          <div className="hp-field" aria-hidden="true">
            <input name={CONTACT_HONEYPOT} tabIndex={-1} autoComplete="off" />
          </div>
          {state.formError && <div className="form-error" role="alert">{state.formError}</div>}
          <button className="btn xl press" type="submit" style={{ width: "100%" }} disabled={pending}>
            {pending ? "ENVIANDO…" : "▶  ENVIAR MENSAJE"}
          </button>
        </>
      )}
    </form>
  );
}
