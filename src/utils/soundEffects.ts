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

/**
 * 🥈 Procedural Silver Village Fantasy Soundtrack & River Ambience (Web Audio API)
 * Peaceful, magical, warm fantasy village theme with harp arpeggios, flute melodies,
 * soft crystal chimes, and a gentle flowing river stream underneath.
 * 100% original, copyright-free, zero external audio assets.
 */
let silverRiverSource: AudioBufferSourceNode | null = null;
let silverRiverGain: GainNode | null = null;
let silverMusicInterval: number | null = null;
let isSilverMusicPlaying = false;

// D Major / B Minor Fantasy Village Pentatonic & Diatonic Melody Notes (Hz)
const SILVER_MELODIES = [
  // Phrase 1: Peaceful Village Morning (D - F# - A - B - A - F# - E - D)
  [
    { f: 587.33, d: 0.5, t: 0 },    // D5
    { f: 739.99, d: 0.5, t: 0.6 },  // F#5
    { f: 880.00, d: 0.8, t: 1.2 },  // A5
    { f: 987.77, d: 0.6, t: 2.1 },  // B5
    { f: 880.00, d: 0.6, t: 2.8 },  // A5
    { f: 739.99, d: 0.5, t: 3.5 },  // F#5
    { f: 659.25, d: 0.6, t: 4.1 },  // E5
    { f: 587.33, d: 1.2, t: 4.8 },  // D5
  ],
  // Phrase 2: Flowing Water & Windmill Breeze (G - B - D - E - D - B - A)
  [
    { f: 783.99, d: 0.6, t: 0 },    // G5
    { f: 987.77, d: 0.6, t: 0.7 },  // B5
    { f: 1174.66, d: 0.9, t: 1.4 }, // D6
    { f: 1318.51, d: 0.6, t: 2.4 }, // E6
    { f: 1174.66, d: 0.7, t: 3.1 }, // D6
    { f: 987.77, d: 0.6, t: 3.9 },  // B5
    { f: 880.00, d: 1.2, t: 4.6 },  // A5
  ],
  // Phrase 3: Village Plaza & Mountain Waterfall (A - C# - E - F# - E - D)
  [
    { f: 880.00, d: 0.5, t: 0 },    // A5
    { f: 1108.73, d: 0.5, t: 0.6 }, // C#6
    { f: 1318.51, d: 0.9, t: 1.2 }, // E6
    { f: 1479.98, d: 0.7, t: 2.2 }, // F#6
    { f: 1318.51, d: 0.6, t: 3.0 }, // E6
    { f: 1174.66, d: 0.6, t: 3.7 }, // D6
    { f: 880.00, d: 1.3, t: 4.4 },  // A5
  ],
];

// Warm Diatonic Pad Chords (D, G, Bm, A)
const SILVER_CHORDS = [
  [293.66, 369.99, 440.00], // D Major (D4, F#4, A4)
  [392.00, 493.88, 587.33], // G Major (G4, B4, D5)
  [246.94, 293.66, 369.99], // B Minor (B3, D4, F#4)
  [220.00, 277.18, 329.63], // A Major (A3, C#4, E4)
];

let phraseIndex = 0;

export const playSilverMusicPhrase = () => {
  const ctx = getAudioContext();
  if (!ctx || !isSilverMusicPlaying) return;

  try {
    const now = ctx.currentTime;
    const phrase = SILVER_MELODIES[phraseIndex % SILVER_MELODIES.length];
    const chord = SILVER_CHORDS[phraseIndex % SILVER_CHORDS.length];
    phraseIndex++;

    // 1. Play Soft Warm Pad Chord
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 1.2);
      gain.gain.linearRampToValueAtTime(0.015, now + 4.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 6.1);
    });

    // 2. Play Melodic Flute/Harp Notes
    phrase.forEach(({ f, d, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + t);

      // Add gentle vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5; // 5.5Hz vibrato
      vibratoGain.gain.value = 3.5;
      vibrato.connect(osc.frequency);
      vibrato.start(now + t);
      vibrato.stop(now + t + d + 0.3);

      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.035, now + t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.3);
    });

    // 3. Occasional Crystal Bell Chime Overtones
    if (Math.random() > 0.4) {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(2349.32, now + 2.0); // D7 high bell

      chimeGain.gain.setValueAtTime(0.0001, now + 2.0);
      chimeGain.gain.linearRampToValueAtTime(0.015, now + 2.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(now + 2.0);
      chimeOsc.stop(now + 3.25);
    }
  } catch {
    // Audio fallback
  }
};

