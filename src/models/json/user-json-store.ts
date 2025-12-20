import { v4 } from "uuid";
import type { User } from "../model-types";
import db from "./store-utils";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user: User) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id: string) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  async getUserByEmail(email: string) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  async deleteUserById(id: string) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
