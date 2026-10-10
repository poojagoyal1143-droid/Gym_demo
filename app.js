/**
 * PRIME FITHIT — L'ATELIER ATHLÉTIQUE (OMEGA CITY, KHARAR)
 * High-Luxury Parisian Editorial Client-Side Experience
 * Pure Quiet Luxury, Zero Gamification, Zero Sci-Fi.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure Audio Engine is available
  const audio = window.fithitAudio;

  initEntranceExperience(audio);
  initHeaderInteractions(audio);
  initDisciplineMuseumTilt(audio);
  initRythmeScrubber(audio);
  initPrivilegePricingToggle(audio);
  initLuxuryAcousticBindings(audio);
});

/* ==========================================================================
   1. THE SIGNATURE FRENCH EDITORIAL ENTRANCE (L'ÉVEIL)
   ========================================================================== */

function initEntranceExperience(audio) {
  const laPorte = document.getElementById('la-porte');
  const enterBtn = document.getElementById('enter-sanctuary-btn');
  const skipBtn = document.getElementById('skip-intro-btn');
  const mistCanvas = document.getElementById('mist-canvas');

  if (!laPorte) return;

  // Initialize Champagne Mist Particles Canvas
  let mistEngine = null;
  if (mistCanvas) {
    mistEngine = new ChampagneMistCanvas(mistCanvas);
    mistEngine.start();
  }

  // Magnetic cursor attraction on the entrance button
  if (enterBtn) {
    enterBtn.addEventListener('mousemove', (e) => {
      const rect = enterBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      enterBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    enterBtn.addEventListener('mouseleave', () => {
      enterBtn.style.transform = 'translate(0px, 0px)';
    });

    // Enter Sanctuary Trigger
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      unlockSanctuary();
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      instantDissolve();
    });
  }

  function unlockSanctuary() {
    // 1. Synthesize procedural acoustic cello harmonic & sub-bass resonance
    if (audio) {
      audio.playSanctuaryResonance();
    }

    // 2. Stage B: Typographic Fracture & Slicing Hairline
    laPorte.classList.add('sliced');
    laPorte.classList.add('fractured');

    if (mistEngine) {
      mistEngine.dissipate();
    }

    // 3. Stage C: Silk Velvet Drapery Unveil (after 450ms)
    setTimeout(() => {
      if (audio) {
        audio.playDraperyReveal();
      }
      laPorte.classList.add('curtain-parted');
    }, 450);

    // 4. Complete dissolution (after 1450ms)
    setTimeout(() => {
      laPorte.classList.add('dissolved');
      if (mistEngine) {
        mistEngine.stop();
      }
      document.body.style.overflowY = 'auto';
    }, 1500);
  }

  function instantDissolve() {
    if (audio) {
      audio.playChime();
    }
    laPorte.classList.add('dissolved');
    if (mistEngine) {
      mistEngine.stop();
    }
    document.body.style.overflowY = 'auto';
  }
}

/* ==========================================================================
   CHAMPAGNE MIST CANVAS SYSTEM
   ========================================================================== */

class ChampagneMistCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.running = false;
    this.isDissipating = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles(75);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  start() {
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    this.running = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  dissipate() {
    this.isDissipating = true;
    this.particles.forEach(p => {
      p.speedX *= 5;
      p.speedY *= 4;
      p.radius *= 1.4;
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.speedX;
      p.y += p.speedY;
      p.pulseVal += p.pulseSpeed;

      if (this.isDissipating) {
        p.alpha -= 0.015;
      }

      // Wrap edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;

      const currentAlpha = Math.max(0, p.alpha * (0.8 + Math.sin(p.pulseVal) * 0.2));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(197, 168, 128, ${currentAlpha})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(197, 168, 128, 0.5)';
      this.ctx.fill();
    }
  }
}

/* ==========================================================================
   2. HAUTE EDITORIAL NAVIGATION & CONCIERGE BAR
   ========================================================================== */

function initHeaderInteractions(audio) {
  const header = document.getElementById('haute-header');
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioLabel = document.getElementById('audio-toggle-label');

  // Header background tint on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Atmospheric Audio Toggle
  if (audioBtn && audio) {
    audioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isEnabled = audio.toggleMute();
      if (audioLabel) {
        audioLabel.textContent = isEnabled ? 'ATMOSPHÈRE [ACTIF]' : 'ATMOSPHÈRE [MUET]';
      }
    });

    audio.onStateChange((state) => {
      if (audioLabel) {
        audioLabel.textContent = state.enabled ? 'ATMOSPHÈRE [ACTIF]' : 'ATMOSPHÈRE [MUET]';
      }
    });
  }
}

/* ==========================================================================
   3. LES DISCIPLINES (MUSEUM GALLERY CARDS WITH NATURAL TILT)
   ========================================================================== */

