export const BRAND_IDENTITY = {
  name: "ZÄFIZZY",
  tagline: "ACQUIRE THE WORLD",
  subheading: "PERFUMERS & PERFUMERY",
  arabicScript: "زافيزي",
  theme: "White & Deep Navy Edition",
  tokens: {
    pureWhite: "#FFFFFF",
    midnightNavy: "#101E38",
    warmIvory: "#F4F2ED",
    mistBlue: "#D8DFE9",
    secondaryText: "#5A6882",
    accentGold: "#CBBBA0",
  },
  assets: {
    logo: "/assets/ZAFIZZY Logo.psd.png",
    pattern: "/assets/BG.png",
    signatureBottle: "/assets/signature-bottle.jpg",
    fragranceWorld: "/assets/fragrance-world.jpg",
  }
};

export const FRAGRANCE_DATA = {
  flaconName: "ZÄFIZZY N° 1 — ÉLIXIR IMPÉRIAL",
  edition: "Signature Edition — 100ml / 3.4 FL. OZ.",
  concentration: "Extrait de Parfum (28% Concentration)",
  conceptDescription: "An architectural balance of maritime brightness and profound midnight woods. Formulated to evoke the stillness of crystalline waters under a nocturnal Mediterranean sky.",
  statusNote: "Concept nomenclature & specifications pending client brand sign-off.",
  details: [
    { label: "Maceration", value: "180 Days in Amber Glass Carboys" },
    { label: "Extraction", value: "Supercritical CO₂ & Cold Enfluerage" },
    { label: "Artisan Atelier", value: "Grasse & Haute Mediterranean Basin" },
    { label: "Sillage & Longevity", value: "Subtle, Intimate & 14+ Hours Longevity" },
  ],
  notesPyramid: {
    top: {
      title: "Top Notes",
      phase: "0 — 20 Minutes",
      theme: "The Luminous Awakening",
      description: "Crisp, effervescent citrus and saline ocean mist that strike the senses with crystalline clarity.",
      accords: [
        { name: "Calabrian Bergamot", origin: "Southern Italy", note: "Sparkling, solar, crisp" },
        { name: "Oceanic Sea Salt", origin: "Mediterranean Coast", note: "Saline, brisk, mineral" },
        { name: "Pink Peppercorn", origin: "Madagascar", note: "Spicy, tingling, vibrant" }
      ]
    },
    heart: {
      title: "Heart Notes",
      phase: "20 Min — 4 Hours",
      theme: "The Architectural Core",
      description: "A stately, powdery floral spine of majestic Tuscan iris, enveloped in wild lavender and velvety orris.",
      accords: [
        { name: "Tuscan Blue Iris Concrete", origin: "Florence, Italy", note: "Powdery, noble, aristocratic" },
        { name: "Haute Provence Lavender", origin: "Valensole Plateau", note: "Aromatic, calming, silvered" },
        { name: "Orris Root Resinoid", origin: "Aged 3 Years", note: "Buttery, suede-like, textured" }
      ]
    },
    base: {
      title: "Base Notes",
      phase: "4 — 16+ Hours",
      theme: "The Deep Midnight Sillage",
      description: "A dark, hypnotic foundation of oceanic ambergris, smoked royal cedarwood, and clean earthen vetiver.",
      accords: [
        { name: "White Oceanic Ambergris", origin: "Sustainably Gathered", note: "Warm, animalic, radiant skin scent" },
        { name: "Atlas Royal Cedarwood", origin: "Moroccan Atlas", note: "Smoky, architectural, dry" },
        { name: "Haitian Vetiver", origin: "Les Cayes", note: "Rooted, smoky-green, earthy" }
      ]
    }
  }
};

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Structural Purity",
    subtitle: "Architectural Proportion",
    description: "Every flacon is conceived as a piece of timeless sculpture. Clean vertical planes reflect natural light, while deep midnight hues capture the mysterious depths of nocturnal contemplation."
  },
  {
    number: "02",
    title: "Noble Terroir",
    subtitle: "Rare Botanical Sourcing",
    description: "We harvest only during dawn windows when natural essential oils are at peak potency. No synthetic shortcuts—only cold-pressed botanical essences of uncompromising distinction."
  },
  {
    number: "03",
    title: "The Silent Sillage",
    subtitle: "Intimate Presence",
    description: "True luxury never screams for attention. ZÄFIZZY creates a private aura that lingers softly on the skin, leaving an indelible memory of elegance in every room you enter."
  }
];

export const HERO_PILLARS = [
  {
    code: "01",
    title: "Grasse Terroir",
    category: "BOTANICAL HARVEST",
    description: "Cold-harvested petals collected during dawn's maritime mist window for uncompromised molecular potency."
  },
  {
    code: "02",
    title: "Supercritical CO₂",
    category: "ATELIER EXTRACTION",
    description: "Zero thermal degradation extraction capturing the pure living botanical essence in pristine clarity."
  },
  {
    code: "03",
    title: "28% Extrait",
    category: "CONCENTRATION",
    description: "Highest haute perfumery tier formulated for intimate architectural sillage lasting 14+ hours."
  },
  {
    code: "04",
    title: "Crystal Flacon",
    category: "GLASS CRAFTSMANSHIP",
    description: "Heavy crown crystal with solid Glace d'Eau base, brushed slate metal cap, and platinum accents."
  }
];

