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
