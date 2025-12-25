import { User } from "../../types/model-types";

export const testUsers: Omit<User, "_id" | "role">[] = [
  {
    email: "homer@simpson.com",
    password: "secret",
  },
  {
    email: "marge@simpson.com",
    password: "secret",
  },
  {
    email: "bart@simpson.com",
    password: "secret",
  },
];

export const singleUser: Omit<User, "_id" | "role"> = {
  email: "test@example.com",
  password: "secret",
};

export const otherUser: Omit<User, "_id" | "role"> = {
  email: "other@example.com",
  password: "secret",
};
