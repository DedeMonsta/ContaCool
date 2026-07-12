// Fluxuri complete de documente per modul
// Inclusiv articole contabile cu explicații pedagogice
// Conform OMFP 1802/2014 + Codul Fiscal + Legea 82/1991

export const FLUXURI = {
  achizitie: {
    id: 'achizitie',
    titlu: 'Fluxul complet: Achiziție de bunuri',
    emoji: '🛒',
    poveste:
      'Alpha Tech SRL Iași vrea să cumpere 5 laptopuri Dell Latitude de la TechProvider SRL București pentru a le revinde. Hai să vezi ce documente apar și cum se înregistrează în contabilitate.',
    contextEconomic:
      'Când o firmă cumpără marfă, declanșează un lanț de documente care există ca să poată demonstra oricărui control (ANAF, auditor) ce s-a întâmplat, când și cu cine. Documentul justificativ stă la baza ORICĂREI înregistrări contabile (Legea 82/1991, art. 6).',
    pasi: [
      {
        nr: 1,
        zi: 'Ziua 0',
        titlu: 'Comanda',
        document: 'Comandă / Contract',
        emis_de: 'Alpha Tech',
        descriere:
          'Alpha Tech trimite o comandă către TechProvider: "Vrem 5 laptopuri Dell Latitude la 3.000 lei/buc + TVA 21%, livrare cât mai rapid".',
        explicatie:
          'Comanda NU este un document contabil. E doar baza juridică a tranzacției. Nu se înregistrează în contabilitate.',
        culoare: '#94A3B8',
        icon: '📝',
      },
      {
        nr: 2,
        zi: 'Ziua 1',
        titlu: 'Marfa pleacă cu aviz (opțional)',
        document: 'Aviz de însoțire',
        emis_de: 'TechProvider',
        descriere:
          'Marfa pleacă de la depozit înainte ca factura să fie emisă. Avizul însoțește camionul cu marfa.',
        explicatie:
          'Avizul de însoțire (cod 14-3-6A) este OPȚIONAL - apare doar dacă factura nu se emite în același moment cu livrarea. Dacă factura pleacă cu marfa, avizul nu mai este necesar.',
        culoare: '#06B6D4',
        icon: '🚚',
      },
      {
        nr: 3,
        zi: 'Ziua 1',
        titlu: 'Factura sosește prin e-Factura',
        document: 'Factură fiscală (RO e-Factura)',
        emis_de: 'TechProvider',
        descriere:
          'TechProvider emite factura FF-2025-0001 (5 × 3.000 = 15.000 lei + TVA 21% = 3.150 lei → total 18.150 lei) și o transmite prin sistemul RO e-Factura (SPV). Alpha Tech o descarcă din SPV.',
        explicatie:
          'Din 1 iulie 2024, între firme sunt valabile doar facturile transmise prin sistemul național RO e-Factura (OUG 120/2021, Legea 296/2023). Termen: 5 zile calendaristice de la emitere. În perioada 1 ianuarie - 30 iunie 2024 a existat o etapă de tranziție în care factura pe hârtie era încă acceptată în paralel.',
        culoare: '#10B981',
        icon: '🧾',
      },
      {
        nr: 4,
        zi: 'Ziua 1',
        titlu: 'Recepția fizică în depozit',
        document: 'NIR (Notă de recepție)',
        emis_de: 'Alpha Tech',
        descriere:
          'Comisia Alpha Tech (Popescu Ion + Ionescu Maria) numără efectiv laptopurile la sosire: 5 buc, conform facturii. Gestionarul Vasilescu Andrei le preia în gestiune.',
        explicatie:
          'NIR-ul (cod 14-3-1A) este OBLIGATORIU în 6 situații. Pentru o achiziție simplă fără diferențe, se poate face recepția direct pe factură. Aici îl folosim ca exemplu didactic.',
        culoare: '#F59E0B',
        icon: '📦',
      },
      {
        nr: 5,
        zi: 'Ziua 1',
        titlu: 'Înregistrarea în contabilitate',
        document: 'Notă contabilă',
        emis_de: 'Contabilul Alpha Tech',
        descriere:
          'Pe baza facturii și NIR-ului, contabilul scrie articolul contabil în Registrul-jurnal.',
        explicatie:
          'Articolul are 3 conturi: 371 (mărfuri intrate în gestiune), 4426 (TVA pe care îl recuperăm de la stat) și 401 (datoria nouă către furnizor).',
        culoare: '#8B5CF6',
        icon: '📝',
        articolContabil: {
          tip: 'compus',
          linii: [
            {
              cont: '371',
              denumire: 'Mărfuri',
              functie: 'A',
              pozitie: 'D',
              suma: 15000,
              explicatie: 'Activul nostru crește - mărfurile au intrat în depozit (preț fără TVA).',
            },
            {
              cont: '4426',
              denumire: 'TVA deductibilă',
              functie: 'A',
              pozitie: 'D',
              suma: 3150,
              explicatie: 'TVA-ul plătit furnizorului devine o creanță față de stat. Îl vom "scădea" din TVA-ul colectat la regularizare.',
            },
            {
              cont: '401',
              denumire: 'Furnizori',
              functie: 'P',
              pozitie: 'C',
              suma: 18150,
              explicatie: 'Datoria noastră față de furnizor crește cu valoarea totală a facturii (cu TVA).',
            },
          ],
          formula: '% = 401 ⟹ 371 + 4426 = 401',
          interpretare:
            'Patrimoniul total a crescut: avem +15.000 lei marfă în stoc, dar și o datorie nouă de 18.150 lei către furnizor. La fel ca în viața reală: ai primit ceva, dar trebuie să plătești.',
        },
      },
    ],
    rezumat:
      'Achiziția generează 3-5 documente într-un lanț logic: comandă → (aviz opțional) → factură → (NIR opțional) → notă contabilă. La final, marfa este în depozit (cont 371), avem TVA de recuperat (4426) și o datorie către furnizor (401).',
  },

  vanzare: {
    id: 'vanzare',
    titlu: 'Fluxul complet: Vânzare către clienți',
    emoji: '💼',
    poveste:
      'Alpha Tech SRL vinde 10 monitoare LG către Beta Distribution SRL Cluj. Cum se înregistrează o vânzare B2B și care este diferența față de o vânzare la magazin?',
    contextEconomic:
      'Vânzarea este oglinda achiziției - același flux, dar din perspectiva opusă. Acum noi suntem cei care emitem facturi și creăm creanțe (drepturi de a încasa bani de la clienți).',
    pasi: [
      {
        nr: 1,
        zi: 'Ziua 0',
        titlu: 'Comanda primită',
        document: 'Comandă fermă',
        emis_de: 'Beta Distribution',
        descriere:
          'Beta Distribution trimite comandă pentru 10 monitoare LG la 1.500 lei/buc + TVA 21%.',
        explicatie: 'Comanda primită nu se înregistrează contabil.',
        culoare: '#94A3B8',
        icon: '📨',
      },
      {
        nr: 2,
        zi: 'Ziua 1',
        titlu: 'Marfa pleacă cu aviz (opțional)',
        document: 'Aviz de însoțire',
        emis_de: 'Alpha Tech',
        descriere:
          'Dacă marfa pleacă înainte ca factura să fie gata, se emite aviz de însoțire.',
        explicatie: 'În practica modernă cu e-Factura, factura se emite rapid, deci avizul e tot mai rar folosit.',
        culoare: '#06B6D4',
        icon: '🚚',
      },
      {
        nr: 3,
        zi: 'Ziua 1',
        titlu: 'Emiterea facturii',
        document: 'Factură fiscală (RO e-Factura)',
        emis_de: 'Alpha Tech',
        descriere:
          'Alpha Tech emite factura: 10 × 1.500 = 15.000 lei + TVA 21% = 3.150 lei → total 18.150 lei. Se transmite în SPV.',
        explicatie:
          'Termen emitere: până la ziua 15 a lunii următoare faptului generator (Art. 319 alin. 16 Cod Fiscal). Termen transmitere SPV: 5 zile lucrătoare.',
        culoare: '#10B981',
        icon: '🧾',
        articolContabil: {
          tip: 'compus',
          linii: [
            {
              cont: '4111',
              denumire: 'Clienți',
              functie: 'A',
              pozitie: 'D',
              suma: 18150,
              explicatie: 'Creanța noastră față de client crește. Vom avea 18.150 lei de încasat de la Beta.',
            },
            {
              cont: '707',
              denumire: 'Venituri din vânzarea mărfurilor',
              functie: 'P',
              pozitie: 'C',
              suma: 15000,
              explicatie: 'Venitul firmei crește cu valoarea fără TVA. La sfârșit de lună acest cont se închide la 121 (profit).',
            },
            {
              cont: '4427',
              denumire: 'TVA colectată',
              functie: 'P',
              pozitie: 'C',
              suma: 3150,
              explicatie: 'TVA-ul încasat de la client devine o datorie față de stat. Va fi virat la buget după regularizare.',
            },
          ],
          formula: '4111 = % ⟹ 4111 = 707 + 4427',
          interpretare:
            'Vânzarea creează o creanță (4111), generează venit (707) și obligație TVA (4427). Atenție: nu am încasat încă banii - doar avem dreptul să-i încasăm.',
        },
      },
      {
        nr: 4,
        zi: 'Ziua 1',
        titlu: 'Descărcarea gestiunii',
        document: 'Notă contabilă',
        emis_de: 'Contabilul Alpha Tech',
        descriere:
          'Monitoarele "ies" din depozit. Dacă au fost cumpărate la 1.200 lei/buc, costul total descărcat este 12.000 lei.',
        explicatie:
          'Descărcarea se face la COSTUL DE ACHIZIȚIE, nu la prețul de vânzare. Diferența 15.000 - 12.000 = 3.000 lei = marja brută a operațiunii.',
        culoare: '#8B5CF6',
        icon: '📤',
        articolContabil: {
          tip: 'simplu',
          linii: [
            {
              cont: '607',
              denumire: 'Cheltuieli privind mărfurile',
              functie: 'A',
              pozitie: 'D',
              suma: 12000,
              explicatie: 'Cheltuiala firmei crește cu costul de achiziție al mărfii vândute.',
            },
            {
              cont: '371',
              denumire: 'Mărfuri',
              functie: 'A',
              pozitie: 'C',
              suma: 12000,
              explicatie: 'Stocul de marfă scade cu valoarea celor vândute.',
            },
          ],
          formula: '607 = 371',
          interpretare:
            'Marja brută = 707 (15.000) − 607 (12.000) = 3.000 lei. Aceasta se va vedea în contul 121 "Profit sau pierdere" la închiderea lunii.',
        },
      },
      {
        nr: 5,
        zi: 'Ziua 30',
        titlu: 'Încasarea ulterioară',
        document: 'Extras de cont',
        emis_de: 'BCR',
        descriere:
          'După 30 de zile, Beta Distribution face transferul de 18.150 lei. Extrasul de cont confirmă tranzacția.',
        explicatie: 'Aceasta este faza finală - stinge creanța 4111.',
        culoare: '#06B6D4',
        icon: '🏦',
        articolContabil: {
          tip: 'simplu',
          linii: [
            {
              cont: '5121',
              denumire: 'Conturi la bănci în lei',
              functie: 'A',
              pozitie: 'D',
              suma: 18150,
              explicatie: 'Banii ajung în contul bancar al firmei.',
            },
            {
              cont: '4111',
              denumire: 'Clienți',
              functie: 'A',
              pozitie: 'C',
              suma: 18150,
              explicatie: 'Creanța față de Beta se stinge - clientul a plătit.',
            },
          ],
          formula: '5121 = 4111',
          interpretare:
            'Circuitul este închis: marfa a ieșit, factura a fost emisă, banii au intrat. Soldul contului 4111 pentru Beta = 0.',
        },
      },
    ],
    rezumat:
      'Vânzarea B2B: comandă → (aviz opțional) → factură → descărcare gestiune → încasare. Marja brută se calculează ca diferența între prețul de vânzare (707) și costul de achiziție (607).',
  },

  plata: {
    id: 'plata',
    titlu: 'Fluxul complet: Plată către furnizor',
    emoji: '💳',
    poveste:
      'Alpha Tech SRL are de plătit 18.150 lei către TechProvider SRL pentru factura FF-2025-0001. Cum decide cum plătește și ce documente generează?',
    contextEconomic:
      'Plata stinge o datorie. Înainte de orice plată, contabilul răspunde la 3 întrebări: (1) Cui plătesc? (2) Pentru ce factură? (3) Prin ce instrument - numerar sau bancă?',
    pasi: [
      {
        nr: 1,
        zi: 'Ziua 0',
        titlu: 'Decizia: cash sau bancă?',
        document: 'Analiză plafoane',
        emis_de: 'Contabil',
        descriere:
          'Suma de 18.150 lei este peste plafonul de 5.000 lei/zi pentru numerar (Legea 70/2015). Deci plata trebuie făcută prin bancă.',
        explicatie:
          'Plafonul cash între firme = 5.000 lei/zi/furnizor. Fragmentarea pentru a evita plafonul este expres interzisă (sancțiune 25% din suma fragmentată, min. 500 lei - art. 12 Legea 70/2015).',
        culoare: '#F59E0B',
        icon: '⚖️',
      },
      {
        nr: 2,
        zi: 'Ziua 1',
        titlu: 'Emiterea ordinului de plată',
        document: 'Ordin de plată',
        emis_de: 'Alpha Tech',
        descriere:
          'Contabilul completează OP în internet banking: plătitor (Alpha Tech, IBAN RO49...), beneficiar (TechProvider, IBAN RO77...), suma 18.150 lei, explicație "C/v factură FF-2025-0001".',
        explicatie:
          'IBAN-ul are 24 caractere (RO + 22). Explicația plății este OBLIGATORIE pentru trasabilitate. CUI cu prefix RO obligatoriu pentru plătitorii TVA.',
        culoare: '#10B981',
        icon: '🏦',
      },
      {
        nr: 3,
        zi: 'Ziua 1',
        titlu: 'Banca execută plata',
        document: 'Extras de cont',
        emis_de: 'BCR',
        descriere:
          'Banca debitează contul Alpha Tech și creditează contul TechProvider. Apare în extrasul de cont al ambelor firme.',
        explicatie: 'Extrasul de cont este documentul justificativ esențial pentru orice plată bancară.',
        culoare: '#06B6D4',
        icon: '📑',
      },
      {
        nr: 4,
        zi: 'Ziua 1',
        titlu: 'Înregistrarea în contabilitate',
        document: 'Notă contabilă',
        emis_de: 'Contabil',
        descriere: 'Pe baza OP-ului și a extrasului, contabilul scrie articolul.',
        explicatie:
          'Articolul este simplu: scade datoria (401) și scade soldul bancar (5121). Patrimoniul total al firmei rămâne neschimbat - doar se "rearanjează".',
        culoare: '#8B5CF6',
        icon: '📝',
        articolContabil: {
          tip: 'simplu',
          linii: [
            {
              cont: '401',
              denumire: 'Furnizori',
              functie: 'P',
              pozitie: 'D',
              suma: 18150,
              explicatie: 'Datoria scade - am plătit ce datoram.',
            },
            {
              cont: '5121',
              denumire: 'Conturi la bănci în lei',
              functie: 'A',
              pozitie: 'C',
              suma: 18150,
              explicatie: 'Banii din cont scad - am dat banii furnizorului prin bancă.',
            },
          ],
          formula: '401 = 5121',
          interpretare:
            'Soldul contului 401 pentru TechProvider devine 0 - datoria este complet stinsă. Patrimoniul total nu se schimbă: -18.150 din bancă, dar și -18.150 din datorii.',
        },
      },
    ],
    alternativaCash: {
      titlu: 'Alternativa: plată cash (pentru sume sub 5.000 lei)',
      descriere:
        'Dacă suma ar fi fost 4.500 lei (sub plafon), Alpha Tech putea plăti cash. Furnizorul ar fi emis chitanță. Articolul: 401 = 5311.',
    },
    rezumat:
      'Plata urmează 4 pași: decizia cash/bancă (verificare plafoane) → emitere OP/chitanță → confirmare prin extras → înregistrare. Articolul de bază: 401 = 5121 (bancar) sau 401 = 5311 (cash).',
  },

  incasare: {
    id: 'incasare',
    titlu: 'Fluxul complet: Încasare de la clienți',
    emoji: '💰',
    poveste:
      'Alpha Tech SRL încasează banii de la clienți în 3 moduri diferite: transfer bancar, cash de la firmă și card de la persoane fizice. Hai să le vedem pe toate.',
    contextEconomic:
      'Încasarea transformă o creanță (drept de a primi bani - cont 4111) în lichiditate efectivă (bani în cont sau cash). Este faza finală a ciclului de vânzare.',
    pasi: [
      {
        nr: 1,
        zi: 'Cazul 1',
        titlu: 'Încasare prin transfer bancar (B2B)',
        document: 'Extras de cont',
        emis_de: 'BCR',
        descriere:
          'Beta Distribution transferă 18.150 lei. Banii ajung în contul Alpha Tech. Extrasul confirmă încasarea.',
        explicatie:
          'Pentru B2B, transferul bancar este metoda preferată - sigură, fără plafoane, ușor de urmărit.',
        culoare: '#06B6D4',
        icon: '🏦',
        articolContabil: {
          tip: 'simplu',
          linii: [
            { cont: '5121', denumire: 'Conturi la bănci', functie: 'A', pozitie: 'D', suma: 18150, explicatie: 'Banii intră în cont.' },
            { cont: '4111', denumire: 'Clienți', functie: 'A', pozitie: 'C', suma: 18150, explicatie: 'Creanța se stinge.' },
          ],
          formula: '5121 = 4111',
          interpretare: 'Cea mai simplă încasare. Soldul 4111 pentru Beta = 0.',
        },
      },
      {
        nr: 2,
        zi: 'Cazul 2',
        titlu: 'Încasare cash de la persoană juridică',
        document: 'Chitanță emisă',
        emis_de: 'Alpha Tech',
        descriere:
          'Un client persoană juridică plătește 3.000 lei cash (sub plafonul de 5.000 lei). Alpha Tech emite chitanță.',
        explicatie:
          'Plafon: max 5.000 lei/zi/persoană juridică. Pentru persoane fizice nu se emite chitanță, ci bon fiscal.',
        culoare: '#F59E0B',
        icon: '💵',
        articolContabil: {
          tip: 'simplu',
          linii: [
            { cont: '5311', denumire: 'Casa în lei', functie: 'A', pozitie: 'D', suma: 3000, explicatie: 'Casieria crește cu banii primiți.' },
            { cont: '4111', denumire: 'Clienți', functie: 'A', pozitie: 'C', suma: 3000, explicatie: 'Creanța față de client se stinge.' },
          ],
          formula: '5311 = 4111',
          interpretare: 'Atenție la plafon: depășirea 5.000 lei = sancțiune 25% din depășire.',
        },
      },
      {
        nr: 3,
        zi: 'Cazul 3',
        titlu: 'Încasare cu card de la persoană fizică (B2C)',
        document: 'Bon fiscal + Raport Z',
        emis_de: 'Casa de marcat',
        descriere:
          'O persoană fizică cumpără 2 căști audio la 250 lei/buc (cu TVA inclus) = 500 lei. Plătește cu cardul.',
        explicatie:
          'OBLIGATORIU casa de marcat (OUG 28/1999). Bonul fiscal este documentul minim. La final de zi, Raportul Z agregează toate vânzările.',
        culoare: '#10B981',
        icon: '🎫',
        articolContabil: {
          tip: 'compus',
          linii: [
            { cont: '5125', denumire: 'Sume în curs de decontare card', functie: 'A', pozitie: 'D', suma: 500, explicatie: 'Banii vin pe card - până ajung în cont, sunt în "curs de decontare".' },
            { cont: '707', denumire: 'Venituri din vânzarea mărfurilor', functie: 'P', pozitie: 'C', suma: 413.22, explicatie: 'Venitul fără TVA: 500 / 1.21 = 413.22 lei.' },
            { cont: '4427', denumire: 'TVA colectată', functie: 'P', pozitie: 'C', suma: 86.78, explicatie: 'TVA colectată: 500 - 413.22 = 86.78 lei (21%).' },
          ],
          formula: '5125 = % ⟹ 5125 = 707 + 4427',
          interpretare:
            'Diferență față de B2B: nu există creanță 4111 (banii vin imediat). Următoarea zi când banii intră în cont: 5121 = 5125.',
        },
      },
    ],
    rezumat:
      'Trei tipuri de încasare cu logici diferite: transfer (5121=4111), cash B2B (5311=4111), card B2C (5125=%/707/4427). Esențial: respectarea plafoanelor și folosirea documentului potrivit.',
  },
};

export const FLUXURI_LIST = Object.values(FLUXURI);