export const startSilverVillageMusic = (volume: number = 0.08) => {
  stopSilverVillageMusic();
  isSilverMusicPlaying = true;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Synthesize Flowing River Stream Noise
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 0.6; // Stream murmur
    }

    silverRiverSource = ctx.createBufferSource();
    silverRiverSource.buffer = buffer;
    silverRiverSource.loop = true;

    // Bandpass filter for crystal flowing water sound
    const streamFilter = ctx.createBiquadFilter();
    streamFilter.type = 'bandpass';
    streamFilter.frequency.setValueAtTime(750, ctx.currentTime);
    streamFilter.Q.setValueAtTime(0.8, ctx.currentTime);

    silverRiverGain = ctx.createGain();
    silverRiverGain.gain.setValueAtTime(0.001, ctx.currentTime);
    silverRiverGain.gain.linearRampToValueAtTime(volume * 0.45, ctx.currentTime + 2.0);

    silverRiverSource.connect(streamFilter);
    streamFilter.connect(silverRiverGain);
    silverRiverGain.connect(ctx.destination);

    silverRiverSource.start(0);

    // 2. Start Fantasy Melody Loop (every 6.2s)
    phraseIndex = 0;
    playSilverMusicPhrase();

    silverMusicInterval = window.setInterval(() => {
      if (isSilverMusicPlaying) {
        playSilverMusicPhrase();
      }
    }, 6200);
  } catch {
    // Audio fallback
  }
};

export const stopSilverVillageMusic = () => {
  isSilverMusicPlaying = false;

  if (silverRiverGain && audioCtx) {
    try {
      silverRiverGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (silverRiverSource) {
          try {
            silverRiverSource.stop();
            silverRiverSource.disconnect();
          } catch {}
          silverRiverSource = null;
        }
      }, 850);
    } catch {}
  }

  if (silverMusicInterval !== null) {
    clearInterval(silverMusicInterval);
    silverMusicInterval = null;
  }
};

/**
 * 🥈 Distinct Silver Village Level Arrival Sound Effect (approx 1.2s).
 * Brilliant crystal silver chime fanfare (A5 -> C#6 -> E6 -> A6 -> C#7)
 * with a shimmering metallic resonance distinct from Bronze Village.
 */
export const playSilverNodeArriveSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 880.00, time: 0, dur: 0.8 },      // A5
      { freq: 1108.73, time: 0.12, dur: 0.85 }, // C#6
      { freq: 1318.51, time: 0.24, dur: 0.9 },  // E6
      { freq: 1760.00, time: 0.36, dur: 1.1 },  // A6
      { freq: 2217.46, time: 0.48, dur: 1.4 },  // C#7 (shimmering silver peak)
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Silver bell attack & sustained ring
      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.14, now + time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });

    // Sub harmonic metallic ring
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'triangle';
    bellOsc.frequency.setValueAtTime(440, now + 0.36);
    bellGain.gain.setValueAtTime(0.0001, now + 0.36);
    bellGain.gain.linearRampToValueAtTime(0.08, now + 0.38);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start(now + 0.36);
    bellOsc.stop(now + 1.25);
  } catch {
    // Audio fallback
  }
};

/**
 * 🥈 Distinct Silver Village Cobblestone & Bridge Step Sound (approx 0.1s).
 */
export const playSilverStepSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio fallback
  }
};

/**
 * 🥈 Distinct Silver Village Grand Fountain Splash Chime (approx 0.6s).
 */
export const playSilverFountainSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Ascending water drop bubble tones
    [1200, 1500, 1850, 2200].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + idx * 0.08 + 0.06);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.2);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Procedural Gold City Royal Soundtrack & Maritime Capital Ambience (Web Audio API)
 * Grand, royal, adventurous, prestigious fantasy capital theme with triumphant brass harmonies,
 * majestic harp arpeggios, cathedral carillon bells, and gentle coastal sea breeze ambience.
 * 100% original, copyright-safe, zero external audio assets.
 */
let goldHarborBreezeSource: AudioBufferSourceNode | null = null;
let goldHarborBreezeGain: GainNode | null = null;
let goldMusicInterval: number | null = null;
let isGoldMusicPlaying = false;

// C Major / G Major / F Major Royal Capital Fanfare & Melodies (Hz)
const GOLD_MELODIES = [
  // Phrase 1: Royal Capital Entrance Fanfare (C5 -> E5 -> G5 -> C6 -> B5 -> G5 -> A5 -> G5)
  [
    { f: 523.25, d: 0.5, t: 0 },    // C5
    { f: 659.25, d: 0.5, t: 0.5 },  // E5
    { f: 783.99, d: 0.7, t: 1.0 },  // G5
    { f: 1046.50, d: 1.1, t: 1.7 }, // C6
    { f: 987.77, d: 0.5, t: 2.8 },  // B5
    { f: 783.99, d: 0.6, t: 3.3 },  // G5
    { f: 880.00, d: 0.8, t: 3.9 },  // A5
    { f: 783.99, d: 1.4, t: 4.7 },  // G5
  ],
  // Phrase 2: Sovereign Grand Plaza & Docks (F5 -> A5 -> C6 -> D6 -> C6 -> A5 -> G5)
  [
    { f: 698.46, d: 0.6, t: 0 },    // F5
    { f: 880.00, d: 0.6, t: 0.6 },  // A5
    { f: 1046.50, d: 0.8, t: 1.2 }, // C6
    { f: 1174.66, d: 1.0, t: 2.0 }, // D6
    { f: 1046.50, d: 0.7, t: 3.0 }, // C6
    { f: 880.00, d: 0.7, t: 3.7 },  // A5
    { f: 783.99, d: 1.3, t: 4.4 },  // G5
  ],
  // Phrase 3: Crown Cathedral Zenith (G5 -> B5 -> D6 -> E6 -> D6 -> C6 -> E6 -> G6)
  [
    { f: 783.99, d: 0.5, t: 0 },    // G5
    { f: 987.77, d: 0.5, t: 0.5 },  // B5
    { f: 1174.66, d: 0.8, t: 1.0 }, // D6
    { f: 1318.51, d: 0.9, t: 1.8 }, // E6
    { f: 1174.66, d: 0.6, t: 2.7 }, // D6
    { f: 1046.50, d: 0.7, t: 3.3 }, // C6
    { f: 1318.51, d: 0.8, t: 4.0 }, // E6
    { f: 1567.98, d: 1.5, t: 4.8 }, // G6 (supreme triumphant peak)
  ],
];

