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

export const poiSeeds = [
  {
    name: "Mountain Hut",
    description: "A cozy hut in the mountains.",
    location: {
      type: "Point",
      coordinates: [45.1234, 7.1234],
    },
    category: "hut",
    images: [],
  },
  {
    name: "Crystal Lake",
    description: "A serene lake with crystal clear water.",
    location: {
      type: "Point",
      coordinates: [46.5678, 8.5678],
    },
    category: "lake",
    images: [],
  },
  {
    name: "Eagle Peak",
    description: "The highest peak in the region.",
    location: {
      type: "Point",
      coordinates: [47.9101, 9.9101],
    },
    category: "peak",
    images: ["https://res.cloudinary.com/dytfhiqqp/image/upload/v1767009075/Alpine-Trails/jvlqy2jdpucrn8ijezas.jpg"],
  },
];

export const trailSeeds = [
  {
    name: "Pacific Crest Trail",
    description: "A long-distance hiking and equestrian trail",
    location: { lat: 47.6062, lon: -122.3321 },
  },
  {
    name: "Appalachian Trail",
    description: "A marked hiking trail in the Eastern United States",
    location: { lat: 35.5951, lon: -82.5515 },
  },
  {
    name: "Continental Divide Trail",
    description: "A United States long-distance trail",
    location: { lat: 39.7392, lon: -104.9903 },
  },
];
