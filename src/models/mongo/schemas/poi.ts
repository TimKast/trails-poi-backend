import { Schema, model } from "mongoose";
import { Poi } from "../../../types/model-types";

const poiSchema = new Schema<Poi>({
  name: String,
  description: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  category: {
    type: String,
    enum: ["hut", "lake", "peak"],
  },
  images: { type: [String], default: [] },
});

export const PoiSchema = model("Poi", poiSchema);
