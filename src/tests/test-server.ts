import Hapi from "@hapi/hapi";
import { apiRoutes } from "../api-routes";
import { initDb } from "../models/db";

export async function createTestServer() {
  initDb();
  const server = Hapi.server({ host: "localhost", port: 0 });
  server.route(apiRoutes);
  await server.initialize();
  return server;
}
