import { Schema, model } from "mongoose";
import { Trail } from "../../../types/model-types.js";

const trailSchema = new Schema<Trail>({
  name: String,
  description: String,
  geometry: {
    type: { type: String, enum: ["LineString"], required: true },
    coordinates: { type: [[Number]], required: true }, // lon, lat, optional: Elevation
  },
  images: { type: [String], default: [] },
});

export const TrailSchema = model("Trail", trailSchema);
