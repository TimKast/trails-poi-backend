import { Server } from "@hapi/hapi";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "../../models/db";
import { initServerSecurity } from "../../server";
import { otherUser, singleUser } from "../fixtures/users";
import { createTestServer } from "../test-server";

describe("AuthApi", () => {
  let server: Server;

  beforeAll(async () => {
    server = await createTestServer("mongo");
    await initServerSecurity(server);
  });
  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await db.userStore!.deleteAll();
    await db.userStore!.create(singleUser);
  });

  describe("Signup", () => {
    it("should create a new user", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/api/signup",
        payload: otherUser,
      });
      expect(response.statusCode).toBe(201);

      const createdUser = await db.userStore!.findByEmail(otherUser.email);
      expect(createdUser).toBeDefined();
      expect(createdUser!._id).toBeDefined();
      expect(createdUser!.email).toBe(otherUser.email);
    });

    it("should not allow duplicate emails", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/api/signup",
        payload: singleUser,
      });
      expect(response.statusCode).toBe(409);
      const body = JSON.parse(response.payload) as { error: string; message: string };
      expect(body.error).toBe("Conflict");
      expect(body.message).toBe("User already exists");
    });
  });

  describe("Authentication", () => {
    it("should set a cookie upon successful authentication", async () => {
      const response = await server.inject({ method: "POST", url: "/api/authenticate", payload: singleUser });
      expect(response.statusCode).toBe(201);
      const cookie = response.headers["set-cookie"];
      expect(cookie).toBeDefined();
      expect(cookie![0]).toContain(`${process.env.cookie_name}=`);
    });

    it("should authenticate valid Users", async () => {
      const response = await server.inject({ method: "POST", url: "/api/authenticate", payload: singleUser });
      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.payload) as { success: boolean };
      expect(body.success).toBe(true);
    });

    it("should reject invalid Passwords", async () => {
      const response = await server.inject({ method: "POST", url: "/api/authenticate", payload: { email: singleUser.email, password: "wrongpassword" } });
      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.payload) as { error: string; message: string };
      expect(body.error).toBe("Unauthorized");
      expect(body.message).toBe("Invalid password");
    });

    it("should reject non-existing Users", async () => {
      const response = await server.inject({ method: "POST", url: "/api/authenticate", payload: { email: "wrong@email", password: singleUser.password } });
      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.payload) as { error: string; message: string };
      expect(body.error).toBe("Unauthorized");
      expect(body.message).toBe("User not found");
    });
  });

  describe("Logout", () => {
    it("should clear the authentication cookie", async () => {
      const response = await server.inject({ method: "POST", url: "/api/authenticate", payload: singleUser });
      expect(response.statusCode).toBe(201);
      const cookie = response.headers["set-cookie"];
      expect(cookie).toBeDefined();

      const logoutResponse = await server.inject({
        method: "POST",
        url: "/api/logout",
      });
      expect(logoutResponse.statusCode).toBe(200);
      const logoutCookie = logoutResponse.headers["set-cookie"];
      expect(logoutCookie).toBeDefined();
      expect(logoutCookie![0]).toContain(`${process.env.cookie_name}=;`);
    });
  });

  describe("Protected Route Access", () => {
    it("should deny access to protected routes without authentication", async () => {
      const response = await server.inject({ method: "GET", url: "/api/trails" });
      expect(response.statusCode).toBe(401);
    });

    it("should allow access to protected routes with valid authentication", async () => {
      const authResponse = await server.inject({ method: "POST", url: "/api/authenticate", payload: singleUser });
      expect(authResponse.statusCode).toBe(201);

      let cookie = authResponse.headers["set-cookie"];
      cookie = cookie![0].split(";")[0];

      const protectedResponse = await server.inject({
        method: "GET",
        url: "/api/trails",
        headers: { cookie },
      });

      expect(protectedResponse.statusCode).toBe(200);
    });
  });
});
