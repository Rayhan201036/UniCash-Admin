document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const loginBtn = document.getElementById("loginBtn");

  // Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyMnkzLAGpCN8dMcT2oCb2bjHIxYCY_sZhSFw1PPmAbFba-JoqcWo1xOVvY9saHGiVI/exec";

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      loginMessage.textContent = "⚠️ Please enter both username and password.";
      return;
    }

    loginBtn.disabled = true;
    loginMessage.textContent = "🔎 Checking credentials...";

    try {
      // ✅ Call Google Script with GET request
      const response = await fetch(
        `${SCRIPT_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );
      const result = await response.json();

      if (result.status === "success") {
        loginMessage.textContent = "✅ Login successful! Redirecting...";

        // Save user data locally
        localStorage.setItem("username", username);
        localStorage.setItem("role", result.role);

        setTimeout(() => {
          if (result.role === "admin") {
            window.location.href = "admin.html"; // 🔥 redirect admins
          } else {
            window.location.href = "admin.html"; // 🔥 redirect normal users
          }
        }, 1000);
      } else {
        loginMessage.textContent = "❌ Invalid username or password.";
      }
    } catch (error) {
      console.error("Login error:", error);
      loginMessage.textContent = "🚨 Error connecting to server.";
    } finally {
      loginBtn.disabled = false;
    }
  });
});
