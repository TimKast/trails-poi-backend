import { Poi } from "../../types/model-types";

export const testPois: Omit<Poi, "_id">[] = [
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
    images: [],
  },
];

export const singlePoi: Omit<Poi, "_id"> = {
  name: "Sunny Summit",
  description: "A sunny summit with panoramic views.",
  location: {
    type: "Point",
    coordinates: [48.1111, 10.1111],
  },
  category: "peak",
  images: [],
};

export const otherPoi: Omit<Poi, "_id"> = {
  name: "Forest Lake",
  description: "A tranquil lake surrounded by forest.",
  location: {
    type: "Point",
    coordinates: [49.2222, 11.2222],
  },
  category: "lake",
  images: [],
};
