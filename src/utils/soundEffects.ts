/**
 * Web Audio API synthesizer for retro RPG sound effects.
 * 100% original, licensed-safe, zero external dependencies.
 * Handles audio context suspension and autoplay restrictions safely.
 */

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    return audioCtx;
  } catch {
    return null;
  }
};

/**
 * Short, satisfying RPG-style "stat increased / reward" chime (approx 0.6s).
 * Ascending pleasant harmonic arpeggio (C5 -> E5 -> G5 -> C6).
 */
export const playStatIncreaseSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 659.25, time: 0.08 },   // E5
      { freq: 783.99, time: 0.16 },   // G5
      { freq: 1046.50, time: 0.24 },  // C6
    ];

    notes.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      // Smooth attack & exponential decay
      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.12, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + 0.36);
    });
  } catch {
    // Graceful fallback if audio is blocked
  }
};

/**
 * Celebratory RPG Level-Up Fanfare (approx 1.1s).
 * Resonant rising pentatonic chords with a bright bell overtone.
 */
export const playLevelUpSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 659.25, time: 0.1 },    // E5
      { freq: 783.99, time: 0.2 },    // G5
      { freq: 1046.50, time: 0.3 },   // C6
      { freq: 1318.51, time: 0.42 },  // E6
    ];

    chords.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.15, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + 0.66);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Triumphant Quest Completion Jingle (approx 0.8s).
 * Crisp, positive retro game quest clear chime (G4 -> C5 -> E5 -> G5).
 */
export const playQuestCompleteSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 392.00, time: 0, duration: 0.15 },    // G4
      { freq: 523.25, time: 0.12, duration: 0.15 }, // C5
      { freq: 659.25, time: 0.24, duration: 0.15 }, // E5
      { freq: 783.99, time: 0.38, duration: 0.45 }, // G5 (sustained)
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.18, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration + 0.02);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Triumphant Streak Milestone Fanfare (approx 1.0s).
 * Ascending retro milestone fanfare (F4 -> A4 -> C5 -> F5 -> A5).
 */
export const playStreakMilestoneSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 349.23, time: 0, duration: 0.14 },    // F4
      { freq: 440.00, time: 0.12, duration: 0.14 }, // A4
      { freq: 523.25, time: 0.24, duration: 0.14 }, // C5
      { freq: 698.46, time: 0.38, duration: 0.22 }, // F5
      { freq: 880.00, time: 0.55, duration: 0.45 }, // A5 (sustained peak)
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.18, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration + 0.02);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Triumphant Royal League Promotion Fanfare (approx 1.2s).
 * Ascending royal brass fanfare: C4 -> E4 -> G4 -> C5 -> E5 -> G5.
 */
export const playLeaguePromotedSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 261.63, time: 0, duration: 0.12 },    // C4
      { freq: 329.63, time: 0.10, duration: 0.12 }, // E4
      { freq: 392.00, time: 0.20, duration: 0.14 }, // G4
      { freq: 523.25, time: 0.32, duration: 0.14 }, // C5
      { freq: 659.25, time: 0.44, duration: 0.20 }, // E5
      { freq: 783.99, time: 0.62, duration: 0.55 }, // G5 (sustained glorious chord)
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.16, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration + 0.02);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Retro League Demotion Warning Sound (approx 0.6s).
 * Descending somber retro notes: G4 -> F4 -> Eb4 -> C4.
 */
export const playLeagueDemotedSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 392.00, time: 0, duration: 0.14 },    // G4
      { freq: 349.23, time: 0.12, duration: 0.14 }, // F4
      { freq: 311.13, time: 0.24, duration: 0.16 }, // Eb4
      { freq: 261.63, time: 0.38, duration: 0.30 }, // C4
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.12, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration + 0.02);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Procedural Forest Ambient Sound Engine (Web Audio API)
 * Synthesizes peaceful forest wind breeze, gentle leaves rustle, and intermittent birds chirping.
 */
let forestWindSource: AudioBufferSourceNode | null = null;
let forestWindGain: GainNode | null = null;
let birdChirpInterval: number | null = null;

export const playBirdChirp = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 2200 + Math.random() * 800; // High melodious pitch (2200-3000Hz)
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.25);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.30);
  } catch {
    // Graceful fallback
  }
};

export const startForestAmbience = (volume: number = 0.08) => {
  stopForestAmbience();

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Create a 4-second pink noise buffer for soft leaf breeze
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    // 2. Loop the wind buffer through a low-pass filter
    forestWindSource = ctx.createBufferSource();
    forestWindSource.buffer = buffer;
    forestWindSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    forestWindGain = ctx.createGain();
    forestWindGain.gain.setValueAtTime(0.001, ctx.currentTime);
    forestWindGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    forestWindSource.connect(filter);
    filter.connect(forestWindGain);
    forestWindGain.connect(ctx.destination);

    forestWindSource.start(0);

    // 3. Periodic natural bird chirps
    birdChirpInterval = window.setInterval(() => {
      if (Math.random() > 0.3) {
        playBirdChirp();
        // Occasional double chirp
        if (Math.random() > 0.5) {
          setTimeout(() => playBirdChirp(), 350);
        }
      }
    }, 4500);
  } catch {
    // Graceful fallback
  }
};

export const stopForestAmbience = () => {
  if (forestWindGain && audioCtx) {
    try {
      forestWindGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (forestWindSource) {
          try {
            forestWindSource.stop();
            forestWindSource.disconnect();
          } catch {}
          forestWindSource = null;
        }
      }, 850);
    } catch {}
  }

  if (birdChirpInterval !== null) {
    clearInterval(birdChirpInterval);
    birdChirpInterval = null;
  }
};



