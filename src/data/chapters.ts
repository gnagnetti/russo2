import { SectionInfo } from '../types';

export const SECTIONS_DATA: SectionInfo[] = [
  {
    id: 'section_1',
    number: 'I',
    titleRussian: 'Падежные формы существительных, прилагательных и числительных',
    titleItalian: 'Forme dei Casi per Sostantivi, Aggettivi e Numerali',
    author: 'А.В. Величко (A.V. Velichko)',
    descriptionItalian:
      'Ripasso sistematico del sistema casuale russo: significati fondamentali di ciascun caso con e senza preposizione, declinazione di sostantivi e aggettivi, e la sintassi speciale dei numerali (2, 3, 4).',
    subtopics: [
      {
        id: 's1_genitive',
        titleItalian: 'Genitivo (Родительный падеж)',
        titleRussian: 'Родительный падеж без предлога и с предлогом',
        summary:
          'Possesso (книга сестры), assenza/negazione (нет времени, не было сестры), partitivo e quantità (кусок сахара, стакан чаю), comparativi (дороже золота) e preposizioni spaziali/temporali (у, около, из, от, до, после).',
        exerciseCount: 6,
      },
      {
        id: 's1_dative',
        titleItalian: 'Dativo (Дательный падеж)',
        titleRussian: 'Дательный падеж без предлога и с предлогом',
        summary:
          'Destinatario dell’azione (подарить подарок девушке), verbi di aiuto e ostacolo (помогать товарищу, мешать работе), costrutti impersonali (студенту нужно, больному нельзя) e preposizioni к (moto verso persone/oggetti) e по (percorso/materia).',
        exerciseCount: 5,
      },
      {
        id: 's1_accusative',
        titleItalian: 'Accusativo (Винительный падеж)',
        titleRussian: 'Винительный падеж без предлога и с предлогом',
        summary:
          'Oggetto diretto (читать книгу, встретить друга), durata temporale senza preposizione (отдыхать неделю), moto a luogo con в/на (идти в школу) e preposizioni attraverso/su (через улицу, говорить про поездку).',
        exerciseCount: 5,
      },
      {
        id: 's1_instrumental',
        titleItalian: 'Strumentale (Творительный падеж)',
        titleRussian: 'Творительный падеж без предлога и с предлогом',
        summary:
          'Strumento/mezzo (писать карандашом), predicato con verbi di stato/divenire (быть инженером, стать врачом, являться причиной), reggenza di gestione/possesso (руководить работой, владеть языком), interesse (увлекаться спортом) e compagnia con la preposizione с/со (гулять с другом).',
        exerciseCount: 6,
      },
      {
        id: 's1_prepositional',
        titleItalian: 'Preposizionale (Предложный падеж)',
        titleRussian: 'Предложный падеж с предлогом о/об, в/на',
        summary:
          'Argomento di discorso/pensiero (думать о друге, говорить об искусстве), stato in luogo con в/на (в университете, на вокзале) e le forme speciali locative in -у́/-ю́ (в лесу, на берегу, в шкафу, в углу, в этом году).',
        exerciseCount: 5,
      },
      {
        id: 's1_numerals',
        titleItalian: 'Numerali e Concordanze (два, три, четыре)',
        titleRussian: 'Сочетания числительных с существительными и прилагательными',
        summary:
          'Regole rigorose per i numeri 2, 3, 4: reggono il sostantivo al Genitivo singolare; l’aggettivo posto tra il numero e il sostantivo va al Genitivo plurale (maschili/neutri: два новых дома) o al Nominativo plurale (femminili: две новые книги).',
        exerciseCount: 5,
      },
    ],
  },
  {
    id: 'section_2',
    number: 'II',
    titleRussian: 'Отработка глагольного и именного управления. Общелитературная лексика',
    titleItalian: 'Reggenza Verbale e Nominale: Lessico General-Letterario',
    author: 'А.В. Величко (A.V. Velichko)',
    descriptionItalian:
      'Il nucleo operativo del manuale: verbi prefissati, gruppi semantici di verbi ed espressioni a reggenza complessa, parole con reggenza variabile e testi tematici di vita quotidiana e cultura russa.',
    subtopics: [
      {
        id: 's2_base',
        titleItalian: 'Lessico di Base (Базовая лексика)',
        titleRussian: 'Часть 1. Закрепление управления базовой лексики',
        summary:
          'Verbi quotidiani frequenti: учиться где, заниматься чем, интересоваться чем, помогать кому, надеяться на что, скучать по кому, нуждаться в чём.',
        exerciseCount: 6,
      },
      {
        id: 's2_prefixes',
        titleItalian: 'Blocco I: Verbi Prefissati e Modelli di Derivazione',
        titleRussian: 'Блок I. Приставочные глаголы (брать, писать, читать, до-, в-..-ся)',
        summary:
          'Come i prefissi cambiano la reggenza: брать что vs набрать чего; писать что vs переписываться с кем vs выписать из чего; читать что vs вчитаться во что vs дочитать до чего.',
        exerciseCount: 6,
      },
      {
        id: 's2_semantic',
        titleItalian: 'Blocco II: Gruppi Semantici',
        titleRussian: 'Блок II. Семантические группы глаголов',
        summary:
          'Atteggiamento negativo (жаловаться на кого/что, сердиться на кого), contatto fisico (ударить по чему, коснуться чего), reazioni emotive (радоваться чему, поражаться чему), aiuto e ostacolo (способствовать чему, вредить чему).',
        exerciseCount: 6,
      },
      {
        id: 's2_variable',
        titleItalian: 'Blocco III: Parole con Reggenza Variabile',
        titleRussian: 'Блок III. Слова с вариативным управлением',
        summary:
          'Cambiamento di caso in base al significato: верить кому (credere a qualcuno) vs верить в кого/во что (aver fede in Dio o negli ideali); радоваться чему (rallegrarsi per una cosa) vs радоваться за кого (essere felice per una persona); согласиться с кем vs согласиться на что.',
        exerciseCount: 8,
      },
      {
        id: 's2_themes',
        titleItalian: 'Blocco IV: Temi di Conversazione e Cultura',
        titleRussian: 'Блок IV. Лексика, связанная с темами бесед',
        summary:
          'Reggenze nei contesti tematici autentici: Routine giornaliera, La Città di Mosca e il Cremlino, Sport, Apprendimento delle lingue, Galateo (Этикет), Oratoria, Ecologia, Pittura russa (Vrubel\', Serov, Savrasov, Repin), Musica e Opera (Musorgskij), Tesi di laurea.',
        exerciseCount: 10,
      },
    ],
  },
  {
    id: 'section_3',
    number: 'III',
    titleRussian: 'Отработка глагольного и именного управления. Общенаучная лексика',
    titleItalian: 'Reggenza Verbale e Nominale: Lessico Scientifico',
    author: 'О.Н. Башлакова (O.N. Bashlakova)',
    descriptionItalian:
      'Il linguaggio accademico, filologico e scientifico: strutture sintattiche tipiche dei testi critici, linguistici e storici, la lessicografia dizionoriale e l\'analisi del capolavoro della Rus\' medievale "Слово о полку Игореве".',
    subtopics: [
      {
        id: 's3_philology',
        titleItalian: 'La Filologia e la Linguistica come Scienza',
        titleRussian: 'Тема 1-2. Филология как наука и русский язык',
        summary:
          'Formule accademiche: наука состоит из чего, относится к чему, делится на что, оказывает влияние на что, проявляется в чём.',
        exerciseCount: 6,
      },
      {
        id: 's3_lexicography',
        titleItalian: 'Dizionari e Struttura della Voce Lessicografica',
        titleRussian: 'Тема 4-5. Словари и структура словарной статьи',
        summary:
          'Terminologia dizionoriale: толковый словарь Даля, снабжаться пометами, фиксироваться в словаре, глагол аннотировать управляет чем, вытекать из чего.',
        exerciseCount: 6,
      },
      {
        id: 's3_literature',
        titleItalian: 'Folklore Russo e «Слово о полку Игореве»',
        titleRussian: 'Тема 7-8. Русский фольклор и древнерусская литература',
        summary:
          'Analisi critica del capolavoro medievale e del folklore: восходить к чему, свидетельствовать о чём, призывать к чему, видит причину в чём, противостоять чему.',
        exerciseCount: 6,
      },
      {
        id: 's3_styles',
        titleItalian: 'Stili Funzionali della Lingua Russa',
        titleRussian: 'Тема 9. Функциональные стили русского языка',
        summary:
          'Il registro научный, официально-деловой, разговорный e публицистический: характеризоваться чем, быть свойственным чему, обусловливаться чем, сводиться к чему.',
        exerciseCount: 6,
      },
    ],
  },
];