export const PATRON_REVIEWS = [
  {
    id: 1,
    rating: 5,
    quote: "ZÄFIZZY N° 1 has redefined my concept of architectural perfumery. The transition from crystalline Calabrian bergamot into smoked cedarwood and saline ambergris is peerless.",
    author: "Hélène de Montmirail",
    title: "Haute Parfumerie Critic, Paris",
    verified: "Patron Collector N° 084"
  },
  {
    id: 2,
    rating: 5,
    quote: "The crystalline flacon is a sculptural triumph on the dressing plinth. On skin, the blue Tuscan iris creates an aura that commands rooms with quiet, noble authority.",
    author: "Kareem Al-Mansoor",
    title: "Architect & Private Collector, Dubai",
    verified: "Bespoke Commission N° 019"
  },
  {
    id: 3,
    rating: 5,
    quote: "A masterclass in extraction purity. The supercritical distillation captures the living botanical without thermal fatigue. It remains on the pulse points from dawn till midnight.",
    author: "Julian Vance",
    title: "Olfactory Curator, London",
    verified: "Atelier Salon Patron"
  }
];

export const GAZETTE_POSTS = [
  {
    id: 1,
    tag: "ATELIER SCIENCE",
    readTime: "4 MIN READ",
    title: "The Architecture of Cold Extraction",
    excerpt: "How supercritical fluid extraction preserves volatile monoterpenes and delicate esters from wild Mediterranean lavender.",
    date: "OCTOBER 2026",
    image: "/assets/fragrance-world.jpg"
  },
  {
    id: 2,
    tag: "SCULPTURAL FLACON",
    readTime: "3 MIN READ",
    title: "Glace d'Eau: The Crystal Foundation",
    excerpt: "The physics of crown optical glass (IOR 1.52) and the artisanal hand-beveling required to create the suspended liquid chamber.",
    date: "SEPTEMBER 2026",
    image: "/assets/signature-bottle.jpg"
  },
  {
    id: 3,
    tag: "NOCTURNAL HARVEST",
    readTime: "5 MIN READ",
    title: "The Dawn Dew Window in Grasse",
    excerpt: "Why our blue iris concrete and Provence blossoms are picked solely during the 90 minutes before solar vaporization.",
    date: "AUGUST 2026",
    image: "/assets/fragrance-world.jpg"
  }
];

export const PERFUME_EDITIONS = [
  {
    id: "edition-1",
    editionNumber: "EDITION N° 01",
    name: "ZÄFIZZY N° 1 — ÉLIXIR IMPÉRIAL",
    subtitle: "The Signature Extrait",
    tag: "SIGNATURE FLACON",
    image: "/assets/signature-bottle.jpg",
    concentration: "28% Extrait de Parfum",
    volume: "100 ML / 3.4 FL. OZ.",
    colorTheme: "Midnight Navy & Crystal",
    liquidTone: "Aged Bourbon Amber-Brown",
    story: "An architectural balance of maritime brightness and profound midnight woods. Formulated to evoke the crystalline stillness of Mediterranean waters under a nocturnal sky.",
    accords: ["Calabrian Bergamot", "Tuscan Iris", "Smoked Cedarwood", "Oceanic Ambergris"],
    specs: [
      { label: "Maceration", val: "180 Days in Amber Glass" },
      { label: "Extraction", val: "Supercritical CO₂" },
      { label: "Longevity", val: "14+ Hours Sillage" },
    ],
  },
  {
    id: "edition-2",
    editionNumber: "EDITION N° 02",
    name: "ZÄFIZZY N° 2 — NOCTURNE AMBRÉ",
    subtitle: "Aged Bourbon & Smoked Labdanum",
    tag: "HAUTE BOISÉE",
    image: "/assets/signature-bottle.jpg",
    concentration: "30% Extrait de Parfum",
    volume: "100 ML / 3.4 FL. OZ.",
    colorTheme: "Warm Roasted Mahogany",
    liquidTone: "Cognac Amber-Brown",
    story: "A nocturnal exploration of dark roasted oak barrels, sweet tobacco leaf, and golden amber resins. Warm, intoxicating, and draped in the quiet luxury of aged alcohol.",
    accords: ["Bourbon Accord", "Honeyed Labdanum", "Cuban Tobacco", "Madagascar Vanilla"],
    specs: [
      { label: "Maceration", val: "240 Days French Oak" },
      { label: "Extraction", val: "Cold Fractional Enfluerage" },
      { label: "Longevity", val: "18+ Hours Sillage" },
    ],
  },
  {
    id: "edition-3",
    editionNumber: "EDITION N° 03",
    name: "ZÄFIZZY N° 3 — CÉLESTE BLANC",
    subtitle: "Crystalline Aldehydes & White Suede",
    tag: "MINERAL FLORAL",
    image: "/assets/signature-bottle.jpg",
    concentration: "26% Extrait de Parfum",
    volume: "100 ML / 3.4 FL. OZ.",
    colorTheme: "Luminous Platinum Silver",
    liquidTone: "Translucent Golden Champagne",
    story: "Crisp mountain wind colliding with saline sea-spray and silvered iris. Pure, architectural, and effortlessly commanding in its quiet crystalline clarity.",
    accords: ["Sparkling Aldehydes", "French Peony", "White Orris Suede", "Cashmeran Mineral"],
    specs: [
      { label: "Maceration", val: "150 Days Glacial Chilled" },
      { label: "Extraction", val: "Ultrasonic Acoustic Distillation" },
      { label: "Longevity", val: "12+ Hours Sillage" },
    ],
  },
];
