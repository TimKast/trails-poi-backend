import Joi from "joi";
import { LocationSpec } from "./common-spec";

export const TrailSpec = Joi.object({
  name: Joi.string().example("Sunny Trail").required(),
  description: Joi.string().example("A beautiful trail with scenic views").required(),
  location: LocationSpec,
}).label("TrailSpec");

export const TrailSpecPlus = TrailSpec.keys({
  _id: Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID"),
}).label("TrailSpecPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArraySpec");
