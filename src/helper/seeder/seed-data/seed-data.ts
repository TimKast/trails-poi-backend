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
    name: "Zugspitz Trail",
    description: "A long-distance hiking trail",
    location: { lat: 47.421, lon: 11.0983 },
    images: [
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320044/lennart-borstelmann-XE0TMpuP-LE-unsplash_wfov7n.jpg",
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1767009075/Alpine-Trails/jvlqy2jdpucrn8ijezas.jpg",
    ],
  },
  {
    name: "Watzmann Trail",
    description: "A marked hiking trail",
    location: { lat: 47.5951, lon: 12.9515 },
    images: [
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320028/florian-schonbrunner-RbsmG-l6GGI-unsplash_lfesef.jpg",
      "https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320068/ulf-meyer-O2PQkrsnvt0-unsplash_yichyy.jpg",
    ],
  },
  {
    name: "Garmispartenkirchen Trail",
    description: "Hiking trail",
    location: { lat: 47.491, lon: 11.095 },
    images: ["https://res.cloudinary.com/dytfhiqqp/image/upload/v1768320028/shalev-cohen-R0_JO6TlHps-unsplash_burmdg.jpg"],
  },
];
