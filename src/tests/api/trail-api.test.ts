import { Server } from "@hapi/hapi";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "../../models/db";
import { Trail } from "../../types/model-types";
import { otherTrail, singleTrail, testTrails } from "../fixtures/trails";
import { nonexistingId } from "../fixtures/utils";
import { createTestServer } from "../test-server";

describe("TrailApi", () => {
  let server: Server;
  let created: Trail;

  beforeAll(async () => {
    server = await createTestServer();
  });

  beforeEach(async () => {
    await db.trailStore!.deleteAll();
    for (const trail of testTrails) {
      await db.trailStore!.create(trail);
    }
    created = await db.trailStore!.create(singleTrail);
  });

  afterAll(async () => {
    await server.stop();
  });

  describe("GET /api/trails - find", () => {
    it("returns all trails", async () => {
      const response = await server.inject({ method: "GET", url: "/api/trails" });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Trail[];
      expect(body).toHaveLength(testTrails.length + 1);
    });
  });

  describe("GET /api/trails/{id} - findOne", () => {
    it("returns one trail", async () => {
      const response = await server.inject({ method: "GET", url: `/api/trails/${created._id}` });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Trail;
      expect(body._id).toBe(created._id.toString());
      expect(body.name).toBe(created.name);
    });

    it("returns 404 when trail not found", async () => {
      const response = await server.inject({ method: "GET", url: `/api/trails/${nonexistingId}` });
      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({ method: "GET", url: "/api/trails/invalid-id" });
      expect(response.statusCode).toBe(503);
    });
  });

  describe("POST /api/trails - create", () => {
    it("creates a trail", async () => {
      const res = await server.inject({
        method: "POST",
        url: "/api/trails",
        payload: otherTrail,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload) as Trail;
      expect(body._id).toBeDefined();
      expect(body.name).toBe(otherTrail.name);
      expect(body.description).toBe(otherTrail.description);
      expect(body.location).toStrictEqual(otherTrail.location);
    });
  });

  describe("PUT /api/trails/{id} - update", () => {
    it("updates a trail", async () => {
      const response = await server.inject({
        method: "PUT",
        url: `/api/trails/${created._id}`,
        payload: { name: "Updated Trail" },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Trail;
      expect(body.name).toBe("Updated Trail");
    });

    it("returns 404 when updating non-existent trail", async () => {
      const response = await server.inject({
        method: "PUT",
        url: `/api/trails/${nonexistingId}`,
        payload: { name: "Updated Trail" },
      });

      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({
        method: "PUT",
        url: "/api/trails/invalid-id",
        payload: { name: "Updated Trail" },
      });

      expect(response.statusCode).toBe(503);
    });
  });

  describe("DELETE /api/trails/{id} - delete", () => {
    it("deletes a trail", async () => {
      const response = await server.inject({ method: "DELETE", url: `/api/trails/${created._id}` });

      expect(response.statusCode).toBe(204);
      const found = await db.trailStore!.findById(created._id);
      expect(found).toBeNull();
    });

    it("returns 404 when deleting non-existent trail", async () => {
      const response = await server.inject({ method: "DELETE", url: `/api/trails/${nonexistingId}` });

      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({ method: "DELETE", url: "/api/trails/invalid-id" });

      expect(response.statusCode).toBe(503);
    });
  });

  describe("DELETE /api/trails - deleteAll", () => {
    it("deletes all trails", async () => {
      const response = await server.inject({ method: "DELETE", url: "/api/trails" });

      expect(response.statusCode).toBe(204);
      const remaining = await db.trailStore!.find();
      expect(remaining).toHaveLength(0);
    });
  });
});
