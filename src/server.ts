import Hapi, { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import "dotenv/config";
import * as jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import Joi from "joi";
import { apiRoutes } from "./api-routes";
import { validate } from "./helper/jwt-utils";
import { initDb } from "./models/db";

const swaggerOptions = {
  info: {
    title: "POI Trail API",
    version: "1.0.0",
  },
};

export async function initServerSecurity(server: Server) {
  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.jwt_secret,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
    cookieKey: process.env.cookie_name,
  });
  server.auth.default("jwt");
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });
  server.validator(Joi);
  await initServerSecurity(server);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

void init();
await initDb("mongo");
