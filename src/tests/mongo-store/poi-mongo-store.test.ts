import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMongo, disconnectMongo } from "../../helper/db-utils";
import { poiMongoStore } from "../../models/mongo/stores/poi-mongo-store";
import { otherPoi, singlePoi, testPois } from "../../tests/fixtures/pois";
import { Poi } from "../../types/model-types";

describe("PoiMongoStore", () => {
  let created: Poi;

  beforeAll(async () => {
    await connectMongo(`${process.env.test_db}poi-mongo-store`);
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  beforeEach(async () => {
    await poiMongoStore.deleteAll();
    for (const poi of testPois) {
      await poiMongoStore.create(poi);
    }
    created = await poiMongoStore.create(singlePoi);
  });

  describe("create", () => {
    it("creates a poi with generated _id", async () => {
      const poi = await poiMongoStore.create(otherPoi);

      expect(poi._id).toBeDefined();
      expect(poi.name).toBe(otherPoi.name);
      expect(poi.description).toBe(otherPoi.description);
      expect(poi.location).toEqual(otherPoi.location);
      expect(poi.category).toBe(otherPoi.category);
      expect(poi.images).toEqual(otherPoi.images);
    });
  });

  describe("find", () => {
    it("returns empty array when no pois exist", async () => {
      await poiMongoStore.deleteAll();
      const pois = await poiMongoStore.find();
      expect(pois).toEqual([]);
    });

    it("returns all pois", async () => {
      const pois = await poiMongoStore.find();
      expect(pois).toHaveLength(testPois.length + 1);
    });
  });

  describe("findById", () => {
    it("returns poi by id", async () => {
      const found = await poiMongoStore.findById(created._id);
      expect(found).toEqual(created);
    });

    it("returns null when poi not found", async () => {
      const found = await poiMongoStore.findById("507f1f77bcf86cd799439011");
      expect(found).toBeNull();
    });
  });

  describe("update", () => {
    it("updates an existing poi", async () => {
      const created = await poiMongoStore.create(otherPoi);

      const updated = await poiMongoStore.update(created._id, {
        name: "Updated POI",
        description: "Updated description",
        location: {
          type: "Point",
          coordinates: [3, 5],
        },
        category: "hut",
      });

      expect(updated).toBeDefined();
      expect(updated!.name).toBe("Updated POI");
      expect(updated!.description).toBe("Updated description");
      expect(updated!.location).toEqual({ type: "Point", coordinates: [3, 5] });
      expect(updated!.category).toBe("hut");
    });

    it("returns null when updating non-existing poi", async () => {
      const updated = await poiMongoStore.update("507f1f77bcf86cd799439011", {
        name: "Should Not Update",
      });

      expect(updated).toBeNull();
    });
  });

  describe("deleteById", () => {
    it("deletes a poi by id", async () => {
      await poiMongoStore.deleteById(created._id);

      const found = await poiMongoStore.findById(created._id);
      expect(found).toBeNull();
    });
  });

  describe("deleteAll", () => {
    it("deletes all pois", async () => {
      await poiMongoStore.deleteAll();

      const pois = await poiMongoStore.find();
      expect(pois).toHaveLength(0);
    });
  });

  describe("addImage", () => {
    it("adds an image to an existing poi", async () => {
      const imageUrl = "https://example.com/image.jpg";
      const updated = await poiMongoStore.addImage(created._id, imageUrl);

      expect(updated).toBeDefined();
      expect(updated?.images).toContain(imageUrl);
      expect(updated?.images).toHaveLength(created.images.length + 1);
    });

    it("returns null when adding image to non-existing poi", async () => {
      const updated = await poiMongoStore.addImage("507f1f77bcf86cd799439011", "https://example.com/image.jpg");
      expect(updated).toBeNull();
    });
  });
});
