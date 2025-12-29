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
  lon: Joi.number().min(-180).max(180).example(-116.166868).required(),
}).label("LocationSpec");

const CoordinatesSpec = Joi.array()
  .length(2)
  .ordered(Joi.number().min(-180).max(180).example(-116.166868).label("Lon").required(), Joi.number().min(-90).max(90).example(34.011286).label("Lat").required())
  .required()
  .label("CoordinatesSpec");

export const CoordsArraySpec = Joi.array().items(CoordinatesSpec).label("CoordsArraySpec");

export const PointLocationSpec = Joi.object({
  type: Joi.string().valid("Point").example("Point").required(),
  coordinates: CoordinatesSpec,
}).label("PointLocationSpec");

export const ImageUriSpec = Joi.string().uri().example("https://example.com/image.jpg").label("ImageUriSpec");
export const ImageUriObjSpec = Joi.object({
  imageUri: ImageUriSpec.required(),
}).label("ImageUriObjSpec");
export const ImageUriArraySpec = Joi.array().items(ImageUriSpec).label("ImageUriArraySpec");
