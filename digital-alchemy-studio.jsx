import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// DIGITAL ALCHEMY STUDIO — Consciousness Engineering Engine
// ═══════════════════════════════════════════════════════════════

// ── Knowledge Base: Intention → Visual Recipe ──────────────────
const INTENTIONS = {
  healing: {
    title: "Cellular Renewal Field",
    subtitle: "528Hz · Theta · Flower of Life",
    geometry: "flower_of_life",
    colors: { primary: "#00ff88", secondary: "#4169E1", accent: "#FFD700", bg1: "#020d1a", bg2: "#071e2c", bg3: "#0a2d3a" },
    entrainmentHz: 6.0,
    chakra: "heart",
    particleBehavior: "orbital",
    symbols: ["✦", "❋", "◉", "⊕"],
    subliminals: [
      "Every cell renews", "Healing flows through me", "I am whole and complete",
      "My body is a temple of light", "Vitality fills every fiber", "I radiate perfect health",
      "Restoration is my nature", "Life force surges within", "I am healed", "Wellness is my birthright"
    ],
    breathCycle: 11, // 5.5s in, 5.5s out
    motionStyle: "breathing",
    glowColor: "rgba(0,255,136,0.3)"
  },
  abundance: {
    title: "Golden Ratio Attractor",
    subtitle: "396Hz · Alpha · Sri Yantra",
    geometry: "sri_yantra",
    colors: { primary: "#FFD700", secondary: "#DAA520", accent: "#8B4513", bg1: "#1a0f00", bg2: "#2d1a00", bg3: "#3d2400" },
    entrainmentHz: 10.0,
    chakra: "solar_plexus",
    particleBehavior: "expansion",
    symbols: ["◈", "✧", "⬡", "❖"],
    subliminals: [
      "Abundance flows to me effortlessly", "I am a magnet for prosperity", "Wealth is my natural state",
      "I deserve all good things", "Opportunities multiply around me", "I attract success",
      "Golden light fills my path", "I am aligned with infinite supply", "Gratitude multiplies my blessings"
    ],
    breathCycle: 8,
    motionStyle: "expanding",
    glowColor: "rgba(255,215,0,0.3)"
  },
  awakening: {
    title: "Crown Activation Matrix",
    subtitle: "963Hz · Gamma · Metatron's Cube",
    geometry: "metatrons_cube",
    colors: { primary: "#bf7fff", secondary: "#ffffff", accent: "#ffd700", bg1: "#0d0015", bg2: "#1a002d", bg3: "#2d004a" },
    entrainmentHz: 40.0,
    chakra: "crown",
    particleBehavior: "ascending",
    symbols: ["☆", "◇", "△", "⊙"],
    subliminals: [
      "I am infinite awareness", "The veil lifts now", "I see with divine clarity",
      "Consciousness expands beyond form", "I am the witness", "Truth reveals itself",
      "I awaken to my true nature", "Light of awareness shines", "I am that I am"
    ],
    breathCycle: 7,
    motionStyle: "ascending",
    glowColor: "rgba(191,127,255,0.4)"
  },
  love: {
    title: "Heart Resonance Field",
    subtitle: "639Hz · Alpha · Vesica Piscis",
    geometry: "vesica_piscis",
    colors: { primary: "#ff69b4", secondary: "#00cc66", accent: "#FFD700", bg1: "#1a0010", bg2: "#2d001a", bg3: "#3d0028" },
    entrainmentHz: 10.5,
    chakra: "heart",
    particleBehavior: "enfolding",
    symbols: ["♡", "❀", "◎", "∞"],
    subliminals: [
      "My heart is open and radiant", "I give and receive love freely", "Love flows through every cell",
      "I am worthy of deep love", "Compassion is my nature", "I attract loving connections",
      "My heart heals all it touches", "Love is the fabric of reality", "I am love incarnate"
    ],
    breathCycle: 10,
    motionStyle: "breathing",
    glowColor: "rgba(255,105,180,0.3)"
  },
  focus: {
    title: "Crystal Clarity Engine",
    subtitle: "741Hz · Beta · Crystalline Grid",
    geometry: "crystal_grid",
    colors: { primary: "#00d4ff", secondary: "#e0e0e0", accent: "#ffee00", bg1: "#000a14", bg2: "#001428", bg3: "#001e3c" },
    entrainmentHz: 18.0,
    chakra: "third_eye",
    particleBehavior: "converging",
    symbols: ["◆", "▲", "⟐", "✦"],
    subliminals: [
      "My mind is razor sharp", "I see with perfect clarity", "Focus comes naturally to me",
      "Distractions dissolve", "I am present and alert", "My thoughts are precise",
      "Concentration deepens effortlessly", "I achieve with ease", "Mental power flows freely"
    ],
    breathCycle: 6,
    motionStyle: "converging",
    glowColor: "rgba(0,212,255,0.3)"
  },
  creativity: {
    title: "Infinite Imagination Vortex",
    subtitle: "417Hz · Theta-Alpha · Fractal Bloom",
    geometry: "fractal_bloom",
    colors: { primary: "#ff6b35", secondary: "#a855f7", accent: "#00ffcc", bg1: "#140a00", bg2: "#1e1028", bg3: "#0a1e1e" },
    entrainmentHz: 8.0,
    chakra: "sacral",
    particleBehavior: "branching",
    symbols: ["❋", "✻", "⊛", "◉"],
    subliminals: [
      "Ideas flow through me endlessly", "I create without limits", "Inspiration is my constant companion",
      "My imagination is infinite", "I channel divine creativity", "New possibilities bloom",
      "I am a vessel of creation", "Art flows from my being", "The muse speaks through me"
    ],
    breathCycle: 9,
    motionStyle: "branching",
    glowColor: "rgba(255,107,53,0.3)"
  },
  kundalini: {
    title: "Serpent Fire Awakening",
    subtitle: "Progressive Hz · Delta→Gamma · Chakra Column",
    geometry: "chakra_column",
    colors: { primary: "#ff0040", secondary: "#ff8c00", accent: "#bf7fff", bg1: "#140000", bg2: "#001414", bg3: "#0d0028" },
    entrainmentHz: 4.0,
    chakra: "root_to_crown",
    particleBehavior: "ascending_spiral",
    symbols: ["🜂", "⟡", "◈", "☉"],
    subliminals: [
      "Sacred energy rises", "Shakti awakens within", "Fire purifies and transforms",
      "Each center opens to light", "The serpent ascends", "I am electric with life force",
      "Kundalini flows freely", "Divine fire illuminates", "I am the conduit of cosmic energy"
    ],
    breathCycle: 8,
    motionStyle: "ascending",
    glowColor: "rgba(255,0,64,0.3)"
  },
  grounding: {
    title: "Earth Root Anchor",
    subtitle: "396Hz · Low Alpha · Hexagonal Grid",
    geometry: "hex_grid",
    colors: { primary: "#8B4513", secondary: "#228B22", accent: "#DAA520", bg1: "#0a0800", bg2: "#141000", bg3: "#1e1800" },
    entrainmentHz: 8.5,
    chakra: "root",
    particleBehavior: "settling",
    symbols: ["⬡", "▽", "◼", "⊞"],
    subliminals: [
      "I am deeply rooted", "Earth supports me completely", "I am safe and protected",
      "Stability is my foundation", "I stand on solid ground", "Gravity holds me with love",
      "My roots run deep", "I am anchored in the present", "The earth nourishes me"
    ],
    breathCycle: 12,
    motionStyle: "settling",
    glowColor: "rgba(139,69,19,0.3)"
  }
};

