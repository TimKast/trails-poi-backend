import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { requireAdmin } from "../helper/jwt-utils";
import { validationError } from "../helper/logger";
import { db } from "../models/db";
import { IdSpec, SuccessSpec } from "../models/joi-schemas/common-spec";
import { UserArraySpec } from "../models/joi-schemas/user-spec";

export const adminApi = {
  findUsers: {
    pre: [requireAdmin],
    handler: async function (_request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore!.find();
        return h.response(users).code(200);
      } catch (error) {
        console.error("Error fetching users:", error);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns a list of all registered users",
    response: { schema: UserArraySpec, failAction: validationError },
  },

  deleteUser: {
    pre: [requireAdmin],
    handler: async function (request: Request, h: ResponseToolkit) {
      const userId = request.params.id as string;
      try {
        await db.userStore!.deleteById(userId);

        return h.response({ success: true }).code(200);
      } catch (error) {
        console.error("Error deleting user:", error);
        if (error instanceof Error && error.message === "User not found") {
          return Boom.notFound("User not found");
        }
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete a user",
    notes: "Deletes a user by their ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SuccessSpec, failAction: validationError },
  },

  deleteAllUsers: {
    pre: [requireAdmin],
    handler: async function (_request: Request, h: ResponseToolkit) {
      try {
        await db.userStore!.deleteAll();
        return h.response({ success: true }).code(200);
      } catch (error) {
        console.error("Error deleting users:", error);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Removes all users from the database",
    response: { schema: SuccessSpec, failAction: validationError },
  },

  makeAdmin: {
    pre: [requireAdmin],
    handler: async function (request: Request, h: ResponseToolkit) {
      const userId = request.params.id as string;
      try {
        const updated = await db.userStore!.makeAdmin(userId);
        if (updated) return h.response({ success: true }).code(200);
        return Boom.notFound("No User with this Id");
      } catch (error) {
        console.log(error);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Promote user to admin",
    notes: "Sets the role of a user to admin based on user ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SuccessSpec, failAction: validationError },
  },
};
