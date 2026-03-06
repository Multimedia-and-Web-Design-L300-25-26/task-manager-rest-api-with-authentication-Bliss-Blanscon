// quick-test.js
import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000"; // Make sure your server is running
const PASSWORD = "password123";

async function main() {
  try {
    console.log("=== Quick Test Start ===");

    // 1️⃣ Register a new user
    const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Quick Test User",
        email: `quick${Date.now()}@example.com`,
        password: PASSWORD,
      }),
    });
    const registerData = await registerRes.json();
    console.log("Register Response:", registerData);

    // 2️⃣ Login with the user
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerData.email,
        password: PASSWORD,
      }),
    });
    const loginData = await loginRes.json();
    console.log("Login Response:", loginData);

    const token = loginData.token;
    if (!token) {
      console.error("No token returned. Exiting test.");
      return;
    }

    // 3️⃣ Create a new task
    const createTaskRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Quick Test Task",
        description: "Testing tasks via Node script",
      }),
    });
    const taskData = await createTaskRes.json();
    console.log("Create Task Response:", taskData);

    // 4️⃣ Get all tasks for this user
    const getTasksRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const tasks = await getTasksRes.json();
    console.log("Get Tasks Response:", tasks);

    console.log("=== Quick Test Complete ===");
  } catch (err) {
    console.error("Error during quick test:", err);
  }
}

main();