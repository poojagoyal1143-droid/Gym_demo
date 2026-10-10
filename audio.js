/**
 * PRIME FITHIT — ATHLETIC SANCTUARY
 * Haute Parisian Acoustic Audio Synthesizer (Web Audio API)
 * Procedural cello harmonics, velvet sub-bass resonance, and brushed brass acoustic clicks.
 * Zero external audio dependencies.
 */

class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initialized = false;
    this.onStateChangeCallbacks = [];
  }

  init() {
    if (this.initialized && this.ctx && this.ctx.state === 'running') return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.initialized = true;
      this.notifyState();
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  toggleMute() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playLuxuryClick();
    }
    this.notifyState();
    return this.enabled;
  }

  onStateChange(cb) {
    this.onStateChangeCallbacks.push(cb);
  }

  notifyState() {
    this.onStateChangeCallbacks.forEach(cb => cb({
      enabled: this.enabled,
      initialized: this.initialized,
      state: this.ctx ? this.ctx.state : 'uninitialized'
    }));
  }

  // 1. Acoustic Cello Harmonic Swell into Velvet Sub-Bass Impact (L'Éveil entrance)
  playSanctuaryResonance() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Master output bus with warm low-pass filter (analog warmth)
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(320, t);
      masterFilter.frequency.exponentialRampToValueAtTime(1400, t + 0.55);
      masterFilter.frequency.exponentialRampToValueAtTime(450, t + 1.8);

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, t);
      masterGain.gain.exponentialRampToValueAtTime(0.38, t + 0.35);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

      masterFilter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      // Cello Root Harmonic (C2 = 65.41 Hz) - Sawtooth for bowed string richness
      const celloRoot = this.ctx.createOscillator();
      const celloRootGain = this.ctx.createGain();
      celloRoot.type = 'sawtooth';
      celloRoot.frequency.setValueAtTime(65.41, t);
      celloRootGain.gain.setValueAtTime(0.24, t);
      celloRoot.connect(celloRootGain);
      celloRootGain.connect(masterFilter);
      celloRoot.start(t);
      celloRoot.stop(t + 2.1);

      // Cello Fifth Harmonic (G2 = 98.0 Hz) - Triangle for hollow wooden body
      const celloFifth = this.ctx.createOscillator();
      const celloFifthGain = this.ctx.createGain();
      celloFifth.type = 'triangle';
      celloFifth.frequency.setValueAtTime(98.0, t);
      celloFifthGain.gain.setValueAtTime(0.22, t);
      celloFifth.connect(celloFifthGain);
      celloFifthGain.connect(masterFilter);
      celloFifth.start(t + 0.05);
      celloFifth.stop(t + 2.1);

      // Cello Octave Harmonic (C3 = 130.81 Hz) - Sine
      const celloOct = this.ctx.createOscillator();
      const celloOctGain = this.ctx.createGain();
      celloOct.type = 'sine';
      celloOct.frequency.setValueAtTime(130.81, t);
      celloOctGain.gain.setValueAtTime(0.18, t);
      celloOct.connect(celloOctGain);
      celloOctGain.connect(masterFilter);
      celloOct.start(t + 0.1);
      celloOct.stop(t + 1.9);

      // Deep Velvet Sub-Bass Drop (42 Hz settling)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(85, t + 0.25);
      subOsc.frequency.exponentialRampToValueAtTime(42, t + 0.7);

      subGain.gain.setValueAtTime(0.001, t + 0.25);
      subGain.gain.exponentialRampToValueAtTime(0.42, t + 0.45);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(t + 0.25);
      subOsc.stop(t + 2.05);

      // Hairline Shimmer (High-frequency champagne crystal breath)
      const shimmerOsc = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmerOsc.type = 'sine';
      shimmerOsc.frequency.setValueAtTime(2637, t + 0.08); // E7
      shimmerOsc.frequency.exponentialRampToValueAtTime(1318, t + 0.6);

      shimmerGain.gain.setValueAtTime(0.06, t + 0.08);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(this.ctx.destination);
      shimmerOsc.start(t + 0.08);
      shimmerOsc.stop(t + 0.85);

    } catch (e) {
      console.warn("playSanctuaryResonance error:", e);
    }
  }

  // 2. Silk Drapery Unveil (Deep acoustic air displacement)
  playDraperyReveal() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Soft air displacement swoosh
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);
      filter.frequency.exponentialRampToValueAtTime(750, t + 0.4);
      filter.frequency.exponentialRampToValueAtTime(120, t + 1.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);

      const bufferSize = this.ctx.sampleRate * 1.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + 1.35);

      // Low end resonance
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(60, t);
      sub.frequency.exponentialRampToValueAtTime(32, t + 0.8);

      subGain.gain.setValueAtTime(0.22, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(t);
      sub.stop(t + 0.95);

    } catch (e) {
      console.warn("playDraperyReveal error:", e);
    }
  }

  // 3. Delicate Haute Editorial Hover (Muted Crystal Brass)
  playLuxuryHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, t); // A6
      osc.frequency.exponentialRampToValueAtTime(2200, t + 0.025);

      gain.gain.setValueAtTime(0.025, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  // 4. Polished Brass Interaction Click
  playLuxuryClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Soft metallic strike
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(940, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.04);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);

      // High harmonic touch
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(2489, t); // D#7
      bellGain.gain.setValueAtTime(0.04, t);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);

      bell.start(t);
      bell.stop(t + 0.14);

    } catch (e) {}
  }

  // 5. Two-Note Champagne Brass Chime (Tier change & discipline selection)
  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, t);

      gain1.gain.setValueAtTime(0.08, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.5);

      // Note 2: B5 (987.77 Hz) - 80ms delay
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, t + 0.09);

      gain2.gain.setValueAtTime(0.07, t + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.09);
      osc2.stop(t + 0.7);

    } catch (e) {}
  }
}

// Global Luxury Audio Instance
window.fithitAudio = new LuxuryAudioEngine();
