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

---

## 🛠️ Tech Stack
- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Custom 2D Pixel Art SVG Graphics
- **Icons**: Lucide React

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
