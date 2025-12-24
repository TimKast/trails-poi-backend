import Hapi, { Server } from "@hapi/hapi";
import "dotenv/config";
import * as jwt from "hapi-auth-jwt2";
import { apiRoutes } from "./api-routes";
import { validate } from "./api/jwt-utils";
import { initDb } from "./models/db";

export async function initServerSecurity(server: Server) {
  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.jwt_secret,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("jwt");
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });
  await initServerSecurity(server);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

void init();
initDb();
