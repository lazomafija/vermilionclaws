import sovereignNoirImage from '../../slike/bdb803c7-71a2-4eb6-a627-46d8a10f1228.jpeg';
import crimsonNocturneImage from '../../slike/7e56c4ad-3e4e-4187-8b0f-8344ca4227ea.jpg';
import gothicCathedralImage from '../../slike/IMG_0568.jpeg';
import vampiricVelvetImage from '../../slike/40122330-4973-41b2-b452-b96055a47c56.jpeg';
import sumskiBestijarijumImage from '../../slike/sumski-bestijarijum.png';
import obsidianRelicImage from '../../slike/d7e715e8-6660-4e28-82e1-19557a7d0ae4.jpeg';
import smaragdniSprajtImage from '../../slike/smaragdni-sprajt.png';
import glaziraniBiserImage from '../../slike/glazirani-biser.png';

export const PRODUCTS = [
  {
    id: 'sovereign-noir',
    title: 'Krvavi Relikvijar (Blood Reliquary)',
    subtitle: 'Bordo-crna gotika • ručno oslikani detalji',
    tier: 'relic',
    tierLabel: 'Nivo II — Relikvijar',
    price: 5000,
    priceEur: 42,
    shape: 'Kovčeg (Coffin)',
    length: 'Srednji (Medium)',
    finish: 'Bordo-crna baza sa ornamentalnim detaljima',
    description: 'Duboka crna i bordo nijansa susreću se sa sitnim gotskim ornamentima i metalik akcentima. Svaki nokat ima svoj detalj, pa set izgleda kao mala kolekcija mračnih relikvija.',
    features: [
      'Crno-bordo paleta',
      'Različiti ornamentalni motivi na svakom noktu',
      'Srebrni i rubinski akcenti'
    ],
    image: sovereignNoirImage,
    accentColor: '#BF1932',
    badge: 'Najprodavaniji',
    details: 'Upečatljiv set sa tamnom bazom, kontrastnim bordo detaljima i gotskim ornamentima.'
  },
  {
    id: 'crimson-nocturne',
    title: 'Astralni Nokturno (Celestial Nocturne)',
    subtitle: 'Plavi kosmos • zvezdani odsjaj',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 5000,
    priceEur: 42,
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Plavo-zeleni cat-eye sa zvezdanim detaljima',
    description: 'Duboka plava i smaragdna baza preliva se u svetlucave kosmičke tonove. Sitne zvezde i različiti motivi daju svakom noktu izgled malog noćnog neba.',
    features: [
      'Plavi i zeleni svetlucavi prelivi',
      'Zvezdani i kosmički motivi',
      'Dugačak, šiljat oblik'
    ],
    image: crimsonNocturneImage,
    accentColor: '#BF1932',
    badge: 'Limitirana Serija',
    details: 'Za ljubiteljke izražajnih, dugih noktiju sa kosmičkim sjajem i motivima.'
  },
  {
    id: 'gothic-cathedral',
    title: 'Zlatna Eklipsa (Gilded Eclipse)',
    subtitle: 'Ponoćno plava • zlatni ukrasi',
    tier: 'relic',
    tierLabel: 'Nivo II — Relikvijar',
    price: 5900,
    priceEur: 50,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: 'Tamna baza sa zlatnim reljefnim motivima',
    description: 'Tamno plavi, zeleni i ljubičasti tonovi ukrašeni su zlatnim simbolima i sjajnim detaljima. Nepravilan raspored motiva daje setu barokni, nebeski karakter.',
    features: [
      'Tamna višebojna baza',
      'Zlatni simboli i sjajni akcenti',
      'Srednja dužina i bademasti oblik'
    ],
    image: gothicCathedralImage,
    accentColor: '#4a060e',
    badge: 'Umetnički Izbor',
    details: 'Ornamentalan dizajn koji spaja tamne tonove sa zlatnim detaljima.'
  },
  {
    id: 'vampiric-velvet',
    title: 'Mesečev Trag (Moonlit Trace)',
    subtitle: 'Nude baza • nežne bronzane linije',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 3200,
    priceEur: 27,
    shape: 'Kovčeg (Coffin)',
    length: 'Srednji (Medium)',
    finish: 'Nude sjaj sa braon linijskim detaljima',
    description: 'Mlečno-nude podloga sa tankim, organskim braon linijama i diskretnim kristalnim akcentima. Svetliji dizajn sa elegantnim, prirodnim kontrastom.',
    features: [
      'Nude i krem nijanse',
      'Braon linijski uzorak',
      'Diskretni kristalni detalji'
    ],
    image: vampiricVelvetImage,
    accentColor: '#8a0a18',
    badge: 'Gotski Minimalizam',
    details: 'Nežnija opcija u kolekciji, sa sjajnom nude bazom i ručno oslikanim linijama.'
  },
  {
    id: 'sumski-bestijarijum',
    title: 'Šumski Bestijarijum (Sylvan Bestiary)',
    subtitle: 'Začarana šuma • 3D insekti, pečurke i krila leptira',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 4000,
    priceEur: 34,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: '3D reljefni detalji & ručno oslikani šumski motivi',
    description: 'Organski mikrokosmos začarane šume na vrhovima prstiju. Svaki nokat nosi poseban unikat — od reljefnih pečuraka, vilinog konjica i bubamare sa kapima rose, do smaragdnih krila insekata, nara i krila monarh leptira.',
    features: [
      '100% ručno oslikani šumski i botanički motivi',
      '3D reljefne pečurke, bubamara i kapi rose',
      'Detalji krila monarh leptira i vilinog konjica'
    ],
    image: sumskiBestijarijumImage,
    accentColor: '#2d5a27',
    badge: 'Unikatna Kolekcija',
    details: 'Ekskluzivna botanička fantazija sa bogatim 3D reljefima i mikro-detaljima inspirisanim prirodom.'
  },
  {
    id: 'smaragdni-sprajt',
    title: 'Smaragdni Sprajt (Emerald Sprite)',
    subtitle: 'Metalik roze • 3D zeleni sprajtovi & biseri',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 4000,
    priceEur: 34,
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Roze cat-eye sa 3D reljefnim skulpturama',
    description: 'Blistava roze cat-eye baza u kombinaciji sa reljefnim 3D zelenim sprajtovima, školjkastim talasima, nežnim biserima i sjajnim zvezdanim motivima. Svaki nokat nosi razigranu skulpturu.',
    features: [
      'Ručno vajani 3D sprajtovi u mint zelenoj boji',
      'Roze cat-eye magnetni sjaj i biseri',
      'Izduženi stiletto oblik sa zvezdanim cirkonima'
    ],
    image: smaragdniSprajtImage,
    accentColor: '#d64d8a',
    badge: '3D Skulptura',
    details: 'Unikatan hibrid Y2K fantazije i skulpturalnog 3D nail arta sa pastelnim detaljima.'
  },
  {
    id: 'glazirani-biser',
    title: 'Glazirani Biser (Glazed Pearl)',
    subtitle: 'Čisto bela • sedefasti hrom sjaj',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 2500,
    priceEur: 21,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: 'Biserni glaze premaz visokog sjaja',
    description: 'Suptilna čistoća i vanvremenska elegancija. Mlečno bela podloga obogaćena nežnim sedefastim hromom koji pri svakom pokretu prelama svetlost poput pravog morskog bisera.',
    features: [
      'Visokosjajni sedefasti glazed chrome finiš',
      'Univerzalna mlečno-bela nijansa',
      'Klasičan bademasti oblik udoban za svaki dan'
    ],
    image: glaziraniBiserImage,
    accentColor: '#e8e8ed',
    badge: 'Klasični Minimal',
    details: 'Čist, besprekorno gladak i minimalistički set inspirisan prirodnim sedefom i visokom modom.'
  },
  {
    id: 'obsidian-relic',
    title: 'Opalni Mozaik (Opal Mosaic)',
    subtitle: 'Biserno nude • kristalni akcenti',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 2800,
    priceEur: 24,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: 'Biserno nude sa kristalnim ukrasima',
    description: 'Svetla biserno-nude podloga ukrašena je sitnim kristalima u geometrijskim i krstastim rasporedima. Suptilan sjaj baze ostavlja prostor da šareni kamenčići budu u prvom planu.',
    features: [
      'Svetla biserno-nude baza',
      'Kristalni geometrijski detalji',
      'Srednja dužina i bademasti oblik'
    ],
    image: obsidianRelicImage,
    accentColor: '#30323a',
    badge: 'Klasična Tama',
    details: 'Elegantan svetliji set sa kristalnim motivima i nežnim bisernim odsjajem.'
  }
];

