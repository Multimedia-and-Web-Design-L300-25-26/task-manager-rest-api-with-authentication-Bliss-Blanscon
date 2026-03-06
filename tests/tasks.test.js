// tests/tasks.test.js
import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `task${Date.now()}@example.com`;
  const password = "password123";

  // Register test user
  await request(app).post("/api/auth/register").send({ name: "Task User", email, password });

  // Login to get token
  const res = await request(app).post("/api/auth/login").send({ email, password });
  token = res.body.token;
});

describe("Task Routes", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test Desc" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("should get user tasks only", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});