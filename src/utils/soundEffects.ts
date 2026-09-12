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
