import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const SuccessSpec = Joi.object({
  success: Joi.boolean().example(true).required(),
}).label("SuccessSpec");

export const JwtAuthSpec = Joi.object({
  success: Joi.boolean().example(true).required(),
  token: Joi.string()
    .example(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRiZjU3Y2E2YjJlZTQwM2I4YjhiZTciLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2ODgwODc0MDV9.XxX2XzX5xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
    )
    .required(),
}).label("JwtAuthSpec");

export const LocationSpec = Joi.object({
  lat: Joi.number().min(-90).max(90).example(34.011286).required(),
  lng: Joi.number().min(-180).max(180).example(-116.166868).required(),
}).label("LocationSpec");