// Rich Royal Majestic Pad Chords (C, G, Am, F)
const GOLD_CHORDS = [
  [261.63, 329.63, 392.00, 523.25], // C Major (C4, E4, G4, C5)
  [196.00, 246.94, 293.66, 392.00], // G Major (G3, B3, D4, G4)
  [220.00, 261.63, 329.63, 440.00], // A Minor (A3, C4, E4, A4)
  [174.61, 220.00, 261.63, 349.23], // F Major (F3, A3, C4, F4)
];

let goldPhraseIndex = 0;

export const playGoldMusicPhrase = () => {
  const ctx = getAudioContext();
  if (!ctx || !isGoldMusicPlaying) return;

  try {
    const now = ctx.currentTime;
    const phrase = GOLD_MELODIES[goldPhraseIndex % GOLD_MELODIES.length];
    const chord = GOLD_CHORDS[goldPhraseIndex % GOLD_CHORDS.length];
    goldPhraseIndex++;

    // 1. Play Royal Majestic Brass & String Pad Chords
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.022, now + 1.0);
      gain.gain.linearRampToValueAtTime(0.016, now + 4.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 6.3);
    });

    // 2. Play Triumphant Horn/Flute Melodic Line
    phrase.forEach(({ f, d, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.042, now + t + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.35);
    });

    // 3. Cathedral Golden Bell Carillon Chimes
    if (Math.random() > 0.3) {
      const bellFreqs = [2093.00, 2637.02, 3135.96]; // C7, E7, G7
      const bellFreq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];

      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellFreq, now + 2.2);

      bellGain.gain.setValueAtTime(0.0001, now + 2.2);
      bellGain.gain.linearRampToValueAtTime(0.02, now + 2.22);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);

      bellOsc.start(now + 2.2);
      bellOsc.stop(now + 3.85);
    }
  } catch {
    // Audio fallback
  }
};

export const startGoldCityMusic = (volume: number = 0.08) => {
  stopGoldCityMusic();
  isGoldMusicPlaying = true;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Synthesize Gentle Coastal Sea Breeze / Harbor Water Noise
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastVal = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastVal = (lastVal + 0.015 * white) / 1.015;
      data[i] = lastVal * 0.5;
    }

    goldHarborBreezeSource = ctx.createBufferSource();
    goldHarborBreezeSource.buffer = buffer;
    goldHarborBreezeSource.loop = true;

    const breezeFilter = ctx.createBiquadFilter();
    breezeFilter.type = 'bandpass';
    breezeFilter.frequency.setValueAtTime(420, ctx.currentTime);
    breezeFilter.Q.setValueAtTime(0.6, ctx.currentTime);

    goldHarborBreezeGain = ctx.createGain();
    goldHarborBreezeGain.gain.setValueAtTime(0.001, ctx.currentTime);
    goldHarborBreezeGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 2.0);

    goldHarborBreezeSource.connect(breezeFilter);
    breezeFilter.connect(goldHarborBreezeGain);
    goldHarborBreezeGain.connect(ctx.destination);

    goldHarborBreezeSource.start(0);

    // 2. Start Royal Music Loop (every 6.4s)
    goldPhraseIndex = 0;
    playGoldMusicPhrase();

    goldMusicInterval = window.setInterval(() => {
      if (isGoldMusicPlaying) {
        playGoldMusicPhrase();
      }
    }, 6400);
  } catch {
    // Audio fallback
  }
};

export const stopGoldCityMusic = () => {
  isGoldMusicPlaying = false;

  if (goldHarborBreezeGain && audioCtx) {
    try {
      goldHarborBreezeGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (goldHarborBreezeSource) {
          try {
            goldHarborBreezeSource.stop();
            goldHarborBreezeSource.disconnect();
          } catch {}
          goldHarborBreezeSource = null;
        }
      }, 850);
    } catch {}
  }

  if (goldMusicInterval !== null) {
    clearInterval(goldMusicInterval);
    goldMusicInterval = null;
  }
};

