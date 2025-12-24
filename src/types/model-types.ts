export type User = {
  _id: string;
  email: string;
  password: string;
};

export type Trail = {
  _id: string;
  name: string;
  description: string;
  location: { lat: number; lng: number };
};
