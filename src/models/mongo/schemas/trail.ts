import { Schema, model } from "mongoose";
import { Trail } from "../../../types/model-types";

const trailSchema = new Schema<Trail>({
  name: String,
  description: String,
  location: {
    lat: Number,
    lon: Number,
  },
});

export const TrailSchema = model("Trail", trailSchema);