/**
 * 🥇 Distinct Gold City Level Arrival Sound Effect (approx 1.4s).
 * Grand Imperial Trumpet Fanfare & Shimmering Gold Carillon Bell (C5 -> E5 -> G5 -> C6 -> E6 -> G6).
 */
export const playGoldNodeArriveSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 523.25, time: 0, dur: 0.9 },      // C5
      { freq: 659.25, time: 0.1, dur: 0.9 },    // E5
      { freq: 783.99, time: 0.2, dur: 0.95 },   // G5
      { freq: 1046.50, time: 0.3, dur: 1.1 },   // C6
      { freq: 1318.51, time: 0.42, dur: 1.2 },  // E6
      { freq: 1567.98, time: 0.54, dur: 1.5 },  // G6 (golden crest fanfare)
    ];

    chords.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + time);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.13, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });

    // Golden sparkling glissando bell overtone
    [2093.00, 2637.02, 3135.96].forEach((bfreq, bidx) => {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();

      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(bfreq, now + 0.54 + bidx * 0.08);

      bGain.gain.setValueAtTime(0.0001, now + 0.54 + bidx * 0.08);
      bGain.gain.linearRampToValueAtTime(0.06, now + 0.54 + bidx * 0.08 + 0.015);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      bOsc.connect(bGain);
      bGain.connect(ctx.destination);

      bOsc.start(now + 0.54 + bidx * 0.08);
      bOsc.stop(now + 1.45);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Marble Paver & Pier Footstep Sound (approx 0.09s).
 */
export const playGoldStepSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420 + Math.random() * 90, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Supreme Palace Cathedral Chime (approx 1.5s).
 */
export const playGoldPalaceChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50, 1567.98].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0.0001, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 1.25);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Gilded Lion Fountain Splash Chime (approx 0.7s).
 */
export const playGoldFountainSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [1300, 1650, 1950, 2400].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + idx * 0.07 + 0.06);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.07 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.24);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Bazaar Market Coins & Brass Bell (approx 0.6s).
 */
export const playGoldMarketSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Jingle of gold coins
    [2400, 3100, 2800, 3500, 4200].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.0001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.05, now + i * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.18);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Harbor Ship Nautical Bell & Sea Splash (approx 0.8s).
 */
export const playGoldShipSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Ship's double bell ring
    [1760.00, 1760.00].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.22);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.22);
      gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.22 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.22 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.22);
      osc.stop(now + idx * 0.22 + 0.48);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 🥇 Distinct Gold City Fortress Portcullis Heavy Gate Sound (approx 0.7s).
 */
export const playGoldGateSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.linearRampToValueAtTime(75, now + 0.45);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch {
    // Audio fallback
  }
};

/**
 * ============================================================================
 * 💎 WORLD 4: DIAMOND CITY PROCEDURAL ETHEREAL SOUNDTRACK & SFX
 * ============================================================================
 * 100% original, licensed-safe Web Audio API synthesis.
 * Captures an ethereal, magical, mysterious, beautiful, futuristic fantasy atmosphere:
 * - Shimmering crystal glass pads in mystical Lydian/Dorian progressions (F#m9 -> Dmaj7#11 -> Bm9 -> C#m7)
 * - Cascading celesta/crystal harp arpeggio runs
 * - Celestial glass bell harmonics & mana resonance
 * - Continuous waterfall & crystal stream ambience
 */

let isDiamondMusicPlaying = false;
let diamondWaterfallSource: AudioBufferSourceNode | null = null;
let diamondWaterfallGain: GainNode | null = null;
let diamondMusicInterval: number | null = null;
let diamondPhraseIndex = 0;

