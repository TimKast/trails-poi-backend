import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMongo, disconnectMongo } from "../../helper/db-utils";
import { trailMongoStore } from "../../models/mongo/stores/trail-mongo-store";
import { Trail } from "../../types/model-types";
import { otherTrail, singleTrail, testTrails } from "../fixtures/trails";

describe("TrailMongoStore", () => {
  let created: Trail;

  beforeAll(async () => {
    await connectMongo(`${process.env.test_db}trail-mongo-store`);
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
      const trail = await trailMongoStore.create(otherTrail);

      expect(trail._id).toBeDefined();
      expect(trail.name).toBe(otherTrail.name);
      expect(trail.description).toBe(otherTrail.description);
      expect(trail.location).toEqual(otherTrail.location);
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
      expect(trails).toHaveLength(testTrails.length + 1);
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
      const updated = await trailMongoStore.update(created._id, otherTrail);

      expect(updated).toBeDefined();
      expect(updated?.name).toBe(otherTrail.name);
      expect(updated?.description).toBe(otherTrail.description);
      expect(updated?.location).toEqual(otherTrail.location);
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
      await trailMongoStore.deleteById(created._id);

      const found = await trailMongoStore.findById(created._id);
      expect(found).toBeNull();
    });
  });

  describe("deleteAll", () => {
    it("deletes all trails", async () => {
      await trailMongoStore.deleteAll();

      const trails = await trailMongoStore.find();
      expect(trails).toHaveLength(0);
    });
  });
});
