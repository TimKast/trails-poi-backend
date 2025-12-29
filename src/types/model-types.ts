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
  location: { lat: number; lon: number };
}

export interface Poi {
  _id: string;
  name: string;
  description: string;
  location: { type: "Point"; coordinates: [number, number] };
  category: "hut" | "lake" | "peak";
  images: string[];
}
