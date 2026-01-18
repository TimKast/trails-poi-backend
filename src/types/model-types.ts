export type UserRole = "admin" | "user";

export interface User {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Trail {
  _id: string;
  name: string;
  description: string;
  geometry: {
    type: "LineString";
    coordinates: [number, number, number?][]; //lon, lat, optional: Elevation
  };
  images: string[];
}

export interface Poi {
  _id: string;
  name: string;
  description: string;
  location: { type: "Point"; coordinates: [number, number] }; // lon, lat
  category: "hut" | "lake" | "peak";
  images: string[];
}
