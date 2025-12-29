import Joi from "joi";
import { IdSpec, LocationSpec } from "./common-spec";

export const TrailSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").required(),
  description: Joi.string().example("A beautiful trail with scenic views").required(),
  location: LocationSpec,
}).label("TrailSpec");

export const TrailPartialSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").optional(),
  description: Joi.string().example("A beautiful trail with scenic views").optional(),
  location: LocationSpec.optional(),
}).label("TrailPartialSpec");

export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailSpecPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArraySpec");
