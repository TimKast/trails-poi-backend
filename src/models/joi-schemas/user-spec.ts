import Joi from "joi";
import { IdSpec } from "./common-spec";

export const UserSpec = Joi.object({
  email: Joi.string().example("user@example.com").required(),
  password: Joi.string().example("password123").required(),
}).label("UserSpec");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserSpecPlus");

export const UserArraySpec = Joi.array().items(UserSpecPlus).label("UserArraySpec");
