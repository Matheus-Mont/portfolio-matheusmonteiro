"use client";

import { useState } from "react";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { Button, ButtonLink } from "@/components/Button";
import Field from "@/components/Field";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { useLang } from "@/lib/LangProvider";

type FormState = { name: string; whatsapp: string; email: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>({ name: "", whatsapp: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [trap, setTrap] = useState("");

  const validate = (state: FormState): Errors => {
    const next: Errors = {};
    if (state.name.trim().length < 2) next.name = t.contact.errors.name;
    const digits = state.whatsapp.replace(/\D/g, "");
    if (!digits) next.whatsapp = t.contact.errors.whatsapp;
    else if (digits.length < 10) next.whatsapp = t.contact.errors.whatsappInvalid;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email)) next.email = t.contact.errors.email;
    if (state.message.trim().length < 10) next.message = t.contact.errors.message;
    return next;
  };

  const update = (key: keyof FormState) => (value: string) => {
    const next = { ...form, [key]: key === "whatsapp" ? maskPhone(value) : value };
    setForm(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(form));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (trap) return;
    const found = validate(form);
    setErrors(found);
    setTouched({ name: true, whatsapp: true, email: true, message: true });
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus("sending");

    const text = [
      `${t.contact.prefill}:`,
      "",
      `${t.contact.labels.name}: ${form.name}`,
      `${t.contact.labels.whatsapp}: ${form.whatsapp}`,
      `${t.contact.labels.email}: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    window.setTimeout(() => {
      window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      setStatus("done");
    }, 650);
  };

  return (
    <section id="contato" className="border-t border-biolum/15 bg-abyss-2/88 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="max-w-[16ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tissue-dim">{t.contact.sub}</p>

          <div className="mt-10">
            <p className="text-sm text-tissue-dim">{t.contact.orWhatsapp}</p>
            <div className="mt-3">
              <ButtonLink
                href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`${t.contact.prefill}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                <WhatsappLogo size={18} aria-hidden />
                {t.contact.whatsappCta}
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[14px] border border-biolum/30 bg-biolum/5 p-9"
              role="status"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-biolum">
                {t.contact.successTitle}
              </h3>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-tissue-dim">{t.contact.successBody}</p>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: "", whatsapp: "", email: "", message: "" });
                  setTouched({});
                  setErrors({});
                  setStatus("idle");
                }}
                className="mt-6 font-display text-sm text-biolum underline underline-offset-4 hover:text-tissue"
              >
                {t.contact.successAgain}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Field id="name" label={t.contact.labels.name} error={touched.name ? errors.name : undefined}>
                  {(props) => (
                    <input
                      {...props}
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name")(e.target.value)}
                      onBlur={blur("name")}
                    />
                  )}
                </Field>
              </div>

              <div className="sm:col-span-1">
                <Field
                  id="whatsapp"
                  label={t.contact.labels.whatsapp}
                  error={touched.whatsapp ? errors.whatsapp : undefined}
                >
                  {(props) => (
                    <input
                      {...props}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="(11) 98765-4321"
                      value={form.whatsapp}
                      onChange={(e) => update("whatsapp")(e.target.value)}
                      onBlur={blur("whatsapp")}
                    />
                  )}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field id="email" label={t.contact.labels.email} error={touched.email ? errors.email : undefined}>
                  {(props) => (
                    <input
                      {...props}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email")(e.target.value)}
                      onBlur={blur("email")}
                    />
                  )}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field
                  id="message"
                  label={t.contact.labels.message}
                  help={t.contact.help.message}
                  error={touched.message ? errors.message : undefined}
                >
                  {(props) => (
                    <textarea
                      {...props}
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message")(e.target.value)}
                      onBlur={blur("message")}
                    />
                  )}
                </Field>
              </div>

              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" disabled={status === "sending"} className="disabled:opacity-70">
                  {status === "sending" ? t.contact.submitting : t.contact.submit}
                  {status === "idle" && <ArrowRight size={17} weight="bold" aria-hidden />}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