// Musical phrases for the Diamond City ethereal soundtrack
const DIAMOND_CHORD_PROGRESSIONS = [
  // Chord 1: F#m9 (Ethereal Crystal Mystery)
  {
    padFreqs: [185.00, 277.18, 369.99, 440.00, 554.37, 659.25], // F#3, C#4, F#4, A4, C#5, E5
    arpeggio: [
      { f: 739.99, t: 0.2, d: 0.9 },   // F#5
      { f: 880.00, t: 0.5, d: 0.9 },   // A5
      { f: 1108.73, t: 0.8, d: 1.0 },  // C#6
      { f: 1318.51, t: 1.1, d: 1.0 },  // E6
      { f: 1479.98, t: 1.4, d: 1.2 },  // F#6
      { f: 1760.00, t: 1.8, d: 1.5 },  // A6
      { f: 2217.46, t: 2.3, d: 1.8 },  // C#7
    ],
  },
  // Chord 2: Dmaj7#11 (Radiant Diamond Palace Aura)
  {
    padFreqs: [146.83, 220.00, 293.66, 369.99, 440.00, 554.37, 739.99], // D3, A3, D4, F#4, A4, C#5, F#5
    arpeggio: [
      { f: 880.00, t: 0.2, d: 0.9 },   // A5
      { f: 1108.73, t: 0.5, d: 0.9 },  // C#6
      { f: 1479.98, t: 0.8, d: 1.1 },  // F#6
      { f: 1661.22, t: 1.2, d: 1.3 },  // G#6 (#11 luminous sparkle)
      { f: 2217.46, t: 1.7, d: 1.6 },  // C#7
      { f: 2959.96, t: 2.2, d: 2.0 },  // F#7
    ],
  },
  // Chord 3: Bm9 (Ancient Mountain Waterfall Ridge)
  {
    padFreqs: [123.47, 185.00, 246.94, 293.66, 369.99, 440.00, 587.33], // B2, F#3, B3, D4, F#4, A4, D5
    arpeggio: [
      { f: 587.33, t: 0.2, d: 0.8 },   // D5
      { f: 739.99, t: 0.5, d: 0.9 },   // F#5
      { f: 880.00, t: 0.8, d: 0.9 },   // A5
      { f: 987.77, t: 1.1, d: 1.1 },   // B5
      { f: 1174.66, t: 1.5, d: 1.3 },  // D6
      { f: 1479.98, t: 1.9, d: 1.6 },  // F#6
      { f: 1975.53, t: 2.4, d: 1.8 },  // B6
    ],
  },
  // Chord 4: C#m7 / Amaj9 (Floating Diamond Core Zenith)
  {
    padFreqs: [138.59, 207.65, 277.18, 329.63, 415.30, 493.88, 659.25], // C#3, G#3, C#4, E4, G#4, B4, E5
    arpeggio: [
      { f: 830.61, t: 0.2, d: 0.9 },   // G#5
      { f: 987.77, t: 0.5, d: 0.9 },   // B5
      { f: 1318.51, t: 0.8, d: 1.2 },  // E6
      { f: 1661.22, t: 1.2, d: 1.4 },  // G#6
      { f: 2093.00, t: 1.7, d: 1.6 },  // C7
      { f: 2637.02, t: 2.2, d: 2.2 },  // E7
    ],
  },
];

const playDiamondMusicPhrase = () => {
  const ctx = getAudioContext();
  if (!ctx || !isDiamondMusicPlaying) return;

  try {
    const now = ctx.currentTime;
    const progression = DIAMOND_CHORD_PROGRESSIONS[diamondPhraseIndex % DIAMOND_CHORD_PROGRESSIONS.length];
    diamondPhraseIndex++;

    // 1. Lush Shimmering Glass Pad Chords (Warm Sine + Subtle Triangle Overtones)
    progression.padFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950 + idx * 80, now);
      filter.Q.setValueAtTime(1.2, now);

      // Slow ethereal swell & gentle decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.018, now + 1.6);
      gain.gain.linearRampToValueAtTime(0.014, now + 4.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 7.3);
    });

    // 2. Cascading Celesta / Crystal Harp Arpeggio Twinkles
    progression.arpeggio.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.038, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });

    // 3. High Celestial Pure Glass Bell Chimes (Diamond facets glinting)
    if (Math.random() > 0.25) {
      const glintFreqs = [2793.83, 3322.44, 3520.00, 4434.92]; // High octave glass pings
      const glintFreq = glintFreqs[Math.floor(Math.random() * glintFreqs.length)];

      const glintOsc = ctx.createOscillator();
      const glintGain = ctx.createGain();

      glintOsc.type = 'sine';
      glintOsc.frequency.setValueAtTime(glintFreq, now + 2.4);

      glintGain.gain.setValueAtTime(0.0001, now + 2.4);
      glintGain.gain.linearRampToValueAtTime(0.024, now + 2.42);
      glintGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

      glintOsc.connect(glintGain);
      glintGain.connect(ctx.destination);

      glintOsc.start(now + 2.4);
      glintOsc.stop(now + 4.25);
    }
  } catch {
    // Audio fallback
  }
};

/**
 * Starts the continuous Diamond City background soundtrack and waterfall ambience loop.
 */
export const startDiamondCityMusic = (volume: number = 0.08) => {
  stopDiamondCityMusic();
  isDiamondMusicPlaying = true;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Synthesize Flowing Waterfalls & Crystal Mana Hum Ambience
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastVal = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink-filtered gentle rush of cascading mountain water
      lastVal = (lastVal + 0.018 * white) / 1.018;
      data[i] = lastVal * 0.45;
    }

    diamondWaterfallSource = ctx.createBufferSource();
    diamondWaterfallSource.buffer = buffer;
    diamondWaterfallSource.loop = true;

    const waterFilter = ctx.createBiquadFilter();
    waterFilter.type = 'bandpass';
    waterFilter.frequency.setValueAtTime(580, ctx.currentTime);
    waterFilter.Q.setValueAtTime(0.75, ctx.currentTime);

    diamondWaterfallGain = ctx.createGain();
    diamondWaterfallGain.gain.setValueAtTime(0.001, ctx.currentTime);
    diamondWaterfallGain.gain.linearRampToValueAtTime(volume * 0.35, ctx.currentTime + 2.0);

    diamondWaterfallSource.connect(waterFilter);
    waterFilter.connect(diamondWaterfallGain);
    diamondWaterfallGain.connect(ctx.destination);

    diamondWaterfallSource.start(0);

    // 2. Start Ethereal Crystal Melody Loop (every 7.0s)
    diamondPhraseIndex = 0;
    playDiamondMusicPhrase();

    diamondMusicInterval = window.setInterval(() => {
      if (isDiamondMusicPlaying) {
        playDiamondMusicPhrase();
      }
    }, 7000);
  } catch {
    // Audio fallback
  }
};

