// Centralizator documente, module și fluxuri
import { FACTURA_FISCALA } from './factura';
import { NIR } from './nir';
import { CHITANTA, AVIZ } from './chitanta-aviz';
import { ORDIN_PLATA, EXTRAS_CONT, BON_FISCAL } from './op-extras-bon';
import { FLUXURI } from './fluxuri';
import { TUTORIAL } from './tutorial';

export const DOCUMENTE = {
  factura: FACTURA_FISCALA,
  nir: NIR,
  chitanta: CHITANTA,
  aviz: AVIZ,
  ordin_plata: ORDIN_PLATA,
  extras_cont: EXTRAS_CONT,
  bon_fiscal: BON_FISCAL,
};

// 4 module reorganizate logic
export const MODULE = {
  achizitie: {
    id: 'achizitie',
    nume: 'Achiziție de Bunuri',
    emoji: '🛒',
    descriere:
      'Cum cumpără firma marfă de la furnizor: comandă, aviz, factură, NIR și înregistrare contabilă.',
    culoare: 'moduleAchizitie',
    iconColor: '#06B6D4',
    bg: '#CFFAFE',
    bgDark: '#164E63',
    documente: ['aviz', 'factura', 'nir'],
    poveste:
      'Alpha Tech SRL achiziționează 5 laptopuri Dell Latitude de la TechProvider SRL. Vei învăța documentele primite și emise în acest flux.',
    fluxId: 'achizitie',
  },
  vanzare: {
    id: 'vanzare',
    nume: 'Vânzare către Clienți',
    emoji: '💼',
    descriere:
      'Cum vinde firma: factură B2B, bon fiscal B2C, aviz și descărcarea gestiunii.',
    culoare: 'moduleVanzare',
    iconColor: '#8B5CF6',
    bg: '#EDE9FE',
    bgDark: '#4C1D95',
    documente: ['factura', 'aviz', 'bon_fiscal'],
    poveste:
      'Alpha Tech SRL vinde 10 monitoare către Beta Distribution SRL prin transfer bancar și 2 căști audio la magazin cu card.',
    fluxId: 'vanzare',
  },
  plata: {
    id: 'plata',
    nume: 'Plată către Furnizor',
    emoji: '💳',
    descriere:
      'Cum plătește firma: cash (chitanță) sau bancar (ordin de plată + extras de cont).',
    culoare: 'modulePlata',
    iconColor: '#EC4899',
    bg: '#FCE7F3',
    bgDark: '#831843',
    documente: ['chitanta', 'ordin_plata', 'extras_cont'],
    poveste:
      'Alpha Tech SRL trebuie să plătească furnizorii. Decizia cash sau bancă depinde de sumă și plafoanele legale.',
    fluxId: 'plata',
  },
  incasare: {
    id: 'incasare',
    nume: 'Încasare de la Clienți',
    emoji: '💰',
    descriere:
      'Cum încasează firma: transfer bancar, cash de la firmă (chitanță), card de la persoane fizice (bon fiscal).',
    culoare: 'moduleIncasare',
    iconColor: '#10B981',
    bg: '#D1FAE5',
    bgDark: '#064E3B',
    documente: ['chitanta', 'bon_fiscal', 'extras_cont'],
    poveste:
      'Alpha Tech SRL încasează în 3 moduri: transfer (B2B), cash de la firme, card de la persoane fizice.',
    fluxId: 'incasare',
  },
};

export const MODULE_LIST = Object.values(MODULE);

// Generează toate lecțiile unui modul: 1 lecție Flux + N×3 lecții per document
export const getLectiiModul = (moduleId) => {
  const modul = MODULE[moduleId];
  if (!modul) return [];

  const lectii = [];

  // 1. Lecția "Flux complet" - prima și obligatorie
  lectii.push({
    id: `${moduleId}_flux`,
    moduleId,
    tip: 'flux',
    titlu: 'Flux complet',
    descriere: 'Vezi toți pașii și articolele contabile',
    icon: '🎯',
    fluxId: modul.fluxId,
  });

  // 2. Pentru fiecare document, 3 niveluri
  modul.documente.forEach((docId) => {
    const doc = DOCUMENTE[docId];
    if (!doc) return;

    ['nivel1', 'nivel2', 'nivel3'].forEach((nivelId, idx) => {
      lectii.push({
        id: `${moduleId}_${docId}_${nivelId}`,
        moduleId,
        docId,
        document: doc,
        nivel: idx + 1,
        nivelId,
        nivelData: doc.niveluri[nivelId],
        tip: 'document',
      });
    });
  });

  return lectii;
};

export { FLUXURI, TUTORIAL };
