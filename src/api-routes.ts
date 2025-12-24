import { trailsApi } from "./api/trails-api";
import { usersApi } from "./api/users-api";

export const apiRoutes = [
  { method: "POST" as const, path: "/api/authenticate", config: usersApi.authenticate },
  { method: "POST" as const, path: "/api/signup", config: usersApi.signup },
  { method: "POST" as const, path: "/api/logout", config: usersApi.logout },

  { method: "GET" as const, path: "/api/trails", config: trailsApi.find },
  { method: "GET" as const, path: "/api/trails/{id}", config: trailsApi.findOne },
  { method: "POST" as const, path: "/api/trails", config: trailsApi.create },
  { method: "PUT" as const, path: "/api/trails/{id}", config: trailsApi.update },
  { method: "DELETE" as const, path: "/api/trails/{id}", config: trailsApi.deleteOne },
  { method: "DELETE" as const, path: "/api/trails", config: trailsApi.deleteAll },
];