/**
 * Stops the Diamond City soundtrack with smooth fadeout.
 */
export const stopDiamondCityMusic = () => {
  isDiamondMusicPlaying = false;

  if (diamondWaterfallGain && audioCtx) {
    try {
      diamondWaterfallGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (diamondWaterfallSource) {
          try {
            diamondWaterfallSource.stop();
            diamondWaterfallSource.disconnect();
          } catch {}
          diamondWaterfallSource = null;
        }
      }, 850);
    } catch {}
  }

  if (diamondMusicInterval !== null) {
    clearInterval(diamondMusicInterval);
    diamondMusicInterval = null;
  }
};

/**
 * 💎 Distinct Diamond City Level Arrival Sound Effect (approx 1.5s).
 * Resonant ascending crystal glass chord with celestial bell decay (F#5 -> A5 -> C#6 -> E6 -> G#6 -> C#7).
 */
export const playDiamondNodeArriveSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 739.99, time: 0, dur: 1.0 },      // F#5
      { freq: 880.00, time: 0.1, dur: 1.05 },   // A5
      { freq: 1108.73, time: 0.2, dur: 1.15 },  // C#6
      { freq: 1318.51, time: 0.3, dur: 1.25 },  // E6
      { freq: 1661.22, time: 0.42, dur: 1.4 },  // G#6
      { freq: 2217.46, time: 0.54, dur: 1.6 },  // C#7
    ];

    chords.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.11, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });

    // Glassy harmonic chime overtone
    [2959.96, 3520.00, 4434.92].forEach((bfreq, bidx) => {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();

      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(bfreq, now + 0.54 + bidx * 0.08);

      bGain.gain.setValueAtTime(0.0001, now + 0.54 + bidx * 0.08);
      bGain.gain.linearRampToValueAtTime(0.05, now + 0.54 + bidx * 0.08 + 0.015);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      bOsc.connect(bGain);
      bGain.connect(ctx.destination);

      bOsc.start(now + 0.54 + bidx * 0.08);
      bOsc.stop(now + 1.55);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 💎 Distinct Diamond City Crystal Paver & Light Bridge Footstep Sound (approx 0.08s).
 */
export const playDiamondStepSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880 + Math.random() * 220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio fallback
  }
};

/**
 * 💎 Distinct Diamond City Interactive Crystal Resonance Chime (approx 1.2s).
 */
export const playDiamondCrystalChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [1108.73, 1479.98, 1760.00, 2217.46, 2959.96].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.05 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.95);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 💎 Distinct Diamond City Grand Arcane Crystal Palace Resonance (approx 1.8s).
 */
export const playDiamondPalaceSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Deep crystal chord with ethereal cathedral overtone
    [277.18, 415.30, 554.37, 830.61, 1108.73, 1661.22].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i < 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.45);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * ============================================================================
 * 👑 WORLD 5: MYTHICAL CASTLE PROCEDURAL EPIC ENDGAME SOUNDTRACK & SFX
 * ============================================================================
 * 100% original, licensed-safe Web Audio API synthesis.
 * Captures an epic, legendary, mysterious, grand, emotional, and powerful atmosphere:
 * - Resonant Cathedral Pipe Organ & Ethereal Choral Pads (Dm9 -> Bbmaj7 -> Gm9 -> A7sus4 -> Dm)
 * - Triumphant Symphonic Brass Melodic Fanfare Lines
 * - Cascading Celestial Harp Flourishes & Stardust Glass Bells
 * - High-Altitude Cosmic Winds & Thundering Floating Waterfalls Ambience
 */

let isMythicalMusicPlaying = false;
let mythicalWindSource: AudioBufferSourceNode | null = null;
let mythicalWindGain: GainNode | null = null;
let mythicalMusicInterval: number | null = null;
let mythicalPhraseIndex = 0;