function initDisciplineMuseumTilt(audio) {
  const cards = document.querySelectorAll('.discipline-card[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });

    card.addEventListener('mouseenter', () => {
      if (audio) {
        audio.playLuxuryHover();
      }
    });
  });
}

/* ==========================================================================
   4. RYTHME DU SANCTUAIRE (CROWD & PEAK HOURS SCRUBBER)
   ========================================================================== */

function initRythmeScrubber(audio) {
  const rangeInput = document.getElementById('rythme-range-input');
  const timeDisplay = document.getElementById('scrubber-time-val');
  const statusLabel = document.getElementById('scrubber-status-label');
  const insightText = document.getElementById('scrubber-insight-text');

  const moment12 = document.getElementById('moment-12');
  const moment19 = document.getElementById('moment-19');

  if (!rangeInput) return;

  const rhythms = {
    6: {
      status: "AUBE SEREINE // MORNING RITUAL",
      insight: "06:00 — Ouverture de l'Atelier. Ambiance feutrée et lumière dorée rasante. Idéal pour les séances de force fondamentale dans le calme le plus complet."
    },
    7: {
      status: "AUBE SEREINE // MORNING RITUAL",
      insight: "07:00 — Éveil musculaire progressif. Patrons matinaux et séances d'activation articulaire."
    },
    8: {
      status: "ACTIVITÉ MODÉRÉE // MORNING COMMUTE",
      insight: "08:00 — Énergie matinale stable. Machines libres et rythme calme."
    },
    9: {
      status: "ACTIVITÉ MODÉRÉE // REGULAR MORNING",
      insight: "09:00 — Ambiance aérée. Les bancs de développé couché et les stations à poulies restent immédiatement accessibles."
    },
    10: {
      status: "SÉRÉNITÉ CONSTANTE // MID-DAY FOCUS",
      insight: "10:00 — Session fluide sans attente. Excellente plage pour les programmes d'hypertrophie ciblée."
    },
    11: {
      status: "SÉRÉNITÉ CONSTANTE // PRE-NOON LULL",
      insight: "11:00 — Calme remarquable dans l'ensemble des pavillons."
    },
    12: {
      status: "SÉRÉNITÉ ABSOLUE // QUIET HOUR FAVOURITE",
      insight: "12:00 — L'Heure Paisible par excellence. Très prisée par les étudiants de Chandigarh University entre deux cours pour un entraînement concentré sans aucune interruption."
    },
    13: {
      status: "SÉRÉNITÉ ABSOLUE // POST-NOON QUIET",
      insight: "13:00 — Atmosphère apaisée. Espace de turf entièrement dégagé pour les exercices de mobilité et traîneaux légers."
    },
    14: {
      status: "SÉRÉNITÉ CONSTANTE // MID-AFTERNOON",
      insight: "14:00 — Silence et concentration. Les coachs sont disponibles pour les bilans biomécaniques posturaux."
    },
    15: {
      status: "TRANSITION PROGRESSIVE // AFTERNOON FLOW",
      insight: "15:00 — Reprise douce de la fréquentation. Température idéale et circulation optimale."
    },
    16: {
      status: "TRANSITION ÉNERGÉTIQUE // PRE-EVENING",
      insight: "16:00 — Arrivée des premiers étudiants de Chandigarh University après les cours magistraux."
    },
    17: {
      status: "ACTIVITÉ SOUTENUE // EARLY EVENING",
      insight: "17:00 — Dynamique stimulante. Les barres olympiques et le turf se réchauffent."
    },
    18: {
      status: "HAUTE INTENSITÉ // PRIME EVENING",
      insight: "18:00 — Montée en puissance de la session du soir. Esprit d'émulation collective et discipline rigoureuse."
    },
    19: {
      status: "ÉNERGIE ABSOLUE // PEAK EVENING SESSION",
      insight: "19:00 — L'Heure d'Énergie Absolue. Le sanctuaire vibre à plein régime. Les athlètes de Kharar et CU se surpassent sur les charges lourdes et le turf."
    },
    20: {
      status: "HAUTE INTENSITÉ // EVENING COOLDOWN",
      insight: "20:00 — Fin de session intense. Descente progressive vers les étirements et le reconditionnement."
    },
    21: {
      status: "CLÔTURE FEUTRÉE // LATE NIGHT FOCUS",
      insight: "21:00 — Énergie nocturne feutrée. Idéal pour les noctambules et les étudiants révisant tardivement."
    },
    22: {
      status: "FERMETURE DU SANCTUAIRE // DAILY CLOSING",
      insight: "22:00 — Extinction des feux de l'Atelier. Préparation et assainissement intégral des installations pour le lendemain matin."
    }
  };

  function updateScrubber(hour) {
    const data = rhythms[hour] || rhythms[12];
    if (timeDisplay) timeDisplay.textContent = `${hour < 10 ? '0' + hour : hour}:00`;
    if (statusLabel) statusLabel.textContent = data.status;
    if (insightText) insightText.textContent = data.insight;

    // Toggle moments active state
    if (moment12) moment12.classList.toggle('active', hour === 12);
    if (moment19) moment19.classList.toggle('active', hour === 19);
  }

  let lastHour = 12;
  rangeInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (val !== lastHour) {
      lastHour = val;
      if (audio) audio.playLuxuryClick();
    }
    updateScrubber(val);
  });

  // Clicking signature cards jumps the scrubber
  if (moment12) {
    moment12.addEventListener('click', () => {
      rangeInput.value = 12;
      updateScrubber(12);
      if (audio) audio.playChime();
    });
  }

  if (moment19) {
    moment19.addEventListener('click', () => {
      rangeInput.value = 19;
      updateScrubber(19);
      if (audio) audio.playChime();
    });
  }
}