// ── Sacred Geometry Renderers ──────────────────────────────────
const drawFlowerOfLife = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;

  const breathe = 1 + Math.sin(time * 0.5) * 0.05;
  const r = radius * breathe;

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // First ring: 6 circles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + time * 0.1;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Second ring: 12 circles
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + time * 0.05;
    const x = cx + Math.cos(angle) * r * 1.732;
    const y = cy + Math.sin(angle) * r * 1.732;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Third ring: 18 circles  
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 - time * 0.03;
    const x = cx + Math.cos(angle) * r * 2.65;
    const y = cy + Math.sin(angle) * r * 2.65;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
};

const drawSriYantra = (ctx, cx, cy, size, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  const s = size * (1 + Math.sin(time * 0.3) * 0.03);
  const rot = time * 0.05;

  // Outer circle
  ctx.beginPath();
  ctx.arc(cx, cy, s, 0, Math.PI * 2);
  ctx.stroke();

  // Upward triangles (Shiva - masculine)
  for (let i = 0; i < 4; i++) {
    const scale = 0.95 - i * 0.18;
    const offset = i * 0.04 * s;
    drawTriangle(ctx, cx, cy - offset, s * scale, rot, true);
  }

  // Downward triangles (Shakti - feminine)
  for (let i = 0; i < 5; i++) {
    const scale = 0.9 - i * 0.15;
    const offset = i * 0.035 * s;
    drawTriangle(ctx, cx, cy + offset, s * scale, rot, false);
  }

  // Bindu (center point)
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Lotus petals - outer ring
  drawLotus(ctx, cx, cy, s * 1.1, 16, time);
  drawLotus(ctx, cx, cy, s * 1.25, 8, time);

  // Bhupura (outer square with gates)
  const bh = s * 1.4;
  ctx.strokeRect(cx - bh, cy - bh, bh * 2, bh * 2);

  ctx.restore();
};

