// Tutorial pedagogic pentru începători absoluți (anul 1 FEAA)
// 4 mini-lecții introductive

export const TUTORIAL = {
  lectii: [
    {
      id: 'l1',
      titlu: 'Ce e contabilitatea?',
      subtitlu: 'Lecția 1 din 4',
      emoji: '📚',
      culoare: '#4F46E5',
      continut: [
        {
          tip: 'paragraf',
          text: 'Contabilitatea este "limbajul universal al afacerilor" — sistemul prin care înregistrăm tot ce intră și iese dintr-o firmă: bani, bunuri, datorii.',
        },
        {
          tip: 'paragraf',
          text: 'În România, contabilitatea este OBLIGATORIE pentru toate societățile, PFA-urile și ONG-urile (Legea 82/1991).',
        },
        {
          tip: 'highlight',
          text: 'De ce există documente?',
        },
        {
          tip: 'citat',
          text: '"Orice operațiune economico-financiară efectuată se consemnează în momentul efectuării ei într-un document care stă la baza înregistrărilor în contabilitate."',
          sursa: 'Legea 82/1991, art. 6 alin. (1)',
        },
        {
          tip: 'paragraf',
          text: 'Documentele justificative sunt "actele de naștere" ale fiecărei operațiuni. Fără document, nu există înregistrare contabilă.',
        },
        {
          tip: 'exemplu',
          text: 'Exemplu: Cumperi un laptop la magazin → primești bon fiscal. Plătești cu card → POS emite chitanță. Magazinul descarcă stocul → emite NIR intern. Trei documente pentru o singură operațiune.',
        },
      ],
      quiz: {
        intrebare: 'Care este documentul minim obligatoriu la o vânzare către persoană fizică?',
        optiuni: [
          { text: 'Factură fiscală', corect: false },
          { text: 'Bon fiscal', corect: true },
          { text: 'Chitanță', corect: false },
          { text: 'NIR', corect: false },
        ],
        explicatie:
          'Bonul fiscal este obligatoriu pentru vânzările B2C (către persoane fizice), conform OUG 28/1999. Factura se emite doar la cererea clientului sau peste anumite plafoane.',
      },
    },
    {
      id: 'l2',
      titlu: 'Bilanțul: oglinda firmei',
      subtitlu: 'Lecția 2 din 4',
      emoji: '⚖️',
      culoare: '#10B981',
      continut: [
        {
          tip: 'paragraf',
          text: 'PATRIMONIUL este totalitatea bunurilor, drepturilor și obligațiilor unei firme la un moment dat.',
        },
        {
          tip: 'box',
          titlu: 'ACTIV',
          continut: '"Ce ai"',
          detalii: [
            'Bani (5121 - bancă, 5311 - casă)',
            'Bunuri (371 - mărfuri, 2131 - utilaje)',
            'Creanțe (4111 - clienți)',
          ],
          culoare: '#10B981',
        },
        {
          tip: 'box',
          titlu: 'PASIV',
          continut: '"De unde ai"',
          detalii: [
            'Capital propriu (101 - capital social)',
            'Datorii (401 - furnizori, 4423 - TVA)',
            'Rezultate (121 - profit/pierdere)',
          ],
          culoare: '#EF4444',
        },
        {
          tip: 'highlight',
          text: 'ACTIV = PASIV (mereu)',
        },
        {
          tip: 'paragraf',
          text: 'Aceasta este ECUAȚIA FUNDAMENTALĂ a contabilității. Totul "stă în picioare" întotdeauna.',
        },
        {
          tip: 'exemplu',
          text: 'Exemplu Alpha Tech la înființare: asociații depun 1.000 lei capital social în cont.\n• ACTIV: 5121 (bani în cont) = 1.000 lei\n• PASIV: 1012 (capital social) = 1.000 lei\n• Verificare: 1.000 = 1.000 ✓',
        },
      ],
      quiz: {
        intrebare: 'Dacă firma cumpără un laptop de 3.000 lei cu banii din cont, ce se întâmplă?',
        optiuni: [
          { text: 'Activul crește cu 3.000', corect: false },
          { text: 'Pasivul scade cu 3.000', corect: false },
          { text: 'Activul rămâne neschimbat - se rearanjează', corect: true },
          { text: 'Apare un nou pasiv', corect: false },
        ],
        explicatie:
          'Banii (5121) scad cu 3.000, dar marfa (371) crește cu 3.000. Activul total rămâne la fel - elementele s-au "rearanjat" în interior.',
      },
    },
    {
      id: 'l3',
      titlu: 'Conturile și partida dublă',
      subtitlu: 'Lecția 3 din 4',
      emoji: '⚖️',
      culoare: '#F59E0B',
      continut: [
        {
          tip: 'paragraf',
          text: 'Un CONT este o "fișă" cu 2 coloane: DEBIT (stânga) și CREDIT (dreapta).',
        },
        {
          tip: 'cont_t',
          numeCont: 'Exemplu cont: 371 Mărfuri',
        },
        {
          tip: 'box',
          titlu: 'Conturi de ACTIV',
          continut: 'Cresc prin DEBIT, scad prin CREDIT',
          detalii: [
            '371, 5121, 5311, 4111, 4426',
            'Sold final pe Debit (sau zero)',
            'Mnemonic: "A - D la creștere"',
          ],
          culoare: '#10B981',
        },
        {
          tip: 'box',
          titlu: 'Conturi de PASIV',
          continut: 'Cresc prin CREDIT, scad prin DEBIT',
          detalii: [
            '401, 4427, 4423, 101, 121-profit',
            'Sold final pe Credit (sau zero)',
            'Mnemonic: "P - C la creștere"',
          ],
          culoare: '#EF4444',
        },
        {
          tip: 'highlight',
          text: 'PRINCIPIUL PARTIDEI DUBLE',
        },
        {
          tip: 'paragraf',
          text: 'Orice operațiune economică afectează MINIM 2 conturi, iar suma în Debit = suma în Credit.',
        },
        {
          tip: 'exemplu',
          text: 'Cumperi marfă cu numerar 100 lei:\n• 371 "Mărfuri" (Activ) crește → D 100\n• 5311 "Casa" (Activ) scade → C 100\n\nArticol contabil: 371 = 5311 — 100 lei\nVerificare: D = C ✓',
        },
      ],
      quiz: {
        intrebare: 'Contul 401 "Furnizori" crește prin...',
        optiuni: [
          { text: 'Debit (este cont de Activ)', corect: false },
          { text: 'Credit (este cont de Pasiv)', corect: true },
          { text: 'Debit (este o datorie)', corect: false },
          { text: 'Credit (este o cheltuială)', corect: false },
        ],
        explicatie:
          '401 "Furnizori" este un cont de PASIV (datorie). Pasivele cresc prin CREDIT la apariția datoriei (când primim factura) și scad prin DEBIT la stingerea ei (când plătim).',
      },
    },
    {
      id: 'l4',
      titlu: 'Cele 7 documente esențiale',
      subtitlu: 'Lecția 4 din 4',
      emoji: '📑',
      culoare: '#8B5CF6',
      continut: [
        {
          tip: 'paragraf',
          text: 'În activitatea zilnică a unei firme, vei întâlni 7 documente fundamentale:',
        },
        {
          tip: 'lista_docs',
          documente: [
            {
              icon: '🧾',
              nume: 'Factură',
              cand: 'Vânzare/cumpărare B2B',
              cont: '4111 sau 401',
            },
            {
              icon: '🚚',
              nume: 'Aviz de însoțire',
              cand: 'Marfa pleacă fără factură',
              cont: '—',
            },
            {
              icon: '📦',
              nume: 'NIR',
              cand: 'Recepție în gestiune (6 cazuri)',
              cont: '371',
            },
            {
              icon: '💵',
              nume: 'Chitanță',
              cand: 'Plată/încasare numerar',
              cont: '5311',
            },
            {
              icon: '🏦',
              nume: 'Ordin de plată',
              cand: 'Plată prin bancă',
              cont: '5121',
            },
            {
              icon: '🎫',
              nume: 'Bon fiscal',
              cand: 'Vânzare către populație',
              cont: '5311/5125',
            },
            {
              icon: '📑',
              nume: 'Extras de cont',
              cand: 'Confirmă tranzacții bancare',
              cont: '5121',
            },
          ],
        },
        {
          tip: 'highlight',
          text: 'Lanțul cauză → efect',
        },
        {
          tip: 'paragraf',
          text: 'Cumperi laptop → primești factură → înregistrezi 371+4426=401 → plătești prin OP → primești extras → înregistrezi 401=5121. Lanțul este perfect închis.',
        },
        {
          tip: 'paragraf',
          text: 'Acum ești gata să explorezi cele 4 module ale aplicației!',
        },
      ],
      quiz: {
        intrebare: 'Care document confirmă o plată bancară?',
        optiuni: [
          { text: 'Ordin de plată', corect: false },
          { text: 'Extras de cont', corect: true },
          { text: 'Chitanță', corect: false },
          { text: 'Factură', corect: false },
        ],
        explicatie:
          'OP-ul este doar instrucțiunea către bancă. Extrasul de cont, emis de bancă, este documentul justificativ care confirmă că tranzacția s-a executat efectiv.',
      },
    },
  ],
};
