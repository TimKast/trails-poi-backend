import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { validationError } from "../helper/logger";
import { db } from "../models/db";
import { IdSpec, ImageUriObjSpec } from "../models/joi-schemas/common-spec";
import { PoiArraySpec, PoiPartialSpec, PoiSpec, PoiSpecPlus } from "../models/joi-schemas/poi-spec";
import { Poi } from "../types/model-types";

export const poiApi = {
  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const pois = await db.poiStore!.find();
        return h.response(pois).code(200);
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Get all POIs",
    notes: "Returns all points of interest from the database",
    response: { schema: PoiArraySpec, failAction: validationError },
  },

  findOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poiId = request.params.id as string;
        const poi = await db.poiStore!.findById(poiId);
        if (poi) {
          return h.response(poi).code(200);
        }
        return Boom.notFound("No POI with this id");
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Get a POI by ID",
    notes: "Returns a single point of interest by its ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const data = request.payload as Omit<Poi, "_id">;
        const poi = await db.poiStore!.create(data);
        return h.response(poi).code(201);
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Create a new POI",
    notes: "Creates a new point of interest and returns the created POI",
    validate: { payload: PoiSpec, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poiId = request.params.id as string;
        const updatedPoi = request.payload as Partial<Omit<Poi, "_id">>;
        const poi = await db.poiStore!.update(poiId, updatedPoi);
        if (poi) {
          return h.response(poi).code(200);
        }
        return Boom.notFound("No POI with this id");
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Update a POI",
    notes: "Updates an existing point of interest and returns the updated POI",
    validate: { params: { id: IdSpec }, payload: PoiPartialSpec, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poiId = request.params.id as string;
        await db.poiStore!.deleteById(poiId);
        return h.response({ success: true }).code(200);
      } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message === "POI not found") {
          return Boom.notFound("POI not found");
        }
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Delete a POI",
    notes: "Deletes a point of interest by its ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: { success: true }, failAction: validationError },
  },

  addImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poiId = request.params.id as string;
        const { imageUri } = request.payload as { imageUri: string };
        const poi = await db.poiStore!.addImage(poiId, imageUri);
        if (poi) {
          return h.response(poi).code(200);
        }
        return Boom.notFound("No POI with this id");
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Add an image to a POI",
    notes: "Adds an image URL to the specified point of interest",
    validate: { params: { id: IdSpec }, payload: ImageUriObjSpec, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },
};
