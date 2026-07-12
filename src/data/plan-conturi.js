// Plan de conturi - extras pedagogic conform OMFP 1802/2014
// Conturi folosite în aplicație + funcțiile contabile

export const PLAN_CONTURI = [
  {
    cont: '121',
    denumire: 'Profit sau pierdere',
    clasa: '1 - Conturi de capitaluri',
    grupa: '12 - Rezultatul exercițiului',
    functie: 'B',
    cresteProb: 'sold',
    descriere:
      'Contul în care se "adună" toate veniturile (în Credit) și cheltuielile (în Debit) la finalul lunii: 7xx = 121 și 121 = 6xx. Sold final pe C = profit, sold pe D = pierdere.',
    exemplu: 'La închiderea lunii: 707 = 121 (15.000 lei) și 121 = 607 (12.000 lei) → sold C 121 = 3.000 lei (profit)',
  },
  {
    cont: '301',
    denumire: 'Materii prime',
    clasa: '3 - Conturi de stocuri',
    grupa: '30 - Stocuri',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Bunuri intrate în stoc care se consumă în procesul de producție. Cresc prin Debit la achiziție, scad prin Credit când sunt date în consum.',
    exemplu: 'Achiziție materii prime: 301 = 401. Consum în producție: 601 = 301.',
  },
  {
    cont: '371',
    denumire: 'Mărfuri',
    clasa: '3 - Conturi de stocuri',
    grupa: '37 - Mărfuri',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Bunuri cumpărate cu scopul revânzării "ca atare". Cresc prin Debit la achiziție (371 = 401), scad prin Credit la vânzare prin descărcarea gestiunii (607 = 371).',
    exemplu: 'Achiziție laptopuri pentru revânzare: 371 + 4426 = 401 (18.150 lei).',
  },
  {
    cont: '401',
    denumire: 'Furnizori',
    clasa: '4 - Conturi de terți',
    grupa: '40 - Furnizori și conturi asimilate',
    functie: 'P',
    cresteProb: 'C',
    descriere:
      'Datoria față de furnizori pentru ce am cumpărat pe factură. Crește prin Credit la primirea facturii, scade prin Debit la plată.',
    exemplu: 'Primire factură: % = 401 (18.150 lei). Plată prin OP: 401 = 5121 (18.150 lei).',
  },
  {
    cont: '4111',
    denumire: 'Clienți',
    clasa: '4 - Conturi de terți',
    grupa: '41 - Clienți și conturi asimilate',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Creanța față de clienți: banii pe care îi avem de încasat pentru ce le-am vândut pe factură. Crește prin Debit la emiterea facturii, scade prin Credit la încasare.',
    exemplu: 'Emitere factură: 4111 = % (18.150 lei). Încasare: 5121 = 4111.',
  },
  {
    cont: '4423',
    denumire: 'TVA de plată',
    clasa: '4 - Conturi de terți',
    grupa: '44 - Bugetul statului, fonduri speciale',
    functie: 'P',
    cresteProb: 'C',
    descriere:
      'Diferența pozitivă: când 4427 > 4426 → datorăm la buget. Apare la regularizare lunară: 4427 = % (4426 + 4423). Se stinge prin 4423 = 5121 la plată.',
    exemplu: 'Regularizare: 4427 (3.150) - 4426 (1.500) = 1.650 de plată → 4427 = % (4426 + 4423).',
  },
  {
    cont: '4424',
    denumire: 'TVA de recuperat',
    clasa: '4 - Conturi de terți',
    grupa: '44 - Bugetul statului, fonduri speciale',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Diferența negativă: când 4426 > 4427 → statul ne datorează. Apare la regularizare: % (4427 + 4424) = 4426.',
    exemplu: 'Dacă într-o lună deductibilă > colectată: rămâne sold debitor pe 4424.',
  },
  {
    cont: '4426',
    denumire: 'TVA deductibilă',
    clasa: '4 - Conturi de terți',
    grupa: '44 - Bugetul statului, fonduri speciale',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'TVA-ul plătit furnizorilor, pe care îl putem "recupera" de la stat. Crește prin Debit la fiecare achiziție cu TVA, se închide lunar la regularizare.',
    exemplu: 'Cumpărare cu TVA 21%: 4426 = 401 cu suma TVA. Lunar se închide la 4427.',
  },
  {
    cont: '4427',
    denumire: 'TVA colectată',
    clasa: '4 - Conturi de terți',
    grupa: '44 - Bugetul statului, fonduri speciale',
    functie: 'P',
    cresteProb: 'C',
    descriere:
      'TVA-ul încasat de la clienți, pe care îl datorăm statului. Crește prin Credit la fiecare vânzare cu TVA, se închide lunar la regularizare.',
    exemplu: 'Vânzare cu TVA 21%: 4111 = % (707 + 4427). Lunar se închide cu 4426.',
  },
  {
    cont: '5121',
    denumire: 'Conturi la bănci în lei',
    clasa: '5 - Conturi de trezorerie',
    grupa: '51 - Conturi la bănci',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Banii din contul bancar al firmei. Cresc prin Debit la încasare (5121 = 4111), scad prin Credit la plată (401 = 5121). Document justificativ: extras de cont.',
    exemplu: 'Încasare prin OP de la client: 5121 = 4111 (18.150 lei).',
  },
  {
    cont: '5125',
    denumire: 'Sume în curs de decontare',
    clasa: '5 - Conturi de trezorerie',
    grupa: '51 - Conturi la bănci',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Banii încasați prin POS (card) care nu au ajuns încă în contul curent. Se închid prin 5121 = 5125 la data extrasului.',
    exemplu: 'Vânzare cu card: 5125 = % (707 + 4427). Două zile mai târziu: 5121 = 5125.',
  },
  {
    cont: '5311',
    denumire: 'Casa în lei',
    clasa: '5 - Conturi de trezorerie',
    grupa: '53 - Casa',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Banii lichizi din casierie. Cresc prin Debit la încasare numerar, scad prin Credit la plată numerar. Document: chitanță, registru de casă.',
    exemplu: 'Plată cash către furnizor: 401 = 5311 (4.500 lei).',
  },
  {
    cont: '607',
    denumire: 'Cheltuieli privind mărfurile',
    clasa: '6 - Conturi de cheltuieli',
    grupa: '60 - Cheltuieli privind stocurile',
    functie: 'A',
    cresteProb: 'D',
    descriere:
      'Costul de achiziție al mărfii vândute. Crește prin Debit la descărcarea gestiunii (607 = 371). Se închide la 121 la finalul lunii.',
    exemplu: 'Vânzare marfă: descărcare gestiune 607 = 371 la cost achiziție 12.000 lei.',
  },
  {
    cont: '707',
    denumire: 'Venituri din vânzarea mărfurilor',
    clasa: '7 - Conturi de venituri',
    grupa: '70 - Cifra de afaceri netă',
    functie: 'P',
    cresteProb: 'C',
    descriere:
      'Veniturile din vânzarea de mărfuri. Cresc prin Credit la fiecare vânzare. Se închid la 121 la finalul perioadei.',
    exemplu: 'Vânzare marfă: 4111 = % (707 + 4427), unde 707 = 15.000 lei (preț fără TVA).',
  },
];

