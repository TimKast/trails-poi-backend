import { adminApi } from "./api/admin-api";
import { trailsApi } from "./api/trails-api";
import { usersApi } from "./api/users-api";
import { poiApi } from "./api/poi-api";

export const apiRoutes = [
  { method: "POST" as const, path: "/api/authenticate", config: usersApi.authenticate },
  { method: "POST" as const, path: "/api/signup", config: usersApi.signup },
  { method: "POST" as const, path: "/api/logout", config: usersApi.logout },

  { method: "POST" as const, path: "/api/admin/{id}", config: adminApi.makeAdmin },
  { method: "GET" as const, path: "/api/users", config: adminApi.findUsers },
  { method: "DELETE" as const, path: "/api/users/{id}", config: adminApi.deleteUser },
  { method: "DELETE" as const, path: "/api/users", config: adminApi.deleteAllUsers },

  { method: "GET" as const, path: "/api/trails", config: trailsApi.find },
  { method: "GET" as const, path: "/api/trails/{id}", config: trailsApi.findOne },
  { method: "POST" as const, path: "/api/trails", config: trailsApi.create },
  { method: "PUT" as const, path: "/api/trails/{id}", config: trailsApi.update },
  { method: "DELETE" as const, path: "/api/trails/{id}", config: trailsApi.deleteOne },
  { method: "DELETE" as const, path: "/api/trails", config: trailsApi.deleteAll },

  { method: "GET" as const, path: "/api/pois", config: poiApi.find },
  { method: "GET" as const, path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "POST" as const, path: "/api/pois", config: poiApi.create },
  { method: "PUT" as const, path: "/api/pois/{id}", config: poiApi.update },
  { method: "POST" as const, path: "/api/pois/{id}/images", config: poiApi.addImage },
  { method: "DELETE" as const, path: "/api/pois/{id}", config: poiApi.deleteOne },
];
