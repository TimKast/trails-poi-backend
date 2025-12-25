import type { Trail } from "../../types/model-types";
import { TrailStore } from "../../types/store-types";
import { TrailSchema } from "../mongo/schemas/trail";

export const trailMongoStore: TrailStore = {
  async find(): Promise<Trail[]> {
    const trails = await TrailSchema.find().lean();
    return trails;
  },

  async findById(id: string): Promise<Trail | null> {
    const trail = await TrailSchema.findById(id).lean();
    return trail;
  },

  async create(trail: Omit<Trail, "_id">): Promise<Trail> {
    const newTrail = new TrailSchema(trail);
    const trailObj = await newTrail.save();
    return trailObj.toObject();
  },

  async deleteById(id: string): Promise<void> {
    await TrailSchema.deleteOne({ _id: id });
  },

  async deleteAll(): Promise<void> {
    await TrailSchema.deleteMany({});
  },

  async update(id: string, updatedTrail: Partial<Omit<Trail, "_id">>): Promise<Trail | null> {
    const trail = await TrailSchema.findById(id);
    if (trail) {
      Object.assign(trail, updatedTrail);
      const updated = await trail.save();
      return updated;
    }
    return null;
  },
};
