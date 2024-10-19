const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const authButton = document.getElementById("authButton");
const toggleLink = document.getElementById("toggleLink");
const errorMessage = document.getElementById("errorMessage");
const showPassword = document.getElementById("showPassword");
const passwordField = document.getElementById("password");

let isLogin = true;

showPassword.addEventListener("change", function () {
  passwordField.type = this.checked ? "text" : "password";
});

toggleLink.addEventListener("click", function () {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  authButton.textContent = isLogin ? "Sign In" : "Create Profile";
  toggleLink.textContent = isLogin ? "Sign Up" : "Login";
  errorMessage.textContent = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

authForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordField.value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Check for empty fields
  if (!email || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    errorMessage.className = "message error";
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isLogin) {
    if (users[email]) {
      if (users[email].password === password) {
        localStorage.setItem("currentUser", email);
        window.location.href = "./frofile/profile.html";
      } else {
        errorMessage.textContent = "Incorrect password.";
        errorMessage.className = "message error";
      }
    } else {
      errorMessage.textContent =
        "This is your first time. You need to sign up.";
      errorMessage.className = "message error";
    }
  } else {
    if (users[email]) {
      errorMessage.textContent = "You are already registered. Please login.";
      errorMessage.className = "message error";
    } else {
      users[email] = { password };
      localStorage.setItem("users", JSON.stringify(users));
      errorMessage.textContent = `Profile created for ${email}. Redirecting to profile...`;
      errorMessage.className = "message success";
      setTimeout(() => {
        localStorage.setItem("currentUser", email);
        window.location.href = "./frofile/profile.html";
      }, 2000);
    }
  }
});