/* ==========================================================================
   5. ADHÉSIONS & PRIVILÈGES (PRICING TIERS WITH CU STUDENT PASS TOGGLE)
   ========================================================================== */

function initPrivilegePricingToggle(audio) {
  const btnGeneral = document.getElementById('btn-toggle-general');
  const btnStudent = document.getElementById('btn-toggle-student');

  const price1 = document.getElementById('price-val-1');
  const price2 = document.getElementById('price-val-2');
  const price3 = document.getElementById('price-val-3');

  const cta1 = document.getElementById('cta-tier-1');
  const cta2 = document.getElementById('cta-tier-2');
  const cta3 = document.getElementById('cta-tier-3');

  if (!btnGeneral || !btnStudent) return;

  btnGeneral.addEventListener('click', () => {
    btnGeneral.classList.add('active');
    btnGeneral.setAttribute('aria-selected', 'true');
    btnStudent.classList.remove('active');
    btnStudent.setAttribute('aria-selected', 'false');

    if (price1) price1.textContent = '₹1,800';
    if (price2) price2.textContent = '₹8,500';
    if (price3) price3.textContent = '₹14,000';

    if (cta1) cta1.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20souhaite%20souscrire%20%C3%A0%20l%27Acc%C3%A8s%20Mensuel%20(Tarif%20G%C3%A9n%C3%A9ral).";
    if (cta2) cta2.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20souhaite%20souscrire%20au%20Privil%C3%A8ge%20Semestriel%20(Tarif%20G%C3%A9n%C3%A9ral).";
    if (cta3) cta3.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20souhaite%20rejoindre%20le%20Cercle%20Annuel%20%C3%89lite%20(Tarif%20G%C3%A9n%C3%A9ral).";

    if (audio) audio.playChime();
  });

  btnStudent.addEventListener('click', () => {
    btnStudent.classList.add('active');
    btnStudent.setAttribute('aria-selected', 'true');
    btnGeneral.classList.remove('active');
    btnGeneral.setAttribute('aria-selected', 'false');

    if (price1) price1.textContent = '₹1,500';
    if (price2) price2.textContent = '₹7,200';
    if (price3) price3.textContent = '₹12,000';

    if (cta1) cta1.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20suis%20%C3%A9tudiant%20%C3%A0%20Chandigarh%20University%20et%20je%20souhaite%20souscrire%20au%20Pass%20Mensuel%20CU%20(%E2%82%B91,500).";
    if (cta2) cta2.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20suis%20%C3%A9tudiant%20%C3%A0%20Chandigarh%20University%20et%20je%20souhaite%20r%C3%A9server%20le%20Pass%20Semestriel%20CU%20(%E2%82%B97,200).";
    if (cta3) cta3.href = "https://wa.me/91837800084?text=Bonjour%20Concierge,%20je%20suis%20%C3%A9tudiant%20%C3%A0%20Chandigarh%20University%20et%20je%20souhaite%20le%20Cercle%20Annuel%20%C3%89tudiant%20CU%20(%E2%82%B912,000).";

    if (audio) audio.playChime();
  });
}

/* ==========================================================================
   6. HAUTE EDITORIAL ACOUSTIC SOUND BINDINGS
   ========================================================================== */

function initLuxuryAcousticBindings(audio) {
  if (!audio) return;

  // Bind hover acoustics to luxury buttons and links
  const luxuryButtons = document.querySelectorAll('.btn-luxury-primary, .btn-luxury-secondary, .cta-header-pass, .btn-tier-cta, .card-action-link, .floating-concierge');

  luxuryButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      audio.playLuxuryHover();
    });

    btn.addEventListener('click', () => {
      audio.playLuxuryClick();
    });
  });
}
