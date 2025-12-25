import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMongo, disconnectMongo } from "../../models/mongo/connect";
import { userMongoStore } from "../../models/mongo/user-mongo-store";
import { User } from "../../types/model-types";
import { singleUser, testUsers } from "../fixtures/users";

describe("UserMongoStore", () => {
  let created: User;

  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  beforeEach(async () => {
    await userMongoStore.deleteAll();
    for (const user of testUsers) {
      await userMongoStore.create(user);
    }
    created = await userMongoStore.create(singleUser);
  });

  describe("create", () => {
    it("creates a user with generated _id", async () => {
      const user = await userMongoStore.create({
        email: "newuser@example.com",
        password: "password123",
      });

      expect(user._id).toBeDefined();
      expect(user.email).toBe("newuser@example.com");
      expect(user.password).toBe("password123");
    });
  });

  describe("find", () => {
    it("returns empty array when no users exist", async () => {
      await userMongoStore.deleteAll();
      const users = await userMongoStore.find();
      expect(users).toEqual([]);
    });

    it("returns all users", async () => {
      const users = await userMongoStore.find();
      expect(users).toHaveLength(testUsers.length + 1);
    });
  });

  describe("findById", () => {
    it("returns user by id", async () => {
      const found = await userMongoStore.findById(created._id);
      expect(found).toEqual(created);
    });

    it("returns null when user not found", async () => {
      const found = await userMongoStore.findById("507f1f77bcf86cd799439011");
      expect(found).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("returns user by email", async () => {
      const found = await userMongoStore.findByEmail(created.email);
      expect(found).toEqual(created);
    });

    it("returns null when user not found", async () => {
      const found = await userMongoStore.findByEmail("nonexistent@example.com");
      expect(found).toBeNull();
    });
  });

  describe("deleteById", () => {
    it("deletes a user by id", async () => {
      const user = await userMongoStore.create({
        email: "delete@example.com",
        password: "password",
      });

      await userMongoStore.deleteById(user._id);

      const found = await userMongoStore.findById(user._id);
      expect(found).toBeNull();
    });
  });

  describe("deleteAll", () => {
    it("deletes all users", async () => {
      await userMongoStore.create({
        email: "user1@example.com",
        password: "pass1",
      });
      await userMongoStore.create({
        email: "user2@example.com",
        password: "pass2",
      });

      await userMongoStore.deleteAll();

      const users = await userMongoStore.find();
      expect(users).toHaveLength(0);
    });
  });
});