export const TIERS = [
  {
    id: 'all',
    name: 'Sve Kreacije',
    description: 'Pregledajte celokupnu arhivu ručno rađenih setova'
  },
  {
    id: 'minimal',
    name: 'Nivo I: Minimalna Tama',
    priceStarting: 'Od 2.500 RSD',
    description: 'Čiste linije, baršunasti mat finiši, sedefasti hrom i diskretni akcenti za svakodnevnu mistiku.'
  },
  {
    id: 'relic',
    name: 'Nivo II: Gotski Relikvijar',
    priceStarting: 'Od 5.000 RSD',
    description: '3D filigranski reljefi, gotske rozete, barokni ukrasi i ručno usađeni kristali.'
  },
  {
    id: 'couture',
    name: 'Nivo III: Krvava Rapsodija',
    priceStarting: 'Od 4.000 RSD',
    description: 'Vrhunska visoka moda — skulpturalni 3D detalji, tečni hrom, minijaturni reljefi i neograničena umetnička sloboda.'
  }
];

export const SIZING_GUIDE = {
  title: 'Vodič za Veličine Noktiju',
  subtitle: 'Kako izmeriti nokatnu ploču za savršeno prianjanje',
  sizes: [
    { name: 'XS', thumb: '15mm', index: '11mm', middle: '12mm', ring: '11mm', pinky: '8mm' },
    { name: 'S', thumb: '16mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '9mm' },
    { name: 'M', thumb: '17mm', index: '13mm', middle: '14mm', ring: '13mm', pinky: '10mm' },
    { name: 'L', thumb: '18mm', index: '14mm', middle: '15mm', ring: '14mm', pinky: '11mm' },
    { name: 'XL', thumb: '19mm', index: '15mm', middle: '16mm', ring: '15mm', pinky: '12mm' }
  ],
  customOption: 'Ukoliko vam standardne veličine ne odgovaraju, odaberite opciju "Prilagođeno" i unesite tačne milimetre za svaki prst.'
};

export const RITUAL_STEPS = [
  {
    step: '01',
    icon: '⛤',
    title: 'Čišćenje i Priprema',
    description: 'Blago potisnite zanoktice priloženim štapićem od ružinog drveta. Prebrišite nokatnu ploču alkoholnom maramicom kako biste uklonili prirodna ulja.'
  },
  {
    step: '02',
    icon: '🗡',
    title: 'Odabir Veličine i Veziva',
    description: 'Za nošenje od 1-3 dana koristite lepljive silikonske jastučiće (ne oštećuju nokat). Za nošenje od 3-4 nedelje nanesite kap profesionalnog gotskog lepka.'
  },
  {
    step: '03',
    icon: '✦',
    title: 'Postavljanje pod Uglom od 45°',
    description: 'Prislonite Vermilion kandžu uz koren nokta pod uglom od 45 stepeni i polako spustite. Čvrsto pritisnite 30 sekundi bez pomeranja.'
  },
  {
    step: '04',
    icon: '🩸',
    title: 'Krvavi Pakt je Sklopljen',
    description: 'Izbegavajte vrelu vodu prvih sat vremena. Vaše kandže su sada spremne za noć — otporne, oštre i besprekorne.'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Kvalitet je van ovog sveta. Ljudi na ulici me bukvalno zaustavljaju da pitaju gde sam radila nokte. Nosila sam ih pune 3 nedelje bez ijednog odvajanja.',
    author: 'Elena V.',
    city: 'Beograd',
    set: 'Suvereni Noar'
  },
  {
    quote: 'Kao neko ko se bavi alternativnom modom, ovo je jedini brend u regionu koji zaista razume luksuznu mračnu estetiku. Pakovanje u crnom somotu sa mačem je iskustvo za sebe.',
    author: 'Milica S.',
    city: 'Novi Sad',
    set: 'Demonsko Sečivo'
  },
  {
    quote: 'Naručila sam set po meri za venčanje. Svaki milimetar je savršeno odgovarao mojim prirodnim noktima. Hvala vam na neverovatnoj posvećenosti detaljima!',
    author: 'Katarina D.',
    city: 'Niš',
    set: 'Krvavi Nokturno'
  }
];
