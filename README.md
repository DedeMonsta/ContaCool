# ContaCool v2.0 - Aplicație Android educațională

Aplicație React Native + Expo pentru învățarea documentelor contabile românești.
Dezvoltată pentru lucrarea de licență la FEAA UAIC Iași.

## Caracteristici principale

- **Tutorial pedagogic** de 4 mini-lecții pentru începători
- **4 module** complete (Achiziție, Vânzare, Plată, Încasare)
- Fiecare modul cu **flux complet** + lecții per document
- **Articole contabile** cu explicații per cont (OMFP 1802/2014)
- **Plan de conturi** interactiv
- **Glosar** căutabil de documente
- TVA **21%** (Legea 141/2025)
- Plafoane cash conform Legii 70/2015
- e-Factura B2B+B2C conform OUG 120/2021
- Sistem XP, niveluri, streak, badges
- Temă light/dark, vibrații, animații

## Cum se instalează

### Pe Windows (Desktop\files):

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

## Conformitate legală

- Legea contabilității nr. 82/1991
- Codul Fiscal (Legea 227/2015)
- TVA 21% (Legea 141/2025, MO 699/25.07.2025)
- OMFP 2634/2015 (documente justificative)
- OMFP 1802/2014 (plan de conturi)
- Legea 70/2015 (plafoane cash)
- OUG 120/2021 (e-Factura)

## Structură

```
ContaCool/
├── App.js                     # Entry point + navigare
├── package.json               # Dependențe Expo SDK 54
├── app.json                   # Config Expo
├── babel.config.js            # Babel config
└── src/
    ├── context/
    │   ├── ProgressContext.js # State XP, streak, completări
    │   └── ThemeContext.js    # Temă light/dark
    ├── data/
    │   ├── factura.js         # Date factură
    │   ├── nir.js             # Date NIR
    │   ├── chitanta-aviz.js   # Date chitanță, aviz
    │   ├── op-extras-bon.js   # OP, extras, bon fiscal
    │   ├── fluxuri.js         # Fluxuri complete + articole contabile
    │   ├── tutorial.js        # 4 mini-lecții tutorial
    │   ├── plan-conturi.js    # Plan conturi pedagogic
    │   └── index.js           # Module + lecții
    ├── components/
    │   ├── Mascota.js         # Andrei - mascota
    │   ├── ArticolContabil.js # Tabel D/C cu explicații
    │   └── UI.js              # Buttons, Cards, CopyButton etc.
    ├── screens/
    │   ├── OnboardingScreen.js
    │   ├── TutorialScreen.js  # 4 mini-lecții
    │   ├── HomeScreen.js
    │   ├── ModuleDetailScreen.js
    │   ├── LessonScreen.js    # Router
    │   ├── FluxScreen.js      # Flux complet (lecție specială)
    │   ├── Nivel1Screen.js    # Explorare
    │   ├── Nivel2Screen.js    # Găsește erori
    │   ├── Nivel3Screen.js    # Completare
    │   ├── ProfileScreen.js
    │   ├── GlosarScreen.js
    │   └── PlanConturiScreen.js
    ├── theme/theme.js          # Culori, spacing, fonturi
    └── utils/feedback.js       # Haptic feedback
```
