import { Trail } from "../../types/model-types";

export const testTrails: Omit<Trail, "_id">[] = [
  {
    name: "Pacific Crest Trail",
    description: "A long-distance hiking and equestrian trail",
    location: { lat: 47.6062, lng: -122.3321 },
  },
  {
    name: "Appalachian Trail",
    description: "A marked hiking trail in the Eastern United States",
    location: { lat: 35.5951, lng: -82.5515 },
  },
  {
    name: "Continental Divide Trail",
    description: "A United States long-distance trail",
    location: { lat: 39.7392, lng: -104.9903 },
  },
];

export const singleTrail: Omit<Trail, "_id"> = {
  name: "Test Trail",
  description: "A trail for testing",
  location: { lat: 10.0, lng: 20.0 },
};

export const otherTrail: Omit<Trail, "_id"> = {
  name: "Other Test Trail",
  description: "Another trail for testing",
  location: { lat: 15.0, lng: 25.0 },
};
