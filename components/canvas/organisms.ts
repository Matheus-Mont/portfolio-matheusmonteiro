type Species = "rod" | "ciliate" | "virus";

type Organism = {
  species: Species;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  phase: number;
  detail: number;
  hue: 0 | 1;
};

export type SwarmOptions = {
  density?: number;
  interactive?: boolean;
  light?: boolean;
  mix?: [number, number, number];
};

const BIOLUM = "61, 232, 192";
const PLASMA = "42, 169, 216";

function glowSprite(rgb: string, radius: number): HTMLCanvasElement {
  const size = radius * 2;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(radius, radius, 0, radius, radius, radius);
  grad.addColorStop(0, `rgba(${rgb}, 0.85)`);
  grad.addColorStop(0.3, `rgba(${rgb}, 0.25)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export function startSwarm(canvas: HTMLCanvasElement, options: SwarmOptions = {}) {
  const { density = 1, interactive = true, light = true, mix = [0.4, 0.34, 0.26] } = options;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return () => {};

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  const glow = [glowSprite(BIOLUM, 40), glowSprite(PLASMA, 40)];
  const lightSprite = glowSprite(BIOLUM, 180);

  let width = 0;
  let height = 0;
  let organisms: Organism[] = [];
  const pointer = { x: -9999, y: -9999, active: false };
  let frame = 0;
  let running = true;

  function build() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const base = Math.round((width * height) / 26000);
    const cores = navigator.hardwareConcurrency ?? 4;
    const budget = coarse || cores <= 4 ? 0.5 : 1;
    const count = Math.max(8, Math.min(60, Math.round(base * density * budget)));

    organisms = Array.from({ length: count }, () => {
      const roll = Math.random();
      const species: Species = roll < mix[0] ? "rod" : roll < mix[0] + mix[1] ? "ciliate" : "virus";
      return {
        species,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: species === "rod" ? 5 + Math.random() * 5 : species === "ciliate" ? 8 + Math.random() * 7 : 6 + Math.random() * 6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
        phase: Math.random() * Math.PI * 2,
        detail: 0,
        hue: Math.random() > 0.72 ? 1 : 0,
      };
    });
  }

  function capsulePath(length: number, radius: number) {
    const half = Math.max(length / 2 - radius, 0.1);
    ctx!.beginPath();
    ctx!.arc(-half, 0, radius, Math.PI / 2, -Math.PI / 2);
    ctx!.lineTo(half, -radius);
    ctx!.arc(half, 0, radius, -Math.PI / 2, Math.PI / 2);
    ctx!.closePath();
  }

  function drawRod(o: Organism, t: number) {
    const rgb = o.hue ? PLASMA : BIOLUM;
    const radius = o.size * 0.62;
    const length = o.size * 3.1;
    ctx!.save();
    ctx!.translate(o.x, o.y);
    ctx!.rotate(o.angle + Math.sin(t * 0.02 + o.phase) * 0.08);
    capsulePath(length, radius);
    ctx!.fillStyle = `rgba(${rgb}, 0.1)`;
    ctx!.fill();
    ctx!.strokeStyle = `rgba(${rgb}, 0.5)`;
    ctx!.lineWidth = 1;
    ctx!.stroke();
    ctx!.beginPath();
    ctx!.moveTo(0, -radius + 0.5);
    ctx!.lineTo(0, radius - 0.5);
    ctx!.strokeStyle = `rgba(${rgb}, 0.28)`;
    ctx!.stroke();
    ctx!.restore();
  }

  function drawCiliate(o: Organism, t: number) {
    const rgb = o.hue ? PLASMA : BIOLUM;
    const rx = o.size * 1.25;
    const ry = o.size * 0.78;
    ctx!.save();
    ctx!.translate(o.x, o.y);
    ctx!.rotate(Math.atan2(o.vy, o.vx));

    ctx!.beginPath();
    ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx!.fillStyle = `rgba(${rgb}, 0.09)`;
    ctx!.fill();
    ctx!.strokeStyle = `rgba(${rgb}, 0.5)`;
    ctx!.lineWidth = 1;
    ctx!.stroke();

    ctx!.beginPath();
    ctx!.ellipse(rx * 0.1, 0, rx * 0.24, ry * 0.34, 0, 0, Math.PI * 2);
    ctx!.strokeStyle = `rgba(${rgb}, 0.3)`;
    ctx!.stroke();

    const count = 20;
    ctx!.beginPath();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const bx = cos * rx;
      const by = sin * ry;
      const beat = 1 + Math.sin(t * 0.11 + o.phase + i * 0.55) * 0.45;
      const len = o.size * 0.42 * beat;
      const nx = cos / rx;
      const ny = sin / ry;
      const norm = Math.hypot(nx, ny) || 1;
      const tipX = bx + (nx / norm) * len - (sin * len) * 0.35;
      const tipY = by + (ny / norm) * len + (cos * len) * 0.35;
      ctx!.moveTo(bx, by);
      ctx!.lineTo(tipX, tipY);
    }
    ctx!.strokeStyle = `rgba(${rgb}, 0.42)`;
    ctx!.stroke();
    ctx!.restore();
  }

  function drawVirus(o: Organism, t: number) {
    const rgb = o.hue ? PLASMA : BIOLUM;
    const pulse = 1 + Math.sin(t * 0.035 + o.phase) * 0.06;
    const r = o.size * pulse;

    ctx!.globalCompositeOperation = "lighter";
    ctx!.globalAlpha = 0.22;
    ctx!.drawImage(glow[o.hue], o.x - r * 2.4, o.y - r * 2.4, r * 4.8, r * 4.8);
    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = "source-over";

    ctx!.save();
    ctx!.translate(o.x, o.y);
    ctx!.rotate(o.angle);

    ctx!.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx!.moveTo(px, py);
      else ctx!.lineTo(px, py);
    }
    ctx!.closePath();
    ctx!.fillStyle = `rgba(${rgb}, 0.12)`;
    ctx!.fill();
    ctx!.strokeStyle = `rgba(${rgb}, 0.55)`;
    ctx!.lineWidth = 1;
    ctx!.stroke();

    const spikes = 9;
    ctx!.beginPath();
    for (let i = 0; i < spikes; i++) {
      const a = (i / spikes) * Math.PI * 2 + 0.3;
      ctx!.moveTo(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92);
      ctx!.lineTo(Math.cos(a) * (r + o.size * 0.5), Math.sin(a) * (r + o.size * 0.5));
    }
    ctx!.strokeStyle = `rgba(${rgb}, 0.45)`;
    ctx!.stroke();

    ctx!.beginPath();
    for (let i = 0; i < spikes; i++) {
      const a = (i / spikes) * Math.PI * 2 + 0.3;
      const hx = Math.cos(a) * (r + o.size * 0.55);
      const hy = Math.sin(a) * (r + o.size * 0.55);
      ctx!.moveTo(hx + 1.1, hy);
      ctx!.arc(hx, hy, 1.1, 0, Math.PI * 2);
    }
    ctx!.fillStyle = `rgba(${rgb}, 0.5)`;
    ctx!.fill();
    ctx!.restore();
  }

  function tick() {
    if (!running) return;
    frame += 1;
    ctx!.clearRect(0, 0, width, height);

    if (light && pointer.active) {
      ctx!.globalCompositeOperation = "lighter";
      ctx!.globalAlpha = 0.1;
      ctx!.drawImage(lightSprite, pointer.x - 180, pointer.y - 180, 360, 360);
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    for (const o of organisms) {
      if (interactive && pointer.active) {
        const dx = o.x - pointer.x;
        const dy = o.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 42000 && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          const force = (1 - dist / 205) * 0.35;
          const sign = o.species === "virus" ? -0.5 : o.species === "rod" ? 0.45 : 1;
          o.vx += (dx / dist) * force * sign;
          o.vy += (dy / dist) * force * sign;
        }
      }

      o.vx += (Math.random() - 0.5) * 0.02;
      o.vy += (Math.random() - 0.5) * 0.02;
      const speed = Math.hypot(o.vx, o.vy);
      const max = o.species === "ciliate" ? 0.95 : o.species === "rod" ? 0.6 : 0.45;
      if (speed > max) {
        o.vx = (o.vx / speed) * max;
        o.vy = (o.vy / speed) * max;
      }
      o.x += o.vx;
      o.y += o.vy;
      o.angle += o.spin;

      const margin = 60;
      if (o.x < -margin) o.x = width + margin;
      if (o.x > width + margin) o.x = -margin;
      if (o.y < -margin) o.y = height + margin;
      if (o.y > height + margin) o.y = -margin;

      if (o.species === "rod") drawRod(o, frame);
      else if (o.species === "ciliate") drawCiliate(o, frame);
      else drawVirus(o, frame);
    }

    raf = requestAnimationFrame(tick);
  }

  let raf = 0;
  let resizeTimer = 0;

  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 180);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  };

  const onPointerLeave = () => {
    pointer.active = false;
  };

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      raf = requestAnimationFrame(tick);
    }
  };

  build();
  raf = requestAnimationFrame(tick);
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  if (interactive) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
  }

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
  };
}
