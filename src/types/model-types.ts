export type UserRole = "admin" | "user";

export type User = {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
};

export type Trail = {
  _id: string;
  name: string;
  description: string;
  location: { lat: number; lng: number };
};
