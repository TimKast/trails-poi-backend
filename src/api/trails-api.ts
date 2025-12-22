import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db";
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
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const data = request.payload as Omit<Trail, "_id">;
        console.log(data);
        const trail = await db.trailStore!.create(data);
        return h.response(trail).code(201);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
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
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trailId = request.params.id as string;
        await db.trailStore!.deleteById(trailId);
        return h.response().code(204);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
  },

  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.trailStore!.deleteAll();
        return h.response().code(204);
      } catch {
        return Boom.serverUnavailable("Unexpected Error");
      }
    },
  },
};
