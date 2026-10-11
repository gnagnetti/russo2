export interface DeclensionTable {
  id: string;
  title: string;
  subtitle: string;
  tableNumber: string;
  notes: string[];
  columns: string[];
  rows: {
    caseName: string;
    caseAbbr: string;
    cells: string[];
  }[];
}

export const GRAMMAR_TABLES: DeclensionTable[] = [
  {
    id: 'table_1',
    tableNumber: 'Таблица 1',
    title: 'Declinazione Sostantivi Maschili (Prima Declinazione)',
    subtitle: 'Base dura, con consonanti gutturali (к, г, х), ц ed esiti su -ец',
    notes: [
      'I sostantivi animati hanno l\'Accusativo identico al Genitivo sia al singolare che al plurale.',
      'I sostantivi inanimati hanno l\'Accusativo identico al Nominativo.',
      'Dopo шипящие (ж, ш, щ, ч) e ц al singolare si scrive -ом sotto accento, -ем atono (месяцем, пальцем).',
      'Alcuni sostantivi maschili al preposizionale con в/на assumono la desinenza tonica speciale -у́/-ю́: в лесу́, в саду́, на берегу́, в углу́, на мосту́, в этом году́.',
    ],
    columns: ['Caso', 'Qualsiasi cons.', 'к, г, х', 'ц', '-ец'],
    rows: [
      { caseName: 'Nominativo sing.', caseAbbr: 'И. ед.', cells: ['стол / артист', 'флаг / ученик', 'месяц / принц', 'танец / отец'] },
      { caseName: 'Genitivo sing.', caseAbbr: 'Р. ед.', cells: ['стола / артиста', 'флага / ученика', 'месяца / принца', 'танца / отца'] },
      { caseName: 'Dativo sing.', caseAbbr: 'Д. ед.', cells: ['столу / артисту', 'флагу / ученику', 'месяцу / принцу', 'танцу / отцу'] },
      { caseName: 'Accusativo sing.', caseAbbr: 'В. ед.', cells: ['стол / артиста', 'флаг / ученика', 'месяц / принца', 'танец / отца'] },
      { caseName: 'Strumentale sing.', caseAbbr: 'Т. ед.', cells: ['столом / артистом', 'флагом / учеником', 'месяцем / принцем', 'танцем / отцом'] },
      { caseName: 'Preposizionale sing.', caseAbbr: 'П. ед.', cells: ['о столе / артисте', 'о флаге / ученике', 'о месяце / принце', 'о танце / отце'] },
      { caseName: 'Nominativo plur.', caseAbbr: 'И. мн.', cells: ['столы / артисты', 'флаги / ученики', 'месяцы / принцы', 'танцы / отцы'] },
      { caseName: 'Genitivo plur.', caseAbbr: 'Р. мн.', cells: ['столов / артистов', 'флагов / учеников', 'месяцев / принцев', 'танцев / отцов'] },
      { caseName: 'Dativo plur.', caseAbbr: 'Д. мн.', cells: ['столам / артистам', 'флагам / ученикам', 'месяцам / принцам', 'танцам / отцам'] },
      { caseName: 'Accusativo plur.', caseAbbr: 'В. мн.', cells: ['столы / артистов', 'флаги / учеников', 'месяцы / принцев', 'танцы / отцов'] },
      { caseName: 'Strumentale plur.', caseAbbr: 'Т. мн.', cells: ['столами / артистами', 'флагами / учениками', 'месяцами / принцами', 'танцами / отцами'] },
      { caseName: 'Preposizionale plur.', caseAbbr: 'П. мн.', cells: ['о столах / артистах', 'о флагах / учениках', 'о месяцах / принцах', 'о танцах / отцах'] },
    ],
  },
  {
    id: 'table_2',
    tableNumber: 'Таблица 2',
    title: 'Sostantivi Maschili con Base Morbida, Sibilanti e -ий',
    subtitle: 'Esempi: портфель, нож, товарищ, музей, герой, комментарий',
    notes: [
      'I nomi in -ий al preposizionale singolare escono eccezionalmente in -ии: о комментарии, о планетарии.',
      'I sostantivi con base in шипящая (ж, ш, щ, ч) al genitivo plurale escono in -ей: ножей, товарищей, карандашей.',
    ],
    columns: ['Caso', 'Segno debole -ь', 'ж, ш, щ, ч', '-й', '-ий'],
    rows: [
      { caseName: 'Nominativo sing.', caseAbbr: 'И. ед.', cells: ['портфель / житель', 'нож / товарищ', 'музей / герой', 'комментарий'] },
      { caseName: 'Genitivo sing.', caseAbbr: 'Р. ед.', cells: ['портфеля / жителя', 'ножа / товарища', 'музея / героя', 'комментария'] },
      { caseName: 'Dativo sing.', caseAbbr: 'Д. ед.', cells: ['портфелю / жителю', 'ножу / товарищу', 'музею / герою', 'комментарию'] },
      { caseName: 'Accusativo sing.', caseAbbr: 'В. ед.', cells: ['портфель / жителя', 'нож / товарища', 'музей / героя', 'комментарий'] },
      { caseName: 'Strumentale sing.', caseAbbr: 'Т. ед.', cells: ['портфелем / жителем', 'ножом / товарищем', 'музеем / героем', 'комментарием'] },
      { caseName: 'Preposizionale sing.', caseAbbr: 'П. ед.', cells: ['о портфеле / жителе', 'о ноже / товарище', 'о музее / герое', 'о комментарии'] },
      { caseName: 'Genitivo plur.', caseAbbr: 'Р. мн.', cells: ['портфелей / жителей', 'ножей / товарищей', 'музеев / героев', 'комментариев'] },
    ],
  },
  {
    id: 'table_3',
    tableNumber: 'Таблица 3',
    title: 'Declinazione Sostantivi Neutri',
    subtitle: 'Esempi: окно, поле, облако, училище, сердце, здание (-ие)',
    notes: [
      'I neutri in -ие (здание, упражнение) prendono -ии al Preposizionale singolare: в здании, об упражнении.',
      'Genitivo plurale: desinenza zero per molti neutri in -о (окон, яблок), desinenza -ей per neutri in -е (полей) o -ий per quelli in -ие (зданий).',
    ],
    columns: ['Caso', 'In -о (окно)', 'In -е (поле)', 'In -ко (облако)', 'In -це/-ще', 'In -ие (здание)'],
    rows: [
      { caseName: 'Nominativo sing.', caseAbbr: 'И. ед.', cells: ['окно', 'поле', 'облако', 'сердце / училище', 'здание'] },
      { caseName: 'Genitivo sing.', caseAbbr: 'Р. ед.', cells: ['окна', 'поля', 'облака', 'сердца / училища', 'здания'] },
      { caseName: 'Dativo sing.', caseAbbr: 'Д. ед.', cells: ['окну', 'полю', 'облаку', 'сердцу / училищу', 'зданию'] },
      { caseName: 'Strumentale sing.', caseAbbr: 'Т. ед.', cells: ['окном', 'полем', 'облаком', 'сердцем / училищем', 'зданием'] },
      { caseName: 'Preposizionale sing.', caseAbbr: 'П. ед.', cells: ['об окне', 'о поле', 'об облаке', 'о сердце / об училище', 'о здании'] },
      { caseName: 'Nominativo plur.', caseAbbr: 'И. мн.', cells: ['окна', 'поля', 'облака', 'сердца / училища', 'здания'] },
      { caseName: 'Genitivo plur.', caseAbbr: 'Р. мн.', cells: ['окон', 'полей', 'облаков', 'сердец / училищ', 'зданий'] },
      { caseName: 'Dativo plur.', caseAbbr: 'Д. мн.', cells: ['окнам', 'полям', 'облакам', 'сердцам / училищам', 'зданиям'] },
    ],
  },
  {
    id: 'table_4',
    tableNumber: 'Таблица 4',
    title: 'Declinazione Sostantivi Femminili (Seconda Declinazione)',
    subtitle: 'Esempi: страна, земля, рука, туча, улица, линия (-ия), семья',
    notes: [
      'I femminili in -ия prendono -ии al Dativo e Preposizionale singolare (о линии, по лекции), a differenza di quelli in -а/-я che prendono -е.',
      'Nello strumentale singolare: desinenza -ой/-ей (stranoй, землёй).',
      'Genitivo plurale: desinenza zero (стран, рук, туч) o con vocale mobile inserita (семей, овец, земель).',
    ],
    columns: ['Caso', 'In -а (страна)', 'In -я (земля)', 'Gutturale (рука)', 'In -ца (улица)', 'In -ия (линия)'],
    rows: [
      { caseName: 'Nominativo sing.', caseAbbr: 'И. ед.', cells: ['страна', 'земля', 'рука', 'улица', 'линия'] },
      { caseName: 'Genitivo sing.', caseAbbr: 'Р. ед.', cells: ['страны', 'земли', 'руки', 'улицы', 'линии'] },
      { caseName: 'Dativo sing.', caseAbbr: 'Д. ед.', cells: ['стране', 'земле', 'руке', 'улице', 'линии'] },
      { caseName: 'Accusativo sing.', caseAbbr: 'В. ед.', cells: ['страну', 'землю', 'руку', 'улицу', 'линию'] },
      { caseName: 'Strumentale sing.', caseAbbr: 'Т. ед.', cells: ['страной', 'землёй', 'рукой', 'улицей', 'линией'] },
      { caseName: 'Preposizionale sing.', caseAbbr: 'П. ед.', cells: ['о стране', 'о земле', 'о руке', 'об улице', 'о линии'] },
      { caseName: 'Nominativo plur.', caseAbbr: 'И. мн.', cells: ['страны', 'земли', 'руки', 'улицы', 'линии'] },
      { caseName: 'Genitivo plur.', caseAbbr: 'Р. мн.', cells: ['стран', 'земель', 'рук', 'улиц', 'линий'] },
    ],
  },
  {
    id: 'table_5',
    tableNumber: 'Таблица 5',
    title: 'Terza Declinazione Femminile e Sostantivi Particolari',
    subtitle: 'Nomi femminili in -ь (жизнь, ночь, мать, дочь) e sostantivi neutri in -мя (имя, время) + путь',
    notes: [
      'I sostantivi in -мя (имя, время, знамя) inseriscono il suffisso -ен- in tutti i casi obliqui: имени, именем, имена, имён.',
      'Мать e дочь aggiungono il suffisso -ер- nei casi obliqui: матери, матерью, матерей.',
      'Путь è maschile ma si declina come la terza declinazione, tranne allo strumentale singolare (путём).',
    ],
    columns: ['Caso', 'жизнь (femm.)', 'ночь (femm.)', 'мать (femm.)', 'имя (neutro -мя)', 'путь (masch.)'],
    rows: [
      { caseName: 'Nominativo sing.', caseAbbr: 'И. ед.', cells: ['жизнь', 'ночь', 'мать', 'имя', 'путь'] },
      { caseName: 'Genitivo sing.', caseAbbr: 'Р. ед.', cells: ['жизни', 'ночи', 'матери', 'имени', 'пути'] },
      { caseName: 'Dativo sing.', caseAbbr: 'Д. ед.', cells: ['жизни', 'ночи', 'матери', 'имени', 'пути'] },
      { caseName: 'Accusativo sing.', caseAbbr: 'В. ед.', cells: ['жизнь', 'ночь', 'мать', 'имя', 'путь'] },
      { caseName: 'Strumentale sing.', caseAbbr: 'Т. ед.', cells: ['жизнью', 'ночью', 'матерью', 'именем', 'путём'] },
      { caseName: 'Preposizionale sing.', caseAbbr: 'П. ед.', cells: ['о жизни', 'о ночи', 'о матери', 'об имени', 'о пути'] },
      { caseName: 'Nominativo plur.', caseAbbr: 'И. мн.', cells: ['жизни', 'ночи', 'матери', 'имена', 'пути'] },
      { caseName: 'Genitivo plur.', caseAbbr: 'Р. мн.', cells: ['жизней', 'ночей', 'матерей', 'имён', 'путей'] },
      { caseName: 'Dativo plur.', caseAbbr: 'Д. мн.', cells: ['жизням', 'ночам', 'матерям', 'именам', 'путям'] },
      { caseName: 'Strumentale plur.', caseAbbr: 'Т. мн.', cells: ['жизнями', 'ночами', 'матерями', 'именами', 'путями'] },
    ],
  },
  {
    id: 'table_7_8',
    tableNumber: 'Таблицы 7-8',
    title: 'Declinazione degli Aggettivi (Maschile, Femminile, Neutro, Plurale)',
    subtitle: 'Radice dura (новый), morbida (синий), accentata (молодой) e sibilante (свежий, большой)',
    notes: [
      'Al Genitivo singolare maschile/neutro, la desinenza -ого/-его si pronuncia [аво] / [ева] (нового, синего).',
      'Accusativo inanimato maschile = Nominativo (новый дом); animato = Genitivo (нового студента).',
      'Nel plurale gli aggettivi non distinguono il genere grammaticale.',
    ],
    columns: ['Caso', 'Maschile duro', 'Maschile morbido', 'Femminile duro', 'Femminile morbido', 'Plurale'],
    rows: [
      { caseName: 'Nominativo', caseAbbr: 'И.', cells: ['новый / молодой', 'синий', 'новая / молодая', 'синяя', 'новые / синие'] },
      { caseName: 'Genitivo', caseAbbr: 'Р.', cells: ['нового / молодого', 'синего', 'новой / молодой', 'синей', 'новых / синих'] },
      { caseName: 'Dativo', caseAbbr: 'Д.', cells: ['новому / молодому', 'синему', 'новой / молодой', 'синей', 'новым / синим'] },
      { caseName: 'Accusativo', caseAbbr: 'В.', cells: ['новый / нового', 'синий / синего', 'новую / молодую', 'синюю', 'новые / новых'] },
      { caseName: 'Strumentale', caseAbbr: 'Т.', cells: ['новым / молодым', 'синим', 'новой / молодой', 'синей', 'новыми / синими'] },
      { caseName: 'Preposizionale', caseAbbr: 'П.', cells: ['о новом / молодом', 'о синем', 'о новой / молодой', 'о синей', 'о новых / о синих'] },
    ],
  },
];

