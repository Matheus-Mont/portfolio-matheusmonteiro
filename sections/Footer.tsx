"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { useLang } from "@/lib/LangProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-biolum/10 bg-abyss">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-tissue-dim">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="font-display text-sm text-biolum">{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-tissue-dim hover:text-tissue">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm text-biolum">{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-tissue-dim hover:text-tissue"
              >
                <WhatsappLogo size={16} aria-hidden />
                {profile.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-sm text-tissue-dim hover:text-tissue"
              >
                <EnvelopeSimple size={16} aria-hidden />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-tissue-dim hover:text-tissue"
              >
                <GithubLogo size={16} aria-hidden />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-tissue-dim hover:text-tissue"
              >
                <LinkedinLogo size={16} aria-hidden />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-biolum/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-6 text-xs text-tissue-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}
          </p>
          <a href="#" className="hover:text-tissue">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
