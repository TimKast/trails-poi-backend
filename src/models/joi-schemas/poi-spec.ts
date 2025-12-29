import Joi from "joi";
import { IdSpec, ImageUriArraySpec, PointLocationSpec } from "./common-spec";

export const PoiSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").required(),
  description: Joi.string().example("A beautiful trail with scenic views").required(),
  location: PointLocationSpec.required(),
  category: Joi.string().valid("hut", "lake", "peak").example("peak").required(),
  images: ImageUriArraySpec.optional(),
}).label("PoiSpec");

export const PoiPartialSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").optional(),
  description: Joi.string().example("A beautiful trail with scenic views").optional(),
  location: PointLocationSpec.optional(),
  category: Joi.string().valid("hut", "lake", "peak").example("peak").optional(),
  images: ImageUriArraySpec.optional(),
}).label("PoiPartialSpec");

export const PoiSpecPlus = PoiSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PoiSpecPlus");

export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArraySpec");