export const SYNTACTIC_RULES_SUMMARY = [
  {
    title: 'La Regola d’Oro dei Numerali 2, 3, 4 (два, три, четыре)',
    ruleRussian: 'два/три/четыре + Существительное в Р. п. ед. ч. | Прилагательное в Р. п. мн. ч. (м./ср.) или И. п. мн. ч. (жен.)',
    ruleItalian:
      'Quando un numero è 2, 3, 4 (o composto terminante in 2, 3, 4 come 22, 53, 104):\n' +
      '1. Il sostantivo va SEMPRE al Genitivo Singolare (два стола, три книги, четыре окна).\n' +
      '2. L\'aggettivo interposto va al Genitivo Plurale se il sostantivo è maschile o neutro (два новых стола, три больших окна).\n' +
      '3. L\'aggettivo interposto va preferibilmente al Nominativo Plurale se il sostantivo è femminile (две новые книги, три красивые девушки), sebbene sia ammesso anche il Genitivo plurale.\n' +
      '4. Se l\'aggettivo precede il numerale, va al Nominativo Plurale indipendentemente dal genere: первые два года, последние три недели.',
    examples: [
      'Два соседних дома были построены в прошлом году. (maschile)',
      'Две последние недели я провела за городом. (femminile)',
      'Первые два года учёбы были очень трудными. (aggettivo anteposto)',
    ],
  },
  {
    title: 'Verbi di Interesse e Passione (Творительный без предлога)',
    ruleRussian: 'увлекаться, интересоваться, заниматься, владеть, руководить + Творительный падеж (Т. п.)',
    ruleItalian:
      'I verbi che esprimono passione, occupazione o padronanza reggono rigorosamente lo STRUMENTALE senza preposizione. È un errore comunissimo usare la preposizione "с" o "о".',
    examples: [
      'Мой друг увлекается лыжным спортом. (NON *с лыжным спортом)',
      'Студенты занимаются филологией. (NON *о филологии)',
      'Она свободно владеет русским языком.',
    ],
  },
  {
    title: 'Reggenze a Doppio Valore (Вариативное управление)',
    ruleRussian: 'верить кому vs верить во что | радоваться чему vs радоваться за кого',
    ruleItalian:
      'Alcuni verbi chiave cambiano caso e preposizione in base alla sfumatura semantica:\n' +
      '• ВЕРИТЬ КОМУ (Dativo) = fidarsi di una persona, credere alle sue parole («Я верю врачу»).\n' +
      '• ВЕРИТЬ В КОГО / ВО ЧТО (Accusativo con "в") = aver fede morale/spirituale («Я верю в победу», «Они верят в Бога»).\n' +
      '• РАДОВАТЬСЯ ЧЕМУ (Dativo) = gioire per un evento o fatto oggettivo («Дети радовались солнцу»).\n' +
      '• РАДОВАТЬСЯ ЗА КОГО (Accusativo con "за") = essere felice per una persona («Мы рады за нашего коллегу»).\n' +
      '• СОГЛАСИТЬСЯ С КЕМ (Strumentale con "с") = concordare con qualcuno («Я согласился с братом»).\n' +
      '• СОГЛАСИТЬСЯ НА ЧТО (Accusativo con "на") = acconsentire a una proposta/condizione («Я согласен на эту работу»).',
    examples: [
      'Я верю ему: он никогда не лжёт. (Dativo: fiducia nelle parole)',
      'Она обязательно станет прекрасной учительницей, я верю в неё. (в + Accusativo: fede nelle sue capacità)',
      'Мы искренне радовались победе спортсменов. (Dativo: l\'evento)',
      'Мы очень рады за тебя! (за + Accusativo: la persona)',
    ],
  },
];
