import type { Trail, User } from "./model-types";

interface Store<T> {
  find(): Promise<T[]>;
  create(item: Omit<T, "_id">): Promise<T>;
  findById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}

export interface UserStore extends Store<User> {
  findByEmail(email: string): Promise<User | null>;
}

export interface TrailStore extends Store<Trail> {
  update(id: string, updatedTrail: Partial<Omit<Trail, "_id">>): Promise<Trail | null>;
}
