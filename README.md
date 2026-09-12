# Life RPG (RPG To-Do List)

Turn your daily life, habits, and tasks into an epic 2D pixel-art RPG adventure.

---

## 🚀 Progress & Features

### ✅ Step 1: Project Foundation & Dual Login Portal
- **2D Pixel-Art RPG Visual Aesthetic**:
  - Original retro overworld environment with meadow grass, cozy cottage, animated chimney smoke, trees, and river.
  - Cute original adventurer character with idle breathing animation and a pet companion with an animated wagging tail.
  - Wildflower glades (poppies, buttercups, daisies, lavender).
- **Dual Access Portal**:
  - **👤 Player Login**: Standard progression access with username/email, password, remember checkbox, and signup toggle.
  - **🛠️ Developer / Admin Login**: Sandbox testing access for maps, levels, pets, magic, and debug controls.

### ✅ Step 2: Character Creation System
- **Dynamic Character Customization**:
  - **Name Input**: Live validation (minimum 2 characters, max 16) and a random fantasy name generator.
  - **Gender**: Selectable card buttons (`Male` ♂️ / `Female` ♀️).
  - **Skin Tone**: 5 original skin tone palettes (`Fair`, `Warm`, `Tan`, `Bronze`, `Deep`).
  - **Hairstyles**: 5 original styles (`Spiky`, `Classic`, `Flowing`, `Ponytail`, `Curly`).
  - **Hair Colors**: 6 vibrant palettes (`Obsidian`, `Chestnut`, `Golden`, `Crimson`, `Silver`, `Violet`).
  - **RPG Outfits**: 4 original RPG classes (`Adventurer`, `Apprentice`, `Warrior`, `Mage`).
  - **Outfit Colors**: 6 rich shades (`Emerald`, `Cobalt`, `Ruby`, `Amethyst`, `Amber`, `Charcoal`).
- **Live 2D Pixel-Art Preview**:
  - Multi-layered SVG sprite renderer that reacts instantly to every customization change.
  - Shaded stone pedestal with drop shadow and subtle idle breathing animation.
  - Live trait and class badges.
- **Randomize All**: One-click button to roll a completely randomized hero configuration.
- **Character Created Confirmation**:
  - Celebration screen displaying hero portrait, character name, and complete adventurer dossier.
  - Options to edit character or log out.
  - Safe frontend state persistence.

### ✅ Step 3: Character Progression & Stats System
- **Comprehensive TypeScript Data Model (`PlayerState`)**:
  - **Progression**: `Level` starts at 1 (never 0, cannot drop below 1), `XP` starts at 0 (earned, not spent).
  - **Vitals**: `Health` starts at 100 HP (max 100, clamped safely between 0–100).
  - **Core RPG Attributes**: 4 independent stats: `Intelligence` (0), `Strength` (0), `Stamina` (0), `Skills` (0).
  - **Economy**: `Gold` starts at 0 G (strictly separated from XP; cannot be spent into negatives).
  - **Consistency**: `Streak` starts at 0 days (ready for quest/habit tracking).
  - **League Tier**: Starts at `Bronze` (Tiers: Bronze, Silver, Gold, Diamond, Mythical).
- **Reusable Progression Calculations (`src/utils/progression.ts`)**:
  - Dynamic XP threshold calculation (`level * 100` XP needed to level up).
  - Automated level advancement with rollover XP.
  - Clamped stat and health mutation utilities.
