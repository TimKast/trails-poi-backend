import { beforeEach, describe, expect, it } from "vitest";
import { trailJsonStore } from "../../models/json/trail-json-store";

describe("TrailJsonStore", () => {
  beforeEach(async () => {
    await trailJsonStore.deleteAll();
  });

  describe("create", () => {
    it("creates a trail with generated _id", async () => {
      const trail = await trailJsonStore.create({
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
      const trails = await trailJsonStore.find();
      expect(trails).toEqual([]);
    });

    it("returns all trails", async () => {
      const trail1 = await trailJsonStore.create({
        name: "Trail 1",
        description: "First trail",
        location: { lat: 1, lng: 2 },
      });
      const trail2 = await trailJsonStore.create({
        name: "Trail 2",
        description: "Second trail",
        location: { lat: 3, lng: 4 },
      });

      const trails = await trailJsonStore.find();
      expect(trails).toHaveLength(2);
      expect(trails).toContainEqual(trail1);
      expect(trails).toContainEqual(trail2);
    });
  });

  describe("findById", () => {
    it("returns trail by id", async () => {
      const created = await trailJsonStore.create({
        name: "Find Trail",
        description: "Trail to find",
        location: { lat: 5, lng: 6 },
      });

      const found = await trailJsonStore.findById(created._id);
      expect(found).toEqual(created);
    });

    it("returns undefined when trail not found", async () => {
      const found = await trailJsonStore.findById("nonexistent");
      expect(found).toBeUndefined();
    });
  });

  describe("update", () => {
    it("updates an existing trail", async () => {
      const created = await trailJsonStore.create({
        name: "Old Trail",
        description: "Old description",
        location: { lat: 7, lng: 8 },
      });

      const updated = await trailJsonStore.update(created._id, {
        name: "Updated Trail",
        description: "Updated description",
        location: { lat: 3, lng: 5 },
      });

      expect(updated).toBeDefined();
      expect(updated?.name).toBe("Updated Trail");
      expect(updated?.description).toBe("Updated description");
      expect(updated?.location).toEqual({ lat: 3, lng: 5 });
    });

    it("returns undefined when updating non-existing trail", async () => {
      const fakeTrail = {
        _id: "fake-id",
        name: "Fake Trail",
        description: "Does not exist",
        location: { lat: 0, lng: 0 },
      };

      const updated = await trailJsonStore.update(fakeTrail._id, {
        name: "Should Not Update",
      });

      expect(updated).toBeUndefined();
    });
  });

  describe("deleteById", () => {
    it("deletes a trail by id", async () => {
      const created = await trailJsonStore.create({
        name: "Delete Trail",
        description: "Trail to delete",
        location: { lat: 9, lng: 10 },
      });

      await trailJsonStore.deleteById(created._id);

      const found = await trailJsonStore.findById(created._id);
      expect(found).toBeUndefined();
    });
  });

  describe("deleteAll", () => {
    it("deletes all trails", async () => {
      await trailJsonStore.create({
        name: "Trail A",
        description: "First trail",
        location: { lat: 11, lng: 12 },
      });
      await trailJsonStore.create({
        name: "Trail B",
        description: "Second trail",
        location: { lat: 13, lng: 14 },
      });

      await trailJsonStore.deleteAll();

      const trails = await trailJsonStore.find();
      expect(trails).toHaveLength(0);
    });
  });
});
