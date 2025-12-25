import Hapi from "@hapi/hapi";
import Joi from "joi";
import { apiRoutes } from "../api-routes";
import { initDb } from "../models/db";

export async function createTestServer(db: string) {
  await initDb(db);
  const server = Hapi.server({ host: "localhost", port: 0 });
  server.validator(Joi);
  server.route(apiRoutes);
  await server.initialize();
  return server;
}
