export type User = {
  id: string;
  email: string;
  password: string;
};

export type Trail = {
  id: string;
  name: string;
  description: string;
  location: { lat: number; lng: number };
};