const drawTriangle = (ctx, cx, cy, size, rotation, up) => {
  const dir = up ? -1 : 1;
  const h = size * 0.866;
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(rotation) * 0, cy + dir * h * 0.5);
  const pts = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + (up ? -Math.PI / 2 : Math.PI / 2) + rotation;
    pts.push({ x: cx + Math.cos(angle) * size * 0.6, y: cy + Math.sin(angle) * size * 0.6 });
  }
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.stroke();
};

const drawLotus = (ctx, cx, cy, radius, petals, time) => {
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 + time * 0.02;
    const x1 = cx + Math.cos(angle - 0.15) * radius * 0.85;
    const y1 = cy + Math.sin(angle - 0.15) * radius * 0.85;
    const x2 = cx + Math.cos(angle) * radius;
    const y2 = cy + Math.sin(angle) * radius;
    const x3 = cx + Math.cos(angle + 0.15) * radius * 0.85;
    const y3 = cy + Math.sin(angle + 0.15) * radius * 0.85;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x2, y2, x3, y3);
    ctx.stroke();
  }
};

const drawMetatronsCube = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.shadowColor = color;
  ctx.shadowBlur = 5;

  const r = radius * (1 + Math.sin(time * 0.4) * 0.03);
  const rot = time * 0.08;
  const centers = [{ x: cx, y: cy }];

  // Inner ring of 6
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + rot;
    centers.push({ x: cx + Math.cos(angle) * r * 0.5, y: cy + Math.sin(angle) * r * 0.5 });
  }
  // Outer ring of 6
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + rot;
    centers.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  // Draw circles
  centers.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, r * 0.12, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Connect all centers
  ctx.globalAlpha = opacity * 0.4;
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      ctx.beginPath();
      ctx.moveTo(centers[i].x, centers[i].y);
      ctx.lineTo(centers[j].x, centers[j].y);
      ctx.stroke();
    }
  }

  ctx.restore();
};

const drawVesicaPiscis = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  const r = radius * (1 + Math.sin(time * 0.4) * 0.04);
  const offset = r * 0.5;

  // Two overlapping circles
  ctx.beginPath();
  ctx.arc(cx - offset, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + offset, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Fill vesica with gradient
  ctx.globalAlpha = opacity * 0.15;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx - offset, cy, r, -Math.PI / 3, Math.PI / 3);
  ctx.arc(cx + offset, cy, r, Math.PI - Math.PI / 3, Math.PI + Math.PI / 3);
  ctx.fill();

  // Expanding rings from center
  for (let i = 1; i <= 5; i++) {
    ctx.globalAlpha = opacity * 0.15 * (1 - i / 6);
    const ringR = r * 0.3 * i + Math.sin(time + i) * 10;
    ctx.beginPath();
    ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
};

