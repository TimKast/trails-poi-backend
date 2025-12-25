import { v4 } from "uuid";
import type { User } from "../../types/model-types";
import type { UserStore } from "../../types/store-types";
import db from "./store-utils";

export const userJsonStore: UserStore = {
  async find() {
    await db.read();
    return db.data.users;
  },

  async create(user: Omit<User, "_id">): Promise<User> {
    await db.read();
    const newUser: User = {
      ...user,
      _id: v4(),
    };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },

  async findById(id: string): Promise<User | null> {
    await db.read();
    return db.data.users.find((user) => user._id === id) ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    await db.read();
    return db.data.users.find((user) => user.email === email) ?? null;
  },

  async deleteById(id: string) {
    await db.read();
    const userIndex = db.data.users.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      db.data.users.splice(userIndex, 1);
      await db.write();
    }
  },

  async deleteAll() {
    await db.read();
    db.data.users = [];
    await db.write();
  },
};
