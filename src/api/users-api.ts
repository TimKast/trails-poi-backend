import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { createToken, decodeToken } from "../api/jwt-utils";
import { db } from "../models/db";

export const usersApi = {
  authenticate: {
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log(request.payload);
      const { email, password } = request.payload as { email: string; password: string };
      try {
        const user = await db.userStore!.findByEmail(email);
        console.log("Found user:", user);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        console.log("Generated token:", token);
        console.log("Decoded token:", decodeToken(token));
        return h.response({ success: true, token: token }).code(201);
      } catch (error) {
        console.error("Error during authentication:", error);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  signup: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as { email: string; password: string };
      try {
        const existingUser = await db.userStore!.findByEmail(email);
        if (existingUser) {
          return Boom.conflict("User already exists");
        }
        await db.userStore!.create({ email, password });
        return h.response({ success: true }).code(201);
      } catch (error) {
        console.error("Error during signup:", error);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
