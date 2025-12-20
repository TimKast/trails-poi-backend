import type { User } from "./model-types";

interface Store<T> {
  find(): Promise<T[]>;
  create(item: Omit<T, "_id">): Promise<T>;
  findById(id: string): Promise<T | undefined>;
  deleteById(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}

export interface UserStore extends Store<User> {
  findByEmail(email: string): Promise<User | undefined>;
}
