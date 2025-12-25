import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { createToken, requireAdmin } from "../helper/jwt-utils";
import { validationError } from "../helper/logger";
import { db } from "../models/db";
import { JwtAuthSpec, SuccessSpec } from "../models/joi-schemas/common-spec";
import { UserArraySpec, UserSpec } from "../models/joi-schemas/user-spec";

export const usersApi = {
  authenticate: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as { email: string; password: string };
      try {
        const user = await db.userStore!.findByEmail(email);

        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);

        h.state(process.env.cookie_name!, token, { isHttpOnly: true, isSecure: false, isSameSite: "Lax", path: "/api/" });

        return h.response({ success: true, token: token }).code(201);
      } catch (error) {
        console.error("Error during authentication:", error);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate user",
    notes: "Authenticates a user with email and password, returns a JWT token",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: JwtAuthSpec, failAction: validationError },
  },

  signup: {
    auth: false,
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
    tags: ["api"],
    description: "Register a new user",
    notes: "Creates a new user account with email and password",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: SuccessSpec, failAction: validationError },
  },

  logout: {
    auth: false,
    handler: function (_request: Request, h: ResponseToolkit) {
      h.unstate(process.env.cookie_name!, { path: "/api/" });
      return h.response({ success: true }).code(200);
    },
    tags: ["api"],
    description: "Logout user",
    notes: "Clears the authentication cookie and logs out the user",
    response: { schema: SuccessSpec, failAction: validationError },
  },

  find: {
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
};