const drawCrystalGrid = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.shadowColor = color;
  ctx.shadowBlur = 4;

  const r = radius;
  const sides = 6;

  for (let ring = 1; ring <= 4; ring++) {
    const ringR = r * (ring / 4) * (1 + Math.sin(time * 0.5 + ring) * 0.02);
    ctx.beginPath();
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2 + time * 0.03;
      const x = cx + Math.cos(angle) * ringR;
      const y = cy + Math.sin(angle) * ringR;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Radial lines
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2 + time * 0.03;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }
  }

  // Center crystal
  ctx.globalAlpha = opacity * 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
};

const drawFractalBloom = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  const drawBranch = (x, y, length, angle, depth) => {
    if (depth <= 0 || length < 3) return;
    const nx = x + Math.cos(angle) * length;
    const ny = y + Math.sin(angle) * length;
    ctx.globalAlpha = opacity * (depth / 7);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    const spread = 0.4 + Math.sin(time * 0.3 + depth) * 0.15;
    drawBranch(nx, ny, length * 0.7, angle - spread, depth - 1);
    drawBranch(nx, ny, length * 0.7, angle + spread, depth - 1);
  };

  const branches = 6;
  for (let i = 0; i < branches; i++) {
    const angle = (i / branches) * Math.PI * 2 + time * 0.05;
    drawBranch(cx, cy, radius * 0.3, angle, 7);
  }

  ctx.restore();
};

