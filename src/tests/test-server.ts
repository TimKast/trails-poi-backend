import Hapi, { Server } from "@hapi/hapi";
import "dotenv/config";
import * as jwt from "hapi-auth-jwt2";
import Joi from "joi";
import { apiRoutes } from "../api-routes";
import { validate } from "../helper/jwt-utils";
import { initDb } from "../models/db";

export async function createTestServer() {
  const server = Hapi.server({ host: "localhost", port: 0 });
  server.validator(Joi);
  server.route(apiRoutes);
  await server.initialize();
  initDb();
  return server;
}

export async function initTestServerSecurity(server: Server) {
  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.jwt_secret,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
    cookieKey: process.env.cookie_name,
  });
  server.auth.default("jwt");
}