// Epic chord progressions for the endgame Mythical Castle soundtrack
const MYTHICAL_CHORD_PROGRESSIONS = [
  // Chord 1: Dm9 (The Legendary Dark Realm)
  {
    padFreqs: [146.83, 220.00, 293.66, 349.23, 440.00, 587.33, 659.25], // D3, A3, D4, F4, A4, D5, E5
    leadBrass: [
      { f: 587.33, t: 0.2, d: 1.1 },   // D5
      { f: 659.25, t: 0.7, d: 0.8 },   // E5
      { f: 698.46, t: 1.1, d: 1.3 },   // F5
      { f: 880.00, t: 1.8, d: 1.8 },   // A5
      { f: 1174.66, t: 2.8, d: 2.4 },  // D6 (heroic high crest)
    ],
    celesta: [
      { f: 1174.66, t: 0.4 }, { f: 1396.91, t: 0.7 }, { f: 1760.00, t: 1.0 }, { f: 2349.32, t: 1.4 },
    ],
  },
  // Chord 2: Bbmaj7#11 (Floating Mountain Bastions)
  {
    padFreqs: [116.54, 174.61, 233.08, 293.66, 349.23, 440.00, 587.33], // Bb2, F3, Bb3, D4, F4, A4, D5
    leadBrass: [
      { f: 698.46, t: 0.2, d: 1.0 },   // F5
      { f: 880.00, t: 0.6, d: 0.9 },   // A5
      { f: 987.77, t: 1.1, d: 1.2 },   // B5 (#11 celestial brightness)
      { f: 1174.66, t: 1.7, d: 1.6 },  // D6
      { f: 1396.91, t: 2.6, d: 2.2 },  // F6
    ],
    celesta: [
      { f: 1396.91, t: 0.3 }, { f: 1760.00, t: 0.6 }, { f: 2093.00, t: 0.9 }, { f: 2793.83, t: 1.3 },
    ],
  },
  // Chord 3: Gm9 (The Dragon Sky Ascent)
  {
    padFreqs: [98.00, 146.83, 196.00, 293.66, 349.23, 392.00, 440.00, 587.33], // G2, D3, G3, D4, F4, G4, A4, D5
    leadBrass: [
      { f: 587.33, t: 0.2, d: 0.9 },   // D5
      { f: 783.99, t: 0.6, d: 1.0 },   // G5
      { f: 880.00, t: 1.1, d: 1.2 },   // A5
      { f: 1046.50, t: 1.7, d: 1.5 },  // C6
      { f: 1174.66, t: 2.4, d: 2.4 },  // D6
    ],
    celesta: [
      { f: 1174.66, t: 0.4 }, { f: 1567.98, t: 0.7 }, { f: 1760.00, t: 1.0 }, { f: 2349.32, t: 1.5 },
    ],
  },
  // Chord 4: A7sus4 -> Asus4 (Crown Pinnacle of the Zenith Sky Throne)
  {
    padFreqs: [110.00, 164.81, 220.00, 293.66, 369.99, 440.00, 554.37], // A2, E3, A3, D4, F#4, A4, C#5
    leadBrass: [
      { f: 880.00, t: 0.2, d: 1.0 },   // A5
      { f: 1108.73, t: 0.7, d: 1.2 },  // C#6
      { f: 1318.51, t: 1.3, d: 1.5 },  // E6
      { f: 1760.00, t: 2.0, d: 2.8 },  // A6 (Triumphant endgame resolution)
    ],
    celesta: [
      { f: 1760.00, t: 0.4 }, { f: 2217.46, t: 0.8 }, { f: 2637.02, t: 1.2 }, { f: 3520.00, t: 1.7 },
    ],
  },
];

const playMythicalMusicPhrase = () => {
  const ctx = getAudioContext();
  if (!ctx || !isMythicalMusicPlaying) return;

  try {
    const now = ctx.currentTime;
    const progression = MYTHICAL_CHORD_PROGRESSIONS[mythicalPhraseIndex % MYTHICAL_CHORD_PROGRESSIONS.length];
    mythicalPhraseIndex++;

    // 1. Resonant Cathedral Pipe Organ & Choir Pads (Sawtooth + Triangle with Warm Lowpass)
    progression.padFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx < 2 ? 'sawtooth' : idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + idx * 70, now);
      filter.Q.setValueAtTime(1.5, now);

      // Powerful swell and resonant decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.022, now + 1.8);
      gain.gain.linearRampToValueAtTime(0.016, now + 5.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 7.5);
    });

    // 2. Triumphant Symphonic Brass Melodic Fanfare Lines
    progression.leadBrass.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now + t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now + t);
      filter.Q.setValueAtTime(1.8, now + t);

      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.038, now + t + 0.06);
      gain.gain.linearRampToValueAtTime(0.030, now + t + d * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });

    // 3. Cascading Stardust Celesta / Harp Twinkles
    progression.celesta.forEach(({ f, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.04, now + t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + 1.25);
    });

    // 4. Starlight Cathedral Bell Carillon Ping
    if (Math.random() > 0.2) {
      const bellFreqs = [2349.32, 2793.83, 3520.00, 4698.63]; // D7, F7, A7, D8
      const bellFreq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];

      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellFreq, now + 2.5);

      bellGain.gain.setValueAtTime(0.0001, now + 2.5);
      bellGain.gain.linearRampToValueAtTime(0.026, now + 2.52);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);

      bellOsc.start(now + 2.5);
      bellOsc.stop(now + 4.85);
    }
  } catch {
    // Audio fallback
  }
};

/**
 * Starts the continuous Mythical Castle background soundtrack and cosmic wind ambience loop.
 */