export const ARTICOLE_FRECVENTE = [
  {
    titlu: 'Achiziție mărfuri',
    formula: '% = 401',
    detalii: '371 + 4426 = 401',
    explicatie: 'Mărfurile intră în stoc (D 371), avem TVA de recuperat (D 4426), devenim datornici (C 401).',
  },
  {
    titlu: 'Vânzare B2B',
    formula: '4111 = %',
    detalii: '4111 = 707 + 4427',
    explicatie: 'Creanță față de client (D 4111), venit (C 707), TVA datorat statului (C 4427).',
  },
  {
    titlu: 'Descărcare gestiune',
    formula: '607 = 371',
    detalii: 'La cost de achiziție',
    explicatie: 'Cheltuiala crește cu costul mărfii vândute, stocul scade.',
  },
  {
    titlu: 'Plată cash',
    formula: '401 = 5311',
    detalii: 'Sub plafonul 5.000 lei',
    explicatie: 'Datoria față de furnizor scade, casieria scade cu aceeași sumă.',
  },
  {
    titlu: 'Plată bancară',
    formula: '401 = 5121',
    detalii: 'OP + Extras de cont',
    explicatie: 'Datoria față de furnizor se stinge, banii din cont scad.',
  },
  {
    titlu: 'Încasare bancară',
    formula: '5121 = 4111',
    detalii: 'Extras de cont',
    explicatie: 'Banii intră în cont, creanța față de client se stinge.',
  },
  {
    titlu: 'Încasare cash',
    formula: '5311 = 4111',
    detalii: 'Chitanță, sub plafon',
    explicatie: 'Casieria crește, creanța față de client se stinge.',
  },
  {
    titlu: 'Vânzare B2C cu card',
    formula: '5125 = %',
    detalii: '5125 = 707 + 4427',
    explicatie: 'Banii vin pe card (intermediar), venit, TVA colectată. Apoi 5121 = 5125.',
  },
  {
    titlu: 'Regularizare TVA (de plată)',
    formula: '4427 = %',
    detalii: '4427 = 4426 + 4423',
    explicatie: 'TVA colectată "consumă" TVA deductibilă, diferența rămâne ca datorie 4423.',
  },
];
