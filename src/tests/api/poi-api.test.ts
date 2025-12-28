import { Server } from "@hapi/hapi";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "../../models/db";
import { Poi } from "../../types/model-types";
import { otherPoi, singlePoi, testPois } from "../fixtures/pois";
import { nonexistingId } from "../fixtures/utils";
import { createTestServer } from "../test-server";

describe("PoiApi", () => {
  let server: Server;
  let created: Poi;

  beforeAll(async () => {
    server = await createTestServer();
  });

  beforeEach(async () => {
    await db.poiStore!.deleteAll();
    for (const poi of testPois) {
      await db.poiStore!.create(poi);
    }
    created = await db.poiStore!.create(singlePoi);
  });

  afterAll(async () => {
    await server.stop();
  });

  describe("GET /api/pois - find", () => {
    it("returns all pois", async () => {
      const response = await server.inject({ method: "GET", url: "/api/pois" });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Poi[];
      expect(body).toHaveLength(testPois.length + 1);
    });

    it("returns empty array when no pois exist", async () => {
      await db.poiStore!.deleteAll();
      const response = await server.inject({ method: "GET", url: "/api/pois" });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Poi[];
      expect(body).toEqual([]);
    });
  });

  describe("GET /api/pois/{id} - findOne", () => {
    it("returns one poi", async () => {
      const response = await server.inject({ method: "GET", url: `/api/pois/${created._id}` });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Poi;
      expect(body._id).toBe(created._id.toString());
      expect(body.name).toBe(created.name);
      expect(body.category).toBe(created.category);
    });

    it("returns 404 when poi not found", async () => {
      const response = await server.inject({ method: "GET", url: `/api/pois/${nonexistingId}` });
      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({ method: "GET", url: "/api/pois/invalid-id" });
      expect(response.statusCode).toBe(503);
    });
  });

  describe("POST /api/pois - create", () => {
    it("creates a poi", async () => {
      const res = await server.inject({
        method: "POST",
        url: "/api/pois",
        payload: otherPoi,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload) as Poi;
      expect(body._id).toBeDefined();
      expect(body.name).toBe(otherPoi.name);
      expect(body.description).toBe(otherPoi.description);
      expect(body.location).toStrictEqual(otherPoi.location);
      expect(body.category).toBe(otherPoi.category);
      expect(body.images).toStrictEqual(otherPoi.images);
    });
  });

  describe("PUT /api/pois/{id} - update", () => {
    it("updates a poi", async () => {
      const response = await server.inject({
        method: "PUT",
        url: `/api/pois/${created._id}`,
        payload: { name: "Updated POI", category: "hut" },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Poi;
      expect(body.name).toBe("Updated POI");
      expect(body.category).toBe("hut");
    });

    it("returns 404 when updating non-existent poi", async () => {
      const response = await server.inject({
        method: "PUT",
        url: `/api/pois/${nonexistingId}`,
        payload: { name: "Updated POI" },
      });

      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({
        method: "PUT",
        url: "/api/pois/invalid-id",
        payload: { name: "Updated POI" },
      });

      expect(response.statusCode).toBe(503);
    });
  });

  describe("DELETE /api/pois/{id} - deleteOne", () => {
    it("deletes a poi", async () => {
      const response = await server.inject({ method: "DELETE", url: `/api/pois/${created._id}` });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as { success: boolean };
      expect(body.success).toBe(true);

      const found = await db.poiStore!.findById(created._id);
      expect(found).toBeNull();
    });

    it("returns 404 when deleting non-existent poi", async () => {
      const response = await server.inject({ method: "DELETE", url: `/api/pois/${nonexistingId}` });

      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({ method: "DELETE", url: "/api/pois/invalid-id" });

      expect(response.statusCode).toBe(503);
    });
  });

  describe("POST /api/pois/{id}/image - addImage", () => {
    it("adds an image to a poi", async () => {
      const imageUrl = "https://example.com/image.jpg";
      const response = await server.inject({
        method: "POST",
        url: `/api/pois/${created._id}/images`,
        payload: { imageUrl },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload) as Poi;
      expect(body.images).toContain(imageUrl);
      expect(body.images).toHaveLength(created.images.length + 1);
    });

    it("returns 404 when adding image to non-existent poi", async () => {
      const response = await server.inject({
        method: "POST",
        url: `/api/pois/${nonexistingId}/image`,
        payload: { imageUrl: "https://example.com/image.jpg" },
      });

      expect(response.statusCode).toBe(404);
    });

    it("returns 503 for invalid id", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/api/pois/invalid-id/images",
        payload: { imageUrl: "https://example.com/image.jpg" },
      });

      expect(response.statusCode).toBe(503);
    });
  });
});
