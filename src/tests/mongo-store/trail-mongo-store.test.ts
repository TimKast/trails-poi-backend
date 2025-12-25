import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMongo, disconnectMongo } from "../../models/mongo/connect";
import { trailMongoStore } from "../../models/mongo/trail-mongo-store";
import { Trail } from "../../types/model-types";
import { singleTrail, testTrails } from "../fixtures/trails";

describe("TrailMongoStore", () => {
  let created: Trail;

  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  beforeEach(async () => {
    await trailMongoStore.deleteAll();
    for (const trail of testTrails) {
      await trailMongoStore.create(trail);
    }
    created = await trailMongoStore.create(singleTrail);
  });

  describe("create", () => {
    it("creates a trail with generated _id", async () => {
      const trail = await trailMongoStore.create({
        name: "Test Trail",
        description: "A trail for testing",
        location: { lat: 10, lng: 20 },
      });

      expect(trail._id).toBeDefined();
      expect(trail.name).toBe("Test Trail");
      expect(trail.description).toBe("A trail for testing");
      expect(trail.location).toEqual({ lat: 10, lng: 20 });
    });
  });

  describe("find", () => {
    it("returns empty array when no trails exist", async () => {
      await trailMongoStore.deleteAll();
      const trails = await trailMongoStore.find();
      expect(trails).toEqual([]);
    });

    it("returns all trails", async () => {
      const trails = await trailMongoStore.find();
      expect(trails).toHaveLength(4);
    });
  });

  describe("findById", () => {
    it("returns trail by id", async () => {
      const found = await trailMongoStore.findById(created._id);
      expect(found).toEqual(created);
    });

    it("returns null when trail not found", async () => {
      const found = await trailMongoStore.findById("507f1f77bcf86cd799439011");
      expect(found).toBeNull();
    });
  });

  describe("update", () => {
    it("updates an existing trail", async () => {
      const created = await trailMongoStore.create({
        name: "Old Trail",
        description: "Old description",
        location: { lat: 7, lng: 8 },
      });

      const updated = await trailMongoStore.update(created._id, {
        name: "Updated Trail",
        description: "Updated description",
        location: { lat: 3, lng: 5 },
      });

      expect(updated).toBeDefined();
      expect(updated?.name).toBe("Updated Trail");
      expect(updated?.description).toBe("Updated description");
      expect(updated?.location).toEqual({ lat: 3, lng: 5 });
    });

    it("returns null when updating non-existing trail", async () => {
      const updated = await trailMongoStore.update("507f1f77bcf86cd799439011", {
        name: "Should Not Update",
      });

      expect(updated).toBeNull();
    });
  });

  describe("deleteById", () => {
    it("deletes a trail by id", async () => {
      const created = await trailMongoStore.create({
        name: "Delete Trail",
        description: "Trail to delete",
        location: { lat: 9, lng: 10 },
      });

      await trailMongoStore.deleteById(created._id);

      const found = await trailMongoStore.findById(created._id);
      expect(found).toBeNull();
    });
  });

  describe("deleteAll", () => {
    it("deletes all trails", async () => {
      await trailMongoStore.create({
        name: "Trail A",
        description: "First trail",
        location: { lat: 11, lng: 12 },
      });
      await trailMongoStore.create({
        name: "Trail B",
        description: "Second trail",
        location: { lat: 13, lng: 14 },
      });

      await trailMongoStore.deleteAll();

      const trails = await trailMongoStore.find();
      expect(trails).toHaveLength(0);
    });
  });
});
