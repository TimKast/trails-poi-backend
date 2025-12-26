import { Server } from "@hapi/hapi";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "../../models/db";
import { initServerSecurity } from "../../server";
import { User } from "../../types/model-types";
import { adminUser, singleUser, testUsers } from "../fixtures/users";
import { nonexistingId } from "../fixtures/utils";
import { createTestServer } from "../test-server";

describe("AdminApi", () => {
  let server: Server;
  let user: User;
  let admin: User;
  let cookie: string[] | string | undefined;

  beforeAll(async () => {
    server = await createTestServer();
    await initServerSecurity(server);
  });
  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await db.userStore!.deleteAll();
    for (const testUser of testUsers) {
      await db.userStore!.create(testUser);
    }
    user = await db.userStore!.create(singleUser);
    admin = await db.userStore!.create(adminUser);
    await db.userStore!.makeAdmin(admin._id);
    const res = await server.inject({
      method: "POST",
      url: "/api/authenticate",
      payload: { email: admin.email, password: admin.password },
    });
    cookie = res.headers["set-cookie"];
    cookie = cookie![0].split(";")[0];
  });
  afterEach(async () => {
    await server.inject({
      method: "POST",
      url: "/api/logout",
      headers: { cookie },
    });
  });
  describe("Make Admin", () => {
    it("should make a user an admin", async () => {
      expect(user.role).toBe("user");

      const response = await server.inject({
        method: "POST",
        url: `/api/admin/${user._id}`,
        headers: { cookie },
      });
      console.log("Make admin response:", response.statusCode, response.payload);
      expect(response.statusCode).toBe(200);

      const updatedUser = await db.userStore!.findById(user._id);
      expect(updatedUser).toBeDefined();
      expect(updatedUser!.role).toBe("admin");
    });

    it("should return 404 for non-existing user", async () => {
      const response = await server.inject({
        method: "POST",
        url: `/api/admin/${nonexistingId}`,
        headers: { cookie },
      });
      expect(response.statusCode).toBe(404);
    });

    it("should return 503 for invalid id", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/api/admin/invalid-id",
        headers: { cookie },
      });
      expect(response.statusCode).toBe(503);
    });
  });

  describe("Find Users", () => {
    it("should return all users", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/api/users",
        headers: { cookie },
      });
      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.payload) as User[];
      expect(body).toHaveLength(testUsers.length + 2);
    });
  });

  describe("Delete User", () => {
    it("should delete a user by id", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: `/api/users/${user._id}`,
        headers: { cookie },
      });
      expect(response.statusCode).toBe(200);

      const deletedUser = await db.userStore!.findById(user._id);
      expect(deletedUser).toBeNull();
    });

    it("should return 404 for non-existing user", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: `/api/users/${nonexistingId}`,
        headers: { cookie },
      });
      expect(response.statusCode).toBe(404);
    });

    it("should return 503 for invalid id", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: "/api/users/invalid-id",
        headers: { cookie },
      });
      expect(response.statusCode).toBe(503);
    });
  });

  describe("Delete All Users", () => {
    it("should delete all users", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: "/api/users",
        headers: { cookie },
      });
      expect(response.statusCode).toBe(200);

      const remainingUsers = await db.userStore!.find();
      expect(remainingUsers).toHaveLength(0);
    });
  });
});
