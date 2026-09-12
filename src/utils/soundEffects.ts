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