const drawChakraColumn = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  const chakraColors = ["#FF0000", "#FF8C00", "#FFD700", "#00FF00", "#00BFFF", "#4B0082", "#8A2BE2"];
  const chakraY = [];
  const columnHeight = radius * 2.2;
  const startY = cy + columnHeight / 2;

  for (let i = 0; i < 7; i++) {
    const y = startY - (i / 6) * columnHeight;
    chakraY.push(y);
    const active = Math.sin(time * 0.5 - i * 0.5) * 0.5 + 0.5;
    const r = 12 + active * 15;

    ctx.globalAlpha = 0.3 + active * 0.5;
    ctx.fillStyle = chakraColors[i];
    ctx.shadowColor = chakraColors[i];
    ctx.shadowBlur = 15 + active * 20;
    ctx.beginPath();
    ctx.arc(cx, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Spinning petals
    const petals = [4, 6, 10, 12, 16, 2, 1000][i];
    ctx.strokeStyle = chakraColors[i];
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3 * active;
    if (petals < 100) {
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2 + time * (0.2 + i * 0.1);
        const px = cx + Math.cos(angle) * (r + 10);
        const py = y + Math.sin(angle) * (r + 10);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  // Ascending energy (kundalini serpent)
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = opacity * 0.6;
  ctx.beginPath();
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const y = startY - t * columnHeight;
    const wave = Math.sin(t * Math.PI * 3 + time * 2) * 25 * (1 - t * 0.5);
    if (i === 0) ctx.moveTo(cx + wave, y);
    else ctx.lineTo(cx + wave, y);
  }
  ctx.stroke();

  ctx.restore();
};

const drawHexGrid = (ctx, cx, cy, radius, time, color, opacity) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.shadowColor = color;
  ctx.shadowBlur = 3;

  const hexSize = 28;
  const rows = 9;
  const cols = 11;

  for (let row = -Math.floor(rows/2); row <= Math.floor(rows/2); row++) {
    for (let col = -Math.floor(cols/2); col <= Math.floor(cols/2); col++) {
      const x = cx + col * hexSize * 1.5;
      const y = cy + row * hexSize * 1.732 + (col % 2 ? hexSize * 0.866 : 0);
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist > radius) continue;

      const pulse = Math.sin(time * 0.5 - dist * 0.01) * 0.3 + 0.7;
      ctx.globalAlpha = opacity * pulse * (1 - dist / radius);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const hx = x + Math.cos(angle) * hexSize * 0.5;
        const hy = y + Math.sin(angle) * hexSize * 0.5;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  ctx.restore();
};

// ── Geometry Dispatcher ────────────────────────────────────────
const GEOMETRY_RENDERERS = {
  flower_of_life: drawFlowerOfLife,
  sri_yantra: drawSriYantra,
  metatrons_cube: drawMetatronsCube,
  vesica_piscis: drawVesicaPiscis,
  crystal_grid: drawCrystalGrid,
  fractal_bloom: drawFractalBloom,
  chakra_column: drawChakraColumn,
  hex_grid: drawHexGrid,
};

// ── Particle System ────────────────────────────────────────────
class Particle {
  constructor(cx, cy, radius, behavior) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.behavior = behavior;
    this.reset();
  }

  reset() {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * this.radius;
    this.x = this.cx + Math.cos(angle) * dist;
    this.y = this.cy + Math.sin(angle) * dist;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.life = 1.0;
    this.decay = 0.001 + Math.random() * 0.003;
    this.size = 1 + Math.random() * 2.5;
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitSpeed = 0.005 + Math.random() * 0.015;
    this.orbitRadius = 30 + Math.random() * (this.radius * 0.6);
  }

  update(time) {
    this.life -= this.decay;
    if (this.life <= 0) this.reset();

    switch (this.behavior) {
      case "orbital":
        this.orbitAngle += this.orbitSpeed;
        this.x = this.cx + Math.cos(this.orbitAngle) * this.orbitRadius;
        this.y = this.cy + Math.sin(this.orbitAngle) * this.orbitRadius;
        break;
      case "expansion":
        this.x += this.vx * 1.5;
        this.y += this.vy * 1.5;
        this.vx *= 1.001;
        this.vy *= 1.001;
        break;
      case "ascending":
        this.y -= 0.5 + Math.random() * 0.5;
        this.x += Math.sin(time + this.orbitAngle) * 0.3;
        break;
      case "enfolding":
        const angle = Math.atan2(this.y - this.cy, this.x - this.cx);
        const dist = Math.sqrt((this.x - this.cx) ** 2 + (this.y - this.cy) ** 2);
        const targetDist = this.orbitRadius * (0.5 + Math.sin(time * 0.3) * 0.3);
        this.x += Math.cos(angle + 0.02) * (targetDist - dist) * 0.01;
        this.y += Math.sin(angle + 0.02) * (targetDist - dist) * 0.01;
        break;
      case "converging":
        const dx = this.cx - this.x;
        const dy = this.cy - this.y;
        this.x += dx * 0.002;
        this.y += dy * 0.002;
        this.x += Math.sin(time * 2 + this.orbitAngle) * 0.3;
        break;
      case "branching":
        this.x += this.vx + Math.sin(time + this.orbitAngle) * 0.5;
        this.y += this.vy + Math.cos(time * 0.7 + this.orbitAngle) * 0.5;
        break;
      case "ascending_spiral":
        this.orbitAngle += this.orbitSpeed * 2;
        this.y -= 0.4;
        this.x = this.cx + Math.cos(this.orbitAngle) * (20 + (this.cy - this.y) * 0.05);
        break;
      case "settling":
        this.vy += 0.01;
        this.y += this.vy;
        this.x += Math.sin(time + this.orbitAngle) * 0.2;
        if (this.y > this.cy + this.radius) this.reset();
        break;
      default:
        this.x += this.vx;
        this.y += this.vy;
    }
  }
}