- **Character Stats & Profile Panel (`CharacterStatsPanel.tsx`)**:
  - Displays Character Name and the exact live 2D pixel-art character sprite created in Step 2.
  - Large, prominent **XP Progress Bar** clearly displaying `0 / 100 XP` with pixel progress percentage.
  - **Health Bar** displaying `100 / 100 HP`.
  - Clean **Level Badge** (`LVL 1`) without class or adventurer titles.
  - Dedicated **League Section** clearly displaying `BRONZE`.
  - 4 independent core RPG attribute cards: `INTELLIGENCE` (0), `STRENGTH` (0), `STAMINA` (0), `SKILLS` (0).
  - Dedicated `GOLD` (0 G) and `STREAK` (0 Days) tracking sections.
  - **Living Feedback Animations & Audio**:
    - **Full Health Heart Pulse**: Subtle repeating heartbeat pulse animation (`animate-rpg-heartbeat`) when HP is at maximum 100/100, which ceases when damaged.
    - **Web Audio API Sound Effects**: 100% original, licensed-safe harmonic chime synthesizers (`playStatIncreaseSound` & `playLevelUpSound`) triggered on actual stat gains.
    - **Level Up Glow**: Radiant amber pulse and celebration toast upon leveling up.
    - **Smooth XP Bar Interpolation**: Eased transition on the XP bar as experience is gained.
    - **Stat Number Count-Up & Highlight**: Smooth integer animation and emerald card pulse on stat increases.
  - Clean, polished player-facing UI with seamless character editing and logout controls.

### ✅ Step 4: Dedicated Quest Page & Quest System
- **Navigation Flow**: `Login` ➔ `Character Creation` ➔ `Character Stats` ➔ `Quest Page` (via prominent **`CONTINUE TO QUESTS ➔`** button).
- **Dedicated Quest Page (`QuestPage.tsx`)**:
  - Completely separate from the Character Stats page to keep both interfaces clean and uncluttered.
  - Contains two primary quest sections + Quest History:
    1. **☀️ TODAY'S QUESTS**: Short-term tasks intended for today (15m, 30m, 1h, 2h, 3h). Resets each new calendar day; previous completed tasks archive into history, while incomplete tasks do not carry over.
    2. **⚔️ ACTIVE QUESTS**: Long-term campaigns spanning multiple days (1d, 3d, 7d, 14d, 30d). Continues seamlessly across calendar days until completed or expired.
    3. **📜 QUEST HISTORY**: Dedicated archive view preserving completed quests from previous days with name, category, difficulty, created date, and completion date.
- **Automated Duration Routing (`AddQuestModal.tsx`)**:
  - Modal with 5 RPG categories (🧠 Intelligence, 💪 Strength, 🏃 Stamina, 🛠 Skills, ❤️ Health) and 3 difficulties (Easy, Medium, Hard).
  - Duration picker with Short-Term and Long-Term presets + custom inputs.
  - System **automatically routes** short-term quests (<24h) to Today's Quests and long-term quests to Active Quests without requiring manual sorting.
- **Dynamic Countdown Timers (`QuestCard.tsx`)**:
  - Auto-updating remaining-time indicators (e.g. *"45 min remaining"*, *"2 hours remaining"*, *"6 days remaining"*).
  - Displays red animated **`EXPIRED`** badge if deadline passes.
- **Completion Effects & Audio**:
  - Strikethrough title with green `COMPLETED` tag.
  - Emerald pulse celebration animation (`animate-stat-pulse`).
  - Triumphant 4-note ascending quest clear chime via Web Audio API (`playQuestCompleteSound`).
  - Option to reactivate quests.
- **Daily Calendar Refresh & LocalStorage Persistence (`questStorage.ts`)**:
  - Date-based tracking (`YYYY-MM-DD`). Automatically handles day rollovers even if browser is closed and reopened the next day.

### ✅ Step 5: Quest Completion Rewards & Progression
- **Exact Structured Reward Matrix**:
  - **Today's Quests (Short-term daily tasks)**:
    - `Easy`: ⭐ **+50 XP** | 📊 **+2 Attribute / Skill XP** | 💰 **+10 Gold**
    - `Medium`: ⭐ **+100 XP** | 📊 **+5 Attribute / Skill XP** | 💰 **+20 Gold**
    - `Hard`: ⭐ **+200 XP** | 📊 **+10 Attribute / Skill XP** | 💰 **+40 Gold**
  - **Active Quests (Multi-day campaigns)**:
    - `Easy`: ⭐ **+300 XP** | 📊 **+10 Attribute / Skill XP** | 💰 **+75 Gold**
    - `Medium`: ⭐ **+600 XP** | 📊 **+20 Attribute / Skill XP** | 💰 **+150 Gold**
    - `Hard`: ⭐ **+1000 XP** | 📊 **+35 Attribute / Skill XP** | 💰 **+300 Gold**
