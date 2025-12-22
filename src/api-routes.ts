import { trailsApi } from "./api/trails-api";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/trails", config: trailsApi.find },
  { method: "GET" as const, path: "/api/trails/{id}", config: trailsApi.findOne },
  { method: "POST" as const, path: "/api/trails", config: trailsApi.create },
  { method: "PUT" as const, path: "/api/trails/{id}", config: trailsApi.update },
  { method: "DELETE" as const, path: "/api/trails/{id}", config: trailsApi.deleteOne },
  { method: "DELETE" as const, path: "/api/trails", config: trailsApi.deleteAll },
];