// ── Main Component ─────────────────────────────────────────────
export default function DigitalAlchemyStudio() {
  const [selectedIntention, setSelectedIntention] = useState("healing");
  const [isActive, setIsActive] = useState(false);
  const [showSubliminals, setShowSubliminals] = useState(true);
  const [entrainmentDepth, setEntrainmentDepth] = useState(0.12);
  const [elapsed, setElapsed] = useState(0);
  const [subliminalFlash, setSubliminalFlash] = useState("");
  const [breathPhase, setBreathPhase] = useState(0); // 0–1
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const config = INTENTIONS[selectedIntention];

  // Initialize particles when intention changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) * 0.8;
    particlesRef.current = Array.from({ length: 200 }, () => new Particle(cx, cy, radius, config.particleBehavior));
  }, [selectedIntention, config.particleBehavior]);

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    if (!startTimeRef.current) startTimeRef.current = performance.now();
    const time = (performance.now() - startTimeRef.current) / 1000;
    setElapsed(time);

    // ── Entrainment modulation ──
    const entrainment = 1 + Math.sin(2 * Math.PI * config.entrainmentHz * time) * entrainmentDepth;

    // ── Breath phase ──
    const breathT = (time % config.breathCycle) / config.breathCycle;
    setBreathPhase(breathT);

    // ── Layer 0: Background ──
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
    grad.addColorStop(0, config.colors.bg3);
    grad.addColorStop(0.5, config.colors.bg2);
    grad.addColorStop(1, config.colors.bg1);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // ── Entrainment luminosity overlay ──
    ctx.fillStyle = `rgba(255,255,255,${(entrainment - 1 + entrainmentDepth) * 0.3})`;
    ctx.fillRect(0, 0, W, H);

    // ── Layer 1: Glow ──
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250);
    glowGrad.addColorStop(0, config.glowColor);
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // ── Layer 2: Sacred Geometry ──
    const geoRadius = Math.min(W, H) * 0.32;
    const renderer = GEOMETRY_RENDERERS[config.geometry];
    if (renderer) {
      renderer(ctx, cx, cy, geoRadius, time, config.colors.primary, 0.7 * entrainment);
      // Ghost echo at lower opacity
      renderer(ctx, cx, cy, geoRadius * 1.1, time * 0.7, config.colors.secondary, 0.15);
    }

    // ── Layer 3: Particles ──
    ctx.save();
    particlesRef.current.forEach(p => {
      p.update(time);
      ctx.globalAlpha = p.life * 0.6;
      ctx.fillStyle = config.colors.primary;
      ctx.shadowColor = config.colors.primary;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // ── Layer 4: Subliminal text ──
    if (showSubliminals) {
      const sublimRate = 0.4;
      if (Math.random() < sublimRate / 60) {
        const msg = config.subliminals[Math.floor(Math.random() * config.subliminals.length)];
        setSubliminalFlash(msg);
        ctx.save();
        ctx.globalAlpha = 0.035;
        ctx.font = "14px Georgia, serif";
        ctx.fillStyle = config.colors.secondary;
        const x = Math.random() * (W - 200) + 20;
        const y = Math.random() * (H - 40) + 20;
        ctx.fillText(msg, x, y);
        ctx.restore();
      }
    }

    // ── Layer 5: Subliminal symbols ──
    if (Math.random() < 0.03) {
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.font = "24px serif";
      ctx.fillStyle = config.colors.accent;
      const symbol = config.symbols[Math.floor(Math.random() * config.symbols.length)];
      ctx.fillText(symbol, Math.random() * W, Math.random() * H);
      ctx.restore();
    }

    // ── Layer 6: Outer vignette ──
    const vigGrad = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.3, cx, cy, Math.max(W, H) * 0.7);
    vigGrad.addColorStop(0, "transparent");
    vigGrad.addColorStop(1, "rgba(0,0,0,0.6)");
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, W, H);

    animFrameRef.current = requestAnimationFrame(render);
  }, [config, showSubliminals, entrainmentDepth]);

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = null;
      animFrameRef.current = requestAnimationFrame(render);
      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  }, [isActive, render]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const breathLabel = breathPhase < 0.45 ? "INHALE" : breathPhase < 0.55 ? "HOLD" : "EXHALE";
  const breathProgress = breathPhase < 0.45 ? breathPhase / 0.45 : breathPhase < 0.55 ? 1 : 1 - (breathPhase - 0.55) / 0.45;

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', 'Garamond', 'Georgia', serif", color: "#e0e0e0", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Top Bar ── */}
      {!isActive && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)", padding: "20px 30px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: config.colors.primary, boxShadow: `0 0 12px ${config.colors.primary}` }} />
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 300, letterSpacing: 6, textTransform: "uppercase", color: "#aaa" }}>
              Digital Alchemy Studio
            </h1>
          </div>
          <p style={{ margin: "4px 0 0 20px", fontSize: 12, letterSpacing: 3, color: "#666", textTransform: "uppercase" }}>
            Consciousness Engineering Engine
          </p>
        </div>
      )}

      {/* ── Canvas ── */}
      <div style={{ flex: 1, position: "relative" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Intention title overlay when active */}
        {isActive && (
          <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10, pointerEvents: "none" }}>
            <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: 4, color: config.colors.primary, textShadow: `0 0 20px ${config.colors.primary}`, opacity: 0.7 }}>
              {config.title}
            </div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#888", marginTop: 4 }}>
              {config.subtitle}
            </div>
          </div>
        )}

        {/* Breath guide when active */}
        {isActive && (
          <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10, pointerEvents: "none" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", border: `1px solid ${config.colors.primary}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", transform: `scale(${0.7 + breathProgress * 0.6})`, transition: "transform 0.3s ease", boxShadow: `0 0 ${breathProgress * 20}px ${config.colors.primary}30` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: config.colors.primary, opacity: 0.6, textTransform: "uppercase" }}>
                {breathLabel}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 2 }}>{formatTime(elapsed)}</div>
          </div>
        )}

        {/* Active controls */}
        {isActive && (
          <button onClick={() => setIsActive(false)} style={{ position: "absolute", top: 20, right: 20, zIndex: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#888", padding: "6px 16px", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            ✕ End
          </button>
        )}
      </div>

      {/* ── Control Panel ── */}
      {!isActive && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20, background: "linear-gradient(to top, rgba(0,0,0,0.95) 60%, transparent)", padding: "60px 30px 30px" }}>

          {/* Intention Grid */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#666", textTransform: "uppercase", marginBottom: 10 }}>Select Intention</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(INTENTIONS).map(([key, val]) => (
                <button key={key} onClick={() => setSelectedIntention(key)} style={{
                  background: selectedIntention === key ? `${val.colors.primary}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedIntention === key ? val.colors.primary + "60" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 6, padding: "8px 14px", cursor: "pointer", color: selectedIntention === key ? val.colors.primary : "#888",
                  fontSize: 12, letterSpacing: 1, textTransform: "capitalize", transition: "all 0.3s",
                  boxShadow: selectedIntention === key ? `0 0 15px ${val.colors.primary}15` : "none"
                }}>
                  {key.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Info + Controls */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 300, color: config.colors.primary, letterSpacing: 2, marginBottom: 2 }}>
                {config.title}
              </div>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2 }}>{config.subtitle}</div>

              {/* Sliders */}
              <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
                <label style={{ fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase" }}>
                  Entrainment Depth
                  <input type="range" min="0" max="0.25" step="0.01" value={entrainmentDepth} onChange={e => setEntrainmentDepth(+e.target.value)} style={{ display: "block", width: 120, marginTop: 4, accentColor: config.colors.primary }} />
                </label>
                <label style={{ fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={showSubliminals} onChange={e => setShowSubliminals(e.target.checked)} style={{ accentColor: config.colors.primary }} />
                  Subliminal Layer
                </label>
              </div>
            </div>

            {/* Begin Button */}
            <button onClick={() => setIsActive(true)} style={{
              background: `linear-gradient(135deg, ${config.colors.primary}30, ${config.colors.primary}10)`,
              border: `1px solid ${config.colors.primary}40`,
              borderRadius: 8, padding: "14px 36px", cursor: "pointer",
              color: config.colors.primary, fontSize: 14, letterSpacing: 4, textTransform: "uppercase",
              fontFamily: "inherit", fontWeight: 300,
              boxShadow: `0 0 30px ${config.colors.primary}15`,
              transition: "all 0.3s"
            }}>
              ◉ Begin Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
