# ContaCool

**Gamified mobile app for learning Romanian accounting documents** — React Native + Expo (SDK 54)

Bachelor's thesis project, Faculty of Economics and Business Administration (FEAA), Alexandru Ioan Cuza University of Iași. Defended July 2026.

## Why

Accounting apps available on Google Play don't cover Romanian accounting regulations. ContaCool fills that gap: a gamified learning tool aligned with current Romanian tax legislation, built for students and early-career employees.

## Tech Stack

`React Native` · `Expo SDK 54` · `React Navigation` · `Context API` · `AsyncStorage` · `JavaScript`

## Demo

https://github.com/user-attachments/assets/01eb21de-e9aa-4c6b-bb15-8caa58f8b0c8
<img width="187" height="367" alt="ContaCool" src="https://github.com/user-attachments/assets/200854ad-b449-4f27-a7b2-0314abf8e742" />


## Key Features

- 4-lesson pedagogical tutorial for beginners
- 4 complete modules (Purchase, Sale, Payment, Collection)
- Each module includes a full workflow + per-document lessons
- Accounting entries with per-account explanations (OMFP 1802/2014)
- Interactive chart of accounts
- Searchable document glossary
- Compliant with current Romanian tax legislation (VAT, e-Invoicing, cash transaction limits — see below)
- XP system, levels, streaks, badges
- Light/dark theme, haptic feedback, animations

## Getting Started

```bash
# Clone the repo
git clone https://github.com/DedeMonsta/ContaCool.git
cd ContaCool

# Install dependencies
npm install

# Start the Expo dev server (clean cache)
npx expo start -c
```

Scan the QR code with **Expo Go** on your Android device.

> If you get a "Packager is not running" error, make sure your phone and computer are on the same Wi-Fi network, or run `npx expo start --tunnel` instead.

## Project Structure

```
ContaCool/
├── App.js                     # Entry point + navigation
├── package.json               # Expo SDK 54 dependencies
├── app.json                   # Expo config
├── babel.config.js            # Babel config
└── src/
    ├── context/
    │   ├── ProgressContext.js # XP, streak, completion state
    │   └── ThemeContext.js    # Light/dark theme
    ├── data/
    │   ├── factura.js         # Invoice data
    │   ├── nir.js             # Goods receipt note data
    │   ├── chitanta-aviz.js   # Receipt, delivery note data
    │   ├── op-extras-bon.js   # Payment order, bank statement, fiscal receipt
    │   ├── fluxuri.js         # Complete workflows + accounting entries
    │   ├── tutorial.js        # 4-lesson tutorial content
    │   ├── plan-conturi.js    # Pedagogical chart of accounts
    │   └── index.js           # Modules + lessons index
    ├── components/
    │   ├── Mascota.js         # Andrei - app mascot
    │   ├── ArticolContabil.js # Debit/Credit table with explanations
    │   └── UI.js              # Buttons, cards, copy button, etc.
    ├── screens/
    │   ├── OnboardingScreen.js
    │   ├── TutorialScreen.js  # 4-lesson tutorial
    │   ├── HomeScreen.js
    │   ├── ModuleDetailScreen.js
    │   ├── LessonScreen.js    # Router
    │   ├── FluxScreen.js      # Full workflow (special lesson)
    │   ├── Nivel1Screen.js    # Exploration level
    │   ├── Nivel2Screen.js    # Find-the-error level
    │   ├── Nivel3Screen.js    # Fill-in-the-blanks level
    │   ├── ProfileScreen.js
    │   ├── GlosarScreen.js
    │   └── PlanConturiScreen.js
    ├── theme/theme.js          # Colors, spacing, fonts
    └── utils/feedback.js       # Haptic feedback
```

---

## Română

### Despre

Aplicație React Native + Expo pentru învățarea documentelor contabile românești. Dezvoltată pentru lucrarea de licență la FEAA UAIC Iași.

Aplicațiile de contabilitate disponibile pe Google Play nu acoperă reglementările contabile din România. ContaCool umple acest gol: un instrument de învățare gamificat, aliniat la legislația fiscală în vigoare, construit pentru studenți și angajați la început de drum.

### Caracteristici principale

- Tutorial pedagogic de 4 mini-lecții pentru începători
- 4 module complete (Achiziție, Vânzare, Plată, Încasare)
- Fiecare modul cu flux complet + lecții per document
- Articole contabile cu explicații per cont (OMFP 1802/2014)
- Plan de conturi interactiv
- Glosar căutabil de documente
- TVA 21% (Legea 141/2025)
- Plafoane cash conform Legii 70/2015
- e-Factura B2B+B2C conform OUG 120/2021
- Sistem XP, niveluri, streak, badges
- Temă light/dark, vibrații, animații

### Cum se instalează

Pe Windows (Desktop\files):

1. Șterge `node_modules` și `package-lock.json` dacă există
2. Instalează dependențele:

```
npm install
```

3. Pornește serverul Expo cu cache curat:

```
npx expo start -c
```

4. Scanează QR-ul cu Expo Go pe Android

### Conformitate legală

- Legea contabilității nr. 82/1991
- Codul Fiscal (Legea 227/2015)
- TVA 21% (Legea 141/2025, MO 699/25.07.2025)
- OMFP 2634/2015 (documente justificative)
- OMFP 1802/2014 (plan de conturi)
- Legea 70/2015 (plafoane cash)
- OUG 120/2021 (e-Factura)
