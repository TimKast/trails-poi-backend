export const userSeeds = [
  {
    email: "admin@example.com",
    password: "secret",
    role: "admin",
  },
  {
    email: "user@example.com",
    password: "secret",
    role: "user",
  },
];

export const trailSeeds = [
  {
    name: "Wendelstein Panoramaweg",
    description: "Ein schöner Panorama-Trail am Wendelstein mit Aussichtspunkten und Hütte.",
    geometry: {
      type: "LineString",
      coordinates: [
        [12.005, 47.722, 850],
        [12.01, 47.724, 870],
        [12.015, 47.727, 900],
        [12.02, 47.73, 940],
        [12.025, 47.732, 1030],
      ],
    },
    images: [
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320044/lennart-borstelmann-XE0TMpuP-LE-unsplash_wfov7n.jpg",
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1767009075/Alpine-Trails/jvlqy2jdpucrn8ijezas.jpg",
    ],
  },
  {
    name: "Herzogstand Aufstieg",
    description: "Klassischer Aufstieg auf den Herzogstand, ideal für Konditionstraining.",
    geometry: {
      type: "LineString",
      coordinates: [
        [11.23, 47.639, 730],
        [11.232, 47.641, 780],
        [11.234, 47.645, 850],
        [11.236, 47.648, 920],
        [11.238, 47.651, 1731],
      ],
    },
    images: [
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320028/florian-schonbrunner-RbsmG-l6GGI-unsplash_lfesef.jpg",
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320068/ulf-meyer-O2PQkrsnvt0-unsplash_yichyy.jpg",
    ],
  },
  {
    name: "Partnachklamm & Eckbauer",
    description: "Kurzer, aber sehr landschaftlich schöner Trail von der Partnachklamm zum Eckbauer.",
    geometry: {
      type: "LineString",
      coordinates: [
        [11.09, 47.47, 700],
        [11.092, 47.472, 720],
        [11.094, 47.474, 750],
        [11.096, 47.476, 800],
        [11.098, 47.478, 1230],
      ],
    },
    images: ["https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320028/shalev-cohen-R0_JO6TlHps-unsplash_burmdg.jpg"],
  },
];
