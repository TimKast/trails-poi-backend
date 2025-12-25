import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { validationError } from "../helper/logger";
import { db } from "../models/db";
import { IdSpec, SuccessSpec } from "../models/joi-schemas/common-spec";
import { TrailArraySpec, TrailSpec, TrailSpecPlus } from "../models/joi-schemas/trail-spec";
import { Trail } from "../types/model-types";

export const trailsApi = {
  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trails = await db.trailStore!.find();
        return h.response(trails).code(200);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Get all trails",
    notes: "Returns all trails from the database",
    response: { schema: TrailArraySpec, failAction: validationError },
  },

  findOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trailId = request.params.id as string;
        const trail = await db.trailStore!.findById(trailId);
        if (trail) {
          return h.response(trail).code(200);
        }
        return Boom.notFound("No Trail with this id");
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Get a trail by ID",
    notes: "Returns a single trail by its ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const data = request.payload as Omit<Trail, "_id">;
        const trail = await db.trailStore!.create(data);
        return h.response(trail).code(201);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Create a new trail",
    notes: "Creates a new trail and returns the created trail",
    validate: { payload: TrailSpec, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trailId = request.params.id as string;
        const data = request.payload as Partial<Trail>;
        const updatedTrail = await db.trailStore!.update(trailId, data);
        if (updatedTrail) {
          return h.response(updatedTrail).code(200);
        }
        return Boom.notFound("No Trail with this id");
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Update a trail",
    notes: "Updates an existing trail by ID and returns the updated trail",
    validate: { params: { id: IdSpec }, payload: TrailSpec, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trailId = request.params.id as string;
        await db.trailStore!.deleteById(trailId);
        return h.response({ success: true }).code(204);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Delete a trail",
    notes: "Deletes a single trail by its ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SuccessSpec, failAction: validationError },
  },

  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.trailStore!.deleteAll();
        return h.response({ success: true }).code(204);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
    tags: ["api"],
    description: "Delete all trails",
    notes: "Deletes all trails from the database",
    response: { schema: SuccessSpec, failAction: validationError },
  },
};
