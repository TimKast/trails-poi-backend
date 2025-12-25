import { v4 } from "uuid";
import type { Trail } from "../../types/model-types";
import type { TrailStore } from "../../types/store-types";
import db from "./store-utils";

export const trailJsonStore: TrailStore = {
  async find(): Promise<Trail[]> {
    await db.read();
    return db.data.trails;
  },

  async create(trail: Omit<Trail, "_id">): Promise<Trail> {
    await db.read();
    const newTrail: Trail = {
      ...trail,
      _id: v4(),
    };
    db.data.trails.push(newTrail);
    await db.write();
    return newTrail;
  },

  async findById(id: string): Promise<Trail | null> {
    await db.read();
    return db.data.trails.find((trail) => trail._id === id) ?? null;
  },

  async deleteById(id: string) {
    await db.read();
    const trailIndex = db.data.trails.findIndex((trail) => trail._id === id);
    if (trailIndex !== -1) {
      db.data.trails.splice(trailIndex, 1);
      await db.write();
    }
  },

  async deleteAll() {
    await db.read();
    db.data.trails = [];
    await db.write();
  },

  async update(id: string, updatedTrail: Partial<Omit<Trail, "_id">>): Promise<Trail | null> {
    const trail = db.data.trails.find((trail) => trail._id === id);
    if (trail) {
      Object.assign(trail, updatedTrail);
      await db.write();
      return trail;
    }
    return null;
  },
};
