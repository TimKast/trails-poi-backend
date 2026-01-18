import { Trail } from "../../types/model-types.js";

export const testTrails: Omit<Trail, "_id">[] = [
  {
    name: "Pacific Crest Trail",
    description: "A long-distance hiking and equestrian trail",
    geometry: {
      type: "LineString",
      coordinates: [
        [-121.7773, 36.5785, 500],
        [-121.775, 36.579, 550],
        [-121.7725, 36.58, 600],
        [-121.77, 36.5815, 650],
        [-121.768, 36.583, 700],
      ],
    },
    images: [],
  },
  {
    name: "Appalachian Trail",
    description: "A marked hiking trail in the Eastern United States",
    geometry: {
      type: "LineString",
      coordinates: [
        [-81.594, 36.598, 400],
        [-81.592, 36.6, 450],
        [-81.59, 36.602, 500],
        [-81.588, 36.604, 550],
        [-81.586, 36.606, 600],
      ],
    },
    images: [],
  },
  {
    name: "Continental Divide Trail",
    description: "A United States long-distance trail",
    geometry: {
      type: "LineString",
      coordinates: [
        [-104.9903, 39.7392, 1600],
        [-104.988, 39.74, 1650],
        [-104.985, 39.742, 1700],
        [-104.982, 39.745, 1750],
        [-104.98, 39.748, 1800],
      ],
    },
    images: [],
  },
];

export const singleTrail: Omit<Trail, "_id"> = {
  name: "Test Trail",
  description: "A trail for testing",
  geometry: {
    type: "LineString",
    coordinates: [
      [20.0, 10.0, 0],
      [21.0, 11.0, 10],
    ],
  },
  images: [],
};

export const otherTrail: Omit<Trail, "_id"> = {
  name: "Other Test Trail",
  description: "Another trail for testing",
  geometry: {
    type: "LineString",
    coordinates: [
      [25.0, 15.0, 0],
      [26.0, 16.0, 10],
      [27.0, 17.0, 20],
    ],
  },
  images: [],
};
