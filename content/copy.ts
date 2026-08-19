export type Lang = "pt" | "en";

const pt = {
  meta: {
    title: "Matheus Oliveira | Sites, sistemas e landing pages que funcionam",
    description:
      "Desenvolvedor full stack. Construo sites, sistemas e landing pages do zero, ou destravo os que já existem. Primeira conversa gratuita de 30 minutos.",
  },
  nav: {
    links: [
      { href: "#servicos", label: "Serviços" },
      { href: "#projetos", label: "Projetos" },
      { href: "#sobre", label: "Sobre" },
      { href: "#duvidas", label: "Dúvidas" },
    ],
    cta: "Vamos conversar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    skip: "Pular para o conteúdo",
    otherLang: "English",
    otherLangAria: "Switch to English",
    calmOn: "Modo calmo",
    calmOff: "Movimento",
    calmOnAria: "Desligar as animações da página",
    calmOffAria: "Ligar as animações da página",
  },
  hero: {
    titleLines: ["Construo produtos novos.", "Resgato os que travaram."],
    sub: "Desenvolvedor full stack. Sites, sistemas e landing pages do zero, ou destravo os que já existem. Next.js, Node e TypeScript, na prática.",
    ctaPrimary: "Vamos conversar",
    ctaSecondary: "Ver os projetos",
    slideAria: "Cultura de microorganismos animada, apenas decorativa",
  },
  symptoms: {
    title: "Reconhece algum destes sintomas?",
    colA: {
      title: "Se você tem um negócio",
      items: [
        "Você ainda não tem site, e cada cliente perdido pesa.",
        "O site demora tanto para abrir que a pessoa desiste antes.",
        "Cada função nova quebra duas antigas.",
        "Você paga manutenção todo mês e nada melhora.",
      ],
    },
    colB: {
      title: "Se você lidera um time",
      items: [
        "A entrega de uma semana virou dois meses.",
        "Ninguém quer encostar no serviço antigo.",
        "Subir para produção virou um evento de risco.",
        "O time apaga incêndio e não constrói nada.",
      ],
    },
    bridge: "Não precisa ser assim.",
  },
  why: {
    title: "Um projeto bem feito nasce claro, não vira novela.",
    cards: [
      {
        title: "Conversa antes do orçamento",
        body: "Eu escuto o que você precisa e te digo o que faria. O preço vem depois, quando você já sabe o que está comprando.",
      },
      {
        title: "Preço fechado e escopo escrito",
        body: "Você aprova um documento com prazo e valor. Se aparecer coisa nova no meio, eu aviso antes de fazer.",
      },
      {
        title: "Código que o próximo entende",
        body: "Entrego documentado e com uma conversa de passagem. Você não fica preso a mim.",
      },
    ],
  },
  services: {
    title: "O que eu faço",
    badge: "Mais procurado",
    link: "Quero esse",
    items: [
      {
        name: "Produto novo do zero",
        body: "Da primeira conversa até o site no ar. Você vê funcionando na primeira semana, não só no fim.",
      },
      {
        name: "Landing page que converte",
        body: "Uma página só, focada em fazer o visitante clicar em um botão: comprar, agendar ou chamar no WhatsApp.",
      },
      {
        name: "Resgate de sistema legado",
        body: "Aquele sistema que ninguém quer tocar volta a aceitar mudança sem quebrar o resto.",
      },
      {
        name: "Integração e automação",
        body: "O pedido entra pelo WhatsApp, cai no sistema e chega no financeiro sem ninguém copiar e colar.",
      },
    ],
  },
  work: {
    title: "Projetos sob a lente",
    shotAlt: "Print do projeto",
    labels: { problem: "Problema", did: "O que eu fiz", result: "Resultado" },
    hint: "Projetos: arraste para o lado ou use as setas",
    prev: "Projeto anterior",
    next: "Próximo projeto",
    viewLive: "Ver no ar",
    viewCode: "Código",
    items: {
      "o-que-me-mordeu": {
        name: "O Que Me Mordeu",
        kind: "Saúde · Projeto autoral",
        problem: "Picada de animal peçonhento pede resposta rápida, e a informação correta estava espalhada.",
        did: "App de identificação com orientação de primeiros socorros, baseado no guia oficial do Ministério da Saúde.",
        result: "Projeto autoral no ar, unindo minha paixão por biologia (animais peçonhentos, cobras principalmente) com engenharia de verdade.",
      },
      "saude-integrada": {
        name: "Saúde Integrada",
        kind: "Saúde · Cliente real",
        problem: "Uma clínica sem presença online perdia paciente para quem já tinha site.",
        did: "Site institucional para cliente real, do briefing ao deploy em produção, sozinho.",
        result: "No ar, atendendo pacientes reais desde o lançamento.",
      },
      "delivery-app": {
        name: "Delivery App",
        kind: "Delivery · Trabalho em equipe",
        problem: "Faltava uma plataforma completa de delivery: catálogo, carrinho, checkout e painel.",
        did: "Construí em equipe, do zero, com API própria separada do front-end.",
        result: "Projeto em equipe no ar, com back-end e front-end publicados.",
      },
    },
  },
  protocol: {
    title: "Como a gente trabalha junto",
    steps: [
      { name: "Conversar", body: "30 minutos. Você conta o que precisa e eu digo se topo o projeto." },
      { name: "Prototipar", body: "Você vê a tela principal funcionando antes de eu construir o resto." },
      { name: "Construir", body: "Entrego em pedaços, toda semana, com link para você testar." },
      { name: "Acompanhar", body: "Depois do lançamento eu fico de olho nos erros e ajusto o que aparecer." },
    ],
  },
  about: {
    title: "Antes de programar, eu queria ser biólogo.",
    body: [
      "Estudo biologia e sou apaixonado por animais peçonhentos, cobras principalmente. Foi dessa curiosidade que nasceu o O Que Me Mordeu, meu aplicativo autoral de identificação e primeiros socorros.",
      "Continuo achando que programar e estudar bicho é o mesmo trabalho. Software falha como organismo falha: quem derruba não é o defeito, é a defesa que não reagiu a tempo.",
      "Sou de São Pedro da Aldeia, no Rio de Janeiro, e atendo remoto para qualquer lugar do Brasil.",
    ],
    photoAlt: "Matheus Oliveira, desenvolvedor full stack",
    stackTitle: "O que eu uso no dia a dia",
  },
  offer: {
    title: "Conversa gratuita de 30 minutos",
    body: "Site novo, sistema travado ou uma ideia ainda no papel. Você me conta o que precisa, eu digo como eu faria. Sem cobrança e sem compromisso.",
    items: [
      "Você me conta o que precisa: site novo, sistema com problema, ou uma ideia",
      "Eu digo se topo o projeto e como eu faria",
      "Você recebe um resumo escrito, com prazo e valor estimado",
      "Se não fizer sentido eu tocar o projeto, eu digo isso também",
    ],
    cta: "Vamos conversar",
  },
  faq: {
    title: "Dúvidas que aparecem sempre",
    items: [
      {
        q: "Quanto custa?",
        a: "Depende do tamanho. Uma landing page fica em algumas horas a poucos dias de trabalho. Um sistema novo leva semanas. Você recebe o valor fechado por escrito antes de eu começar, e ele não muda no meio do caminho.",
      },
      {
        q: "Quanto tempo demora?",
        a: "Uma landing page sai em alguns dias a 2 semanas. Um sistema com login, pagamento e painel leva de 1 a 3 meses. Na primeira conversa eu te dou o prazo do seu caso.",
      },
      {
        q: "Meu sistema é antigo e bagunçado. Você pega?",
        a: "Pego, e parte do meu trabalho é isso. Começo mapeando o que já existe antes de mudar qualquer linha, para nada parar de funcionar no meio.",
      },
      {
        q: "Você trabalha por projeto ou contratado?",
        a: "Os dois. Fecho projeto com preço fixo e também entro em time por período, como PJ. Se você recruta, me chame que eu mando o currículo e os projetos completos.",
      },
      {
        q: "Depois de entregar, você some?",
        a: "Não. Fico 30 dias corrigindo qualquer erro sem cobrar nada e deixo tudo documentado. Se você quiser acompanhamento mensal depois, a gente combina.",
      },
      {
        q: "Como a gente começa?",
        a: "Me chame no WhatsApp ou preencha o formulário aqui embaixo. Eu respondo em até 24 horas úteis e marcamos os 30 minutos.",
      },
    ],
  },
  contact: {
    title: "Vamos ver o que dá para construir?",
    sub: "Leva um minuto para responder. Eu volto em até 24 horas úteis.",
    labels: {
      name: "Seu nome",
      whatsapp: "WhatsApp com DDD",
      email: "E-mail",
      message: "O que você precisa?",
    },
    help: { message: "Pode escrever do jeito que você falaria." },
    errors: {
      name: "Como posso te chamar?",
      whatsapp: "Preciso de um WhatsApp para te responder.",
      whatsappInvalid: "Esse número parece incompleto. Confere pra mim?",
      email: "Ops, confere esse e-mail pra mim?",
      message: "Escreve mais um pouco? Duas linhas já ajudam.",
    },
    submit: "Vamos conversar",
    submitting: "Enviando...",
    successTitle: "Recebido!",
    successBody: "Te respondo em até 24 horas úteis. Se for urgente, me chame direto no WhatsApp.",
    successAgain: "Enviar outra mensagem",
    orWhatsapp: "Prefere falar agora?",
    whatsappCta: "Chamar no WhatsApp",
    prefill: "Olá! Vi o seu site e quero saber mais sobre",
  },
  footer: {
    tagline: "Sites, sistemas e landing pages que saem do papel e continuam de pé.",
    rights: "Todos os direitos reservados.",
    privacy: "Política de privacidade",
    contactTitle: "Contato",
    navTitle: "Navegar",
  },
  ui: {
    backToTop: "Voltar ao topo",
    whatsapp: "Falar no WhatsApp",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "Matheus Oliveira | Websites, systems and landing pages that work",
    description:
      "Full stack developer. I build sites, systems and landing pages from scratch, or unstick the ones that already exist. Free 30 minute first call.",
  },
  nav: {
    links: [
      { href: "#servicos", label: "Services" },
      { href: "#projetos", label: "Work" },
      { href: "#sobre", label: "About" },
      { href: "#duvidas", label: "FAQ" },
    ],
    cta: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    otherLang: "Português",
    otherLangAria: "Mudar para português",
    calmOn: "Calm mode",
    calmOff: "Motion",
    calmOnAria: "Turn page animations off",
    calmOffAria: "Turn page animations on",
  },
  hero: {
    titleLines: ["I build new products.", "I rescue the broken ones."],
    sub: "Full stack developer. Sites, systems and landing pages from scratch, or I unstick the ones that already exist. Next.js, Node and TypeScript, in practice.",
    ctaPrimary: "Let's talk",
    ctaSecondary: "See the work",
    slideAria: "Animated culture of microorganisms, decorative only",
  },
  symptoms: {
    title: "Any of these look familiar?",
    colA: {
      title: "If you run a business",
      items: [
        "You still don't have a website, and every lost customer stings.",
        "The site takes so long to load that people leave first.",
        "Every new feature breaks two old ones.",
        "You pay for maintenance every month and nothing improves.",
      ],
    },
    colB: {
      title: "If you lead a team",
      items: [
        "The one week task turned into two months.",
        "Nobody wants to touch the old service.",
        "Shipping to production became a risky event.",
        "The team fights fires instead of building.",
      ],
    },
    bridge: "It does not have to be like this.",
  },
  why: {
    title: "A project done right starts clear. It doesn't turn into a saga.",
    cards: [
      {
        title: "A conversation before the quote",
        body: "I listen to what you need and tell you what I would do. The price comes after, when you already know what you are buying.",
      },
      {
        title: "Fixed price, written scope",
        body: "You approve a document with a deadline and a number. If something new shows up, I tell you before I build it.",
      },
      {
        title: "Code the next dev can read",
        body: "You get documentation and a handover call. You are never locked to me.",
      },
    ],
  },
  services: {
    title: "What I do",
    badge: "Most requested",
    link: "I want this",
    items: [
      {
        name: "New product from scratch",
        body: "From the first call to launch day. You see it running in week one, not only at the end.",
      },
      {
        name: "Landing page that converts",
        body: "One page, one job: get the visitor to click a button. Buy, book, or message on WhatsApp.",
      },
      {
        name: "Legacy system rescue",
        body: "The system nobody wants to touch starts accepting changes again without breaking the rest.",
      },
      {
        name: "Integration and automation",
        body: "The order arrives on WhatsApp, lands in the system and reaches finance with nobody copying and pasting.",
      },
    ],
  },
  work: {
    title: "Work under the lens",
    shotAlt: "Project screenshot",
    labels: { problem: "Problem", did: "What I did", result: "Result" },
    hint: "Work: drag sideways or use the arrows",
    prev: "Previous project",
    next: "Next project",
    viewLive: "View live",
    viewCode: "Code",
    items: {
      "o-que-me-mordeu": {
        name: "O Que Me Mordeu",
        kind: "Health · Personal project",
        problem: "A venomous bite needs a fast answer, and the right information was scattered.",
        did: "An identification app with first-aid guidance, based on the Brazilian Ministry of Health's official guide.",
        result: "A personal project live in production, mixing my love for biology (venomous animals, snakes especially) with real engineering.",
      },
      "saude-integrada": {
        name: "Saúde Integrada",
        kind: "Health · Real client",
        problem: "A clinic with no online presence was losing patients to the one down the street with a website.",
        did: "Institutional website for a real client, from briefing to production deploy, on my own.",
        result: "Live, serving real patients since launch.",
      },
      "delivery-app": {
        name: "Delivery App",
        kind: "Delivery · Team project",
        problem: "A full delivery platform was missing: catalog, cart, checkout and dashboard.",
        did: "Built with a team, from scratch, with its own separate API.",
        result: "A team project live in production, back-end and front-end both shipped.",
      },
    },
  },
  protocol: {
    title: "How we work together",
    steps: [
      { name: "Talk", body: "30 minutes. You describe what you need, I tell you if I can take it on." },
      { name: "Prototype", body: "You see the main screen working before I build the rest." },
      { name: "Build", body: "I ship in slices, every week, with a link for you to try." },
      { name: "Watch", body: "After launch I keep an eye on errors and fix what shows up." },
    ],
  },
  about: {
    title: "Before code, I wanted to be a biologist.",
    body: [
      "I study biology and I'm passionate about venomous animals, snakes especially. That curiosity is where O Que Me Mordeu, my own identification and first-aid app, came from.",
      "I still think coding and studying animals are the same job. Software fails the way an organism fails: it's not the bug that brings it down, it's the defence that reacted too late.",
      "I'm from São Pedro da Aldeia, in Rio de Janeiro, and I work remote for anywhere in Brazil.",
    ],
    photoAlt: "Matheus Oliveira, full stack developer",
    stackTitle: "What I work with",
  },
  offer: {
    title: "Free 30 minute call",
    body: "A new site, a stuck system, or an idea still on paper. Tell me what you need, I'll tell you how I'd do it. No charge, no strings.",
    items: [
      "You tell me what you need: a new site, a broken system, or an idea",
      "I tell you if I can take it on and how I'd do it",
      "You get a written summary, with a timeline and an estimated price",
      "If it doesn't make sense for me to build it, I'll say that too",
    ],
    cta: "Let's talk",
  },
  faq: {
    title: "Questions that always come up",
    items: [
      {
        q: "How much does it cost?",
        a: "It depends on the size. A landing page is a few hours to a few days of work. A new system takes weeks. You get a fixed number in writing before I start, and it does not change halfway through.",
      },
      {
        q: "How long does it take?",
        a: "A landing page ships in a few days to 2 weeks. A system with login, payments and a dashboard takes 1 to 3 months. On our first call I give you the number for your case.",
      },
      {
        q: "My system is old and messy. Will you take it?",
        a: "Yes, part of my work looks like that. I start by mapping what exists before changing a single line, so nothing stops working along the way.",
      },
      {
        q: "Do you work per project or as a hire?",
        a: "Both. I take fixed price projects and I also join teams for a period as a contractor. If you are hiring, message me and I will send my full CV and projects.",
      },
      {
        q: "Do you disappear after delivery?",
        a: "No. I fix any bug free for 30 days and leave everything documented. If you want monthly support after that, we can arrange it.",
      },
      {
        q: "How do we start?",
        a: "Message me on WhatsApp or fill the form below. I reply within 24 working hours and we book the 30 minutes.",
      },
    ],
  },
  contact: {
    title: "Want to see what we can build?",
    sub: "It takes a minute to fill. I reply within 24 working hours.",
    labels: {
      name: "Your name",
      whatsapp: "WhatsApp with area code",
      email: "Email",
      message: "What do you need?",
    },
    help: { message: "Write it the way you would say it out loud." },
    errors: {
      name: "What should I call you?",
      whatsapp: "I need a WhatsApp number to reply.",
      whatsappInvalid: "That number looks incomplete. Mind checking it?",
      email: "Could you double check this email?",
      message: "A couple more lines would really help.",
    },
    submit: "Let's talk",
    submitting: "Sending...",
    successTitle: "Got it!",
    successBody: "I reply within 24 working hours. If it is urgent, message me on WhatsApp.",
    successAgain: "Send another message",
    orWhatsapp: "Rather talk right now?",
    whatsappCta: "Message on WhatsApp",
    prefill: "Hi! I saw your site and I want to know more about",
  },
  footer: {
    tagline: "Websites, systems and landing pages that leave the drawing board and stay standing.",
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    contactTitle: "Contact",
    navTitle: "Browse",
  },
  ui: {
    backToTop: "Back to top",
    whatsapp: "Message on WhatsApp",
  },
};

export const copy: Record<Lang, Dict> = { pt, en };