export const startMythicalCastleMusic = (volume: number = 0.08) => {
  stopMythicalCastleMusic();
  isMythicalMusicPlaying = true;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Synthesize Cosmic High-Altitude Wind & Thundering Waterfalls Noise
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastVal = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Gentle howling cosmic wind and roaring water
      lastVal = (lastVal + 0.02 * white) / 1.02;
      data[i] = lastVal * 0.5;
    }

    mythicalWindSource = ctx.createBufferSource();
    mythicalWindSource.buffer = buffer;
    mythicalWindSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(460, ctx.currentTime);
    windFilter.Q.setValueAtTime(0.85, ctx.currentTime);

    mythicalWindGain = ctx.createGain();
    mythicalWindGain.gain.setValueAtTime(0.001, ctx.currentTime);
    mythicalWindGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 2.0);

    mythicalWindSource.connect(windFilter);
    windFilter.connect(mythicalWindGain);
    mythicalWindGain.connect(ctx.destination);

    mythicalWindSource.start(0);

    // 2. Start Epic Symphonic Melody Loop (every 7.2s)
    mythicalPhraseIndex = 0;
    playMythicalMusicPhrase();

    mythicalMusicInterval = window.setInterval(() => {
      if (isMythicalMusicPlaying) {
        playMythicalMusicPhrase();
      }
    }, 7200);
  } catch {
    // Audio fallback
  }
};

/**
 * Stops the Mythical Castle soundtrack with smooth fadeout.
 */
export const stopMythicalCastleMusic = () => {
  isMythicalMusicPlaying = false;

  if (mythicalWindGain && audioCtx) {
    try {
      mythicalWindGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (mythicalWindSource) {
          try {
            mythicalWindSource.stop();
            mythicalWindSource.disconnect();
          } catch {}
          mythicalWindSource = null;
        }
      }, 850);
    } catch {}
  }

  if (mythicalMusicInterval !== null) {
    clearInterval(mythicalMusicInterval);
    mythicalMusicInterval = null;
  }
};

/**
 * 👑 Distinct Mythical Castle Level Arrival Sound Effect (approx 1.8s).
 * Resonant ascending imperial pipe organ & celestial fanfare with gold bell chime (D5 -> F5 -> A5 -> D6 -> F6 -> A6 -> D7).
 */
export const playMythicalNodeArriveSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 587.33, time: 0, dur: 1.2 },      // D5
      { freq: 698.46, time: 0.1, dur: 1.25 },   // F5
      { freq: 880.00, time: 0.2, dur: 1.35 },   // A5
      { freq: 1174.66, time: 0.3, dur: 1.45 },  // D6
      { freq: 1396.91, time: 0.42, dur: 1.6 },  // F6
      { freq: 1760.00, time: 0.54, dur: 1.8 },  // A6
      { freq: 2349.32, time: 0.68, dur: 2.2 },  // D7 (supreme pinnacle resolution)
    ];

    chords.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.12, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });

    // Golden carillon starlight bell overtone
    [2793.83, 3520.00, 4698.63].forEach((bfreq, bidx) => {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();

      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(bfreq, now + 0.68 + bidx * 0.08);

      bGain.gain.setValueAtTime(0.0001, now + 0.68 + bidx * 0.08);
      bGain.gain.linearRampToValueAtTime(0.06, now + 0.68 + bidx * 0.08 + 0.015);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      bOsc.connect(bGain);
      bGain.connect(ctx.destination);

      bOsc.start(now + 0.68 + bidx * 0.08);
      bOsc.stop(now + 2.05);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 👑 Distinct Mythical Castle Obsidian Paver & Viaduct Footstep Sound (approx 0.08s).
 */
export const playMythicalStepSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(720 + Math.random() * 260, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio fallback
  }
};

/**
 * 👑 Distinct Mythical Castle Grand Citadel Cathedral Bell & Chime (approx 2.0s).
 */
export const playMythicalCastleSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Deep cathedral bell chime with pipe organ chord
    [146.83, 220.00, 293.66, 440.00, 587.33, 880.00, 1174.66].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i < 2 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.0001, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.09, now + i * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 1.85);
    });
  } catch {
    // Audio fallback
  }
};

/**
 * 👑 Distinct Mythical Guardian Dragon Celestial Roar & Wing Whoosh (approx 1.2s).
 */
export const playMythicalDragonSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.3);
    osc.frequency.linearRampToValueAtTime(180, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.15);

    // Stardust sparkle sweep
    [1760, 2349, 2793, 3520].forEach((freq, idx) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();

      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, now + 0.3 + idx * 0.08);

      sGain.gain.setValueAtTime(0.0001, now + 0.3 + idx * 0.08);
      sGain.gain.linearRampToValueAtTime(0.04, now + 0.3 + idx * 0.08 + 0.015);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      sOsc.connect(sGain);
      sGain.connect(ctx.destination);

      sOsc.start(now + 0.3 + idx * 0.08);
      sOsc.stop(now + 1.15);
    });
  } catch {
    // Audio fallback
  }
};
