const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUserEmail = localStorage.getItem("currentUser");
const currentUser = users[currentUserEmail]; // استرجاع بيانات المستخدم الحالي
//عرض معلومات الصفحه ولكن سناخر الاسم في الاخر لحين تحميل البيانات
document.getElementById("displayContact").textContent = currentUserEmail;

const usernameDisplay = document.getElementById("usernameDisplay");
const profileInfoDiv = document.getElementById("profileInfo");
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileFields = document.getElementById("editProfileFields");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const changePasswordField = document.getElementById("changePasswordField");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const uploadCoverBtn = document.getElementById("uploadCoverBtn");
const uploadProfileBtn = document.getElementById("uploadProfileBtn");
const uploadCoverInput = document.getElementById("uploadCoverInput");
const uploadProfileInput = document.getElementById("uploadProfileInput");
const coverPhoto = document.getElementById("coverPhoto");
const profilePic = document.getElementById("profilePic");
const logoutBtn = document.getElementById("logoutBtn");

// Display current user info
function displayUserInfo() {
  usernameDisplay.textContent = currentUser.username || "User Name";
  displayName.textContent = currentUser.username || "User Name";
  profileInfoDiv.innerHTML = `
          <p>College: ${currentUser.college || "N/A"}</p>
          <p>Gender: ${currentUser.gender || "N/A"}</p>
          <p>Birth Date: ${currentUser.birthDate || "N/A"}</p>
          <p>Age: ${calculateAge(currentUser.birthDate) || "N/A"}</p>
          <p>Marital Status: ${currentUser.socialStatus || "N/A"}</p>
          <p>Work Place: ${currentUser.workPlace || "N/A"}</p>
          <p>Residence: ${currentUser.residence || "N/A"}</p>
          <p>Job Type: ${currentUser.jobType || "N/A"}</p>
          <p>Contact: ${currentUser.contact || "N/A"}</p>
        `;
  coverPhoto.src = currentUser.coverPhoto || "";
  profilePic.src = currentUser.profilePic || "";
}

// Calculate age from birth date
function calculateAge(birthDate) {
  if (!birthDate) return null;
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
}

// Save edited profile information
function saveProfileInfo() {
  // currentUser.username = document.getElementById("nameInput").value;
  // currentUser.college = document.getElementById("collegeInput").value;
  // currentUser.gender = document.getElementById("genderInput").value;
  // currentUser.birthDate = document.getElementById("birthDateInput").value;
  // currentUser.socialStatus =
  //   document.getElementById("socialStatusInput").value;
  // currentUser.workPlace = document.getElementById("workPlaceInput").value;
  // currentUser.residence = document.getElementById("residenceInput").value;
  // currentUser.jobType = document.getElementById("jobTypeInput").value;
  // currentUser.contact = document.getElementById("contactInput").value;
  ///////////////////
  // تحديث قيم المستخدم فقط إذا لم تكن الحقول فارغة
  const nameInput = document.getElementById("nameInput").value;
  const collegeInput = document.getElementById("collegeInput").value;
  const genderInput = document.getElementById("genderInput").value;
  const birthDateInput = document.getElementById("birthDateInput").value;
  const socialStatusInput = document.getElementById("socialStatusInput").value;
  const workPlaceInput = document.getElementById("workPlaceInput").value;
  const residenceInput = document.getElementById("residenceInput").value;
  const jobTypeInput = document.getElementById("jobTypeInput").value;
  const contactInput = document.getElementById("contactInput").value;

  // تحقق من القيم وأدخل القيم الجديدة فقط إذا كانت غير فارغة
  if (nameInput) currentUser.username = nameInput;
  if (collegeInput) currentUser.college = collegeInput;
  if (genderInput) currentUser.gender = genderInput;
  if (birthDateInput) currentUser.birthDate = birthDateInput;
  if (socialStatusInput) currentUser.socialStatus = socialStatusInput;
  if (workPlaceInput) currentUser.workPlace = workPlaceInput;
  if (residenceInput) currentUser.residence = residenceInput;
  if (jobTypeInput) currentUser.jobType = jobTypeInput;
  if (contactInput) currentUser.contact = contactInput;

  // حفظ التغييرات في اللوكال استوراج
  users[currentUserEmail] = currentUser;
  localStorage.setItem("users", JSON.stringify(users));

  // عرض المعلومات المحدثة
  displayUserInfo();
  // إخفاء حقول تعديل الملف الشخصي
  editProfileFields.classList.add("hidden");
  alert("data saved successfully!");
}
// Save new password
function saveNewPassword() {
  const newPassword = document.getElementById("newPasswordInput").value;

  //currentUser.password = newPassword;
  ///////////////////
  if (newPassword) {
    currentUser.password = newPassword;
    users[currentUserEmail] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password changed successfully!");
  } else {
    alert("please write value for password");
  }
  changePasswordField.classList.add("hidden");
}

// Handle upload cover photo
function handleUploadCover() {
  uploadCoverInput.click();
}

// Handle upload profile picture
function handleUploadProfile() {
  uploadProfileInput.click();
}

// Update cover photo
uploadCoverInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverPhoto.src = e.target.result;
      currentUser.coverPhoto = e.target.result;
      users[currentUserEmail] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    };
    reader.readAsDataURL(file);
  }
});

// Update profile picture
uploadProfileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePic.src = e.target.result;
      currentUser.profilePic = e.target.result;
      users[currentUserEmail] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    };
    reader.readAsDataURL(file);
  }
});

// Toggle edit profile fields
editProfileBtn.addEventListener("click", () => {
  editProfileFields.classList.toggle("hidden");
});

// Save profile info
saveProfileBtn.addEventListener("click", saveProfileInfo);

// Toggle change password field
changePasswordBtn.addEventListener("click", () => {
  changePasswordField.classList.toggle("hidden");
});

// Save new password
savePasswordBtn.addEventListener("click", saveNewPassword);

// Upload cover photo
uploadCoverBtn.addEventListener("click", handleUploadCover);

// Upload profile picture
uploadProfileBtn.addEventListener("click", handleUploadProfile);

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html"; // Redirect to login page
});
// Delete profile
document.getElementById("deleteProfileBtn").addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    )
  ) {
    delete users[currentUserEmail];
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"; // Redirect to registration page
  }
});

// Display user info on load
window.onload = displayUserInfo;
