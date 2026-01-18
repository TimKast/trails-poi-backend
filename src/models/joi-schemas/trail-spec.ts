import Joi from "joi";
import { IdSpec, ImageUriArraySpec, LineStringSpec } from "./common-spec";

export const TrailSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").required(),
  description: Joi.string().example("A beautiful trail with scenic views").required(),
  geometry: LineStringSpec.required(),
  images: ImageUriArraySpec.optional(),
}).label("TrailSpec");

export const TrailPartialSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").optional(),
  description: Joi.string().example("A beautiful trail with scenic views").optional(),
  geometry: LineStringSpec.optional(),
  images: ImageUriArraySpec.optional(),
}).label("TrailPartialSpec");

export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailSpecPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArraySpec");