- **Attribute & Skill XP Separation**:
  - 🧠 `Intelligence` ➔ Intelligence stat
  - 💪 `Strength` ➔ Strength stat
  - 🏃 `Stamina` ➔ Stamina stat
  - 🛠 `Skills` ➔ 🛠 **Skill XP** (explicitly distinguished from overall character XP; overall XP controls character Level)
  - ❤️ `Health` ➔ Health (max 100, clamped safely between 0–100, activates full-health heart pulse at 100 HP)
- **Duplicate Reward Protection**:
  - Strict once-per-quest reward granting tracked by `rewardClaimed`.
  - Reopening or clicking completed quests cannot farm duplicate rewards.
- **Live Reward Previews**:
  - Every quest card features clear reward preview chips (e.g. `+100 XP`, `+20 G`, `+5 Intelligence`) indicating exact earned rewards.
- **Staged Sequential Reward Modal (`QuestRewardModal.tsx`)**:
  - Modal reveals rewards in cinematic stages:
    1. Overall XP (+XP with icon)
    2. Gold currency (+Gold with coin icon)
    3. Attribute or Skill XP (+Amount with category icon)
    4. Level Up celebration banner (if threshold reached) with audio fanfare
  - "Claim & Continue" action button to smoothly proceed.
- **Single Source of Truth & LocalStorage Persistence**:
  - Updates directly apply to `PlayerState` (`LIFE_RPG_PLAYER_STATE`).
  - Rollover XP algorithm allows continuous leveling without losing extra XP.
- **Quest Header Overflow Fix**:
  - Entire header stays contained with `min-w-0 flex-1 truncate` on player names/emails.
  - History and `+ ADD QUEST` action buttons are shrink-proof (`shrink-0`) and 100% visible on all screen sizes.
- **Delete Quest & Confirmation Dialog (`DeleteQuestModal.tsx`)**:
  - Trash button on every quest card across Today's Quests, Active Quests, and Quest History.
  - Confirmation modal (*"Delete this quest? This quest will be permanently removed."*) with Cancel and Delete buttons.
  - Deleting completed quests preserves awarded XP, Gold, and stats (never refunded or reversed).
  - Deleted quests are cleanly purged from both active lists and visible Quest History.

---

## 🛠️ Tech Stack
- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Custom 2D Pixel Art SVG Graphics
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API (real-time harmonic synthesizers)

---

## 🎨 Design System & Tailwind Architecture (`tailwind.config.js`)

Life RPG uses an original, custom-crafted 2D retro RPG design system configured directly in Tailwind:

- **Typography**:
  - `font-pixel`: `["Press Start 2P", monospace]` for authentic 8-bit retro headers, badges, and stats.
  - `font-sans`: `["Plus Jakarta Sans", sans-serif]` for high-readability form fields and body text.
- **Curated Color Tokens (`colors.rpg`)**:
  - `rpg.player`: Emerald quest palette (`#10b981`, hover `#059669`, accent `#34d399`, dark `#064e3b`).
  - `rpg.dev`: Amber developer palette (`#f59e0b`, hover `#d97706`, accent `#fbbf24`, dark `#78350f`).
  - `rpg.card` / `rpg.dark`: Deep twilight backgrounds (`#1a172a`, `#0e0d17`) with pixel borders (`#363058`).
- **Hard-Edge Pixel Shadows (`boxShadow`)**:
  - `shadow-pixel-sm`: `2px 2px 0 0 rgba(0,0,0,0.6)`
  - `shadow-pixel`: `4px 4px 0 0 rgba(0,0,0,0.7)`
  - `shadow-pixel-lg`: `6px 6px 0 0 rgba(0,0,0,0.8)`
  - `shadow-inner-pixel`: Inset dimensional borders for authentic retro UI cartridges.
- **Custom CSS & Micro-Animations**:
  - `float-slow`, `pulse-glow`, `sparkle`: Ambient UI particle effects.
  - `animate-rpg-heartbeat`: Rhythmic living heartbeat for 100/100 maximum HP.
  - `animate-level-up-glow`: Radiant amber pulse for level advancements.
  - `animate-stat-pulse`: Emerald highlight pulse on stat increments.

---

## 💻 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
