// tests/auth.test.js
import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {
  const email = `test${Date.now()}@example.com`; // unique email
  const password = "password123";
  let token;

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email,
      password,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email,
      password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token; // use this internally if needed
  });
});