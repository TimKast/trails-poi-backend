import Hapi from "@hapi/hapi";
import { initDb } from "./models/db";
import { apiRoutes } from "./api-routes";

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
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
