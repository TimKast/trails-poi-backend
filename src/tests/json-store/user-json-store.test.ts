import { beforeEach, describe, expect, it } from "vitest";
import { userJsonStore } from "../../models/json/user-json-store";

describe("UserJsonStore", () => {
  beforeEach(async () => {
    await userJsonStore.deleteAll();
  });

  describe("create", () => {
    it("creates a user with generated _id", async () => {
      const user = await userJsonStore.create({
        email: "test@example.com",
        password: "secret",
      });

      expect(user._id).toBeDefined();
      expect(user.email).toBe("test@example.com");
      expect(user.password).toBe("secret");
    });
  });

  describe("find", () => {
    it("returns empty array when no users exist", async () => {
      const users = await userJsonStore.find();
      expect(users).toEqual([]);
    });

    it("returns all users", async () => {
      const user1 = await userJsonStore.create({
        email: "user1@example.com",
        password: "pass1",
      });
      const user2 = await userJsonStore.create({
        email: "user2@example.com",
        password: "pass2",
      });

      const users = await userJsonStore.find();
      expect(users).toHaveLength(2);
      expect(users).toContainEqual(user1);
      expect(users).toContainEqual(user2);
    });
  });

  describe("findById", () => {
    it("returns user by id", async () => {
      const created = await userJsonStore.create({
        email: "find@example.com",
        password: "pass",
      });

      const found = await userJsonStore.findById(created._id);
      expect(found).toEqual(created);
    });

    it("returns null when user not found", async () => {
      const found = await userJsonStore.findById("nonexistent");
      expect(found).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("returns user by email", async () => {
      const created = await userJsonStore.create({
        email: "unique@example.com",
        password: "pass",
      });

      const found = await userJsonStore.findByEmail("unique@example.com");
      expect(found).toEqual(created);
    });

    it("returns null when user not found", async () => {
      const found = await userJsonStore.findByEmail("notfound@example.com");
      expect(found).toBeNull();
    });
  });

  describe("deleteById", () => {
    it("deletes user by id", async () => {
      const created = await userJsonStore.create({
        email: "delete@example.com",
        password: "pass",
      });

      await userJsonStore.deleteById(created._id);

      const found = await userJsonStore.findById(created._id);
      expect(found).toBeNull();
    });

    it("handles deletion of nonexistent user gracefully", async () => {
      // Should not throw
      await expect(userJsonStore.deleteById("nonexistent")).resolves.toBeUndefined();
    });
  });

  describe("deleteAll", () => {
    it("deletes all users", async () => {
      await userJsonStore.create({
        email: "user1@example.com",
        password: "pass1",
      });
      await userJsonStore.create({
        email: "user2@example.com",
        password: "pass2",
      });

      await userJsonStore.deleteAll();

      const users = await userJsonStore.find();
      expect(users).toHaveLength(0);
    });
  });
});
