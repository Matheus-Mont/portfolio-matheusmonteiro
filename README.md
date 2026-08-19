# Portfólio — Matheus Oliveira Monteiro

Landing page de portfólio, com tema de laboratório de biologia. Feita em
Next.js (App Router), em português e inglês.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Motion (animações de interface) e GSAP + ScrollTrigger (transições de rolagem)
- Phosphor Icons

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

```bash
npm run build   # build de produção
npm run lint    # eslint
```

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `app/` | Layout raiz, metadata, fontes e a rota única (`/`) |
| `sections/` | Seções da página, na ordem em que aparecem |
| `components/` | Componentes reutilizáveis (botão, campo, contador, cascata de entrada) |
| `components/canvas/` | Fundo animado (microorganismos) e rastro de cursor, em canvas 2D |
| `content/` | Dados pessoais e projetos (`profile.ts`) e o texto do site nos dois idiomas (`copy.ts`) |
| `lib/` | Contextos de idioma e do interruptor geral de movimento (modo calmo / `prefers-reduced-motion`) |
| `public/photos/`, `public/projects/` | Foto pessoal e prints dos projetos |

## Pendências

- Domínio próprio (hoje `siteUrl` em `content/profile.ts` aponta para um placeholder)
- Política de privacidade (link no rodapé)
- Google Analytics / Meta Pixel / Google Ads, se forem usados (espaço reservado em `app/layout.tsx`)

## Deploy

Publicado na Vercel a partir da branch `main`.
