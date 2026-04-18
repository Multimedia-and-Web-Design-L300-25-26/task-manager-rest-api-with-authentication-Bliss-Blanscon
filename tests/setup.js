// tests/setup.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" }); // load test DB + JWT_SECRET

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to test DB");
  } catch (error) {
    console.error("Failed to connect to test DB", error);
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // clear DB after tests
  await mongoose.connection.close();
  console.log("Test DB disconnected");
});