import type { Poi } from "../../../types/model-types";
import { PoiStore } from "../../../types/store-types";
import { PoiSchema } from "../schemas/poi";

export const poiMongoStore: PoiStore = {
  async find(): Promise<Poi[]> {
    const pois = await PoiSchema.find().lean();
    return pois;
  },

  async findById(id: string): Promise<Poi | null> {
    const poi = await PoiSchema.findById(id).lean();
    return poi;
  },

  async create(poi: Omit<Poi, "_id">): Promise<Poi> {
    const newPoi = new PoiSchema(poi);
    const poiObj = await newPoi.save();
    return poiObj.toObject();
  },

  async deleteById(id: string): Promise<void> {
    const poi = await PoiSchema.findById(id);
    if (!poi) throw new Error("POI not found");
    await poi.deleteOne();
  },

  async deleteAll(): Promise<void> {
    await PoiSchema.deleteMany({});
  },

  async addImage(poiId: string, imageUrl: string): Promise<Poi | null> {
    const poi = await PoiSchema.findById(poiId);
    if (poi) {
      poi.images.push(imageUrl);
      const updated = await poi.save();
      return updated.toObject();
    }
    return null;
  },

  async update(id: string, updatedPoi: Partial<Omit<Poi, "_id">>): Promise<Poi | null> {
    const poi = await PoiSchema.findById(id);
    if (poi) {
      Object.assign(poi, updatedPoi);
      const updated = await poi.save();
      return updated.toObject();
    }
    return null;
  },
};
