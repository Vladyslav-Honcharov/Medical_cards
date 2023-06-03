const loginBtn = document.querySelector("#btnLogin");
const formUser = document.querySelector(".userInfo");
const modalUser = document.querySelector("#loginUser");
const users = [
  { email: "admin@gmail.com", pass: "12345" },
  { email: "doctor@gmail.com", pass: "11111" },
  { email: "medic@gmail.com", pass: "54321" },
];

formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});
function createBtnExit() {
  const btnExit = document.createElement("div");
  btnExit.innerHTML = ` <button
    class="btn btn-danger"
    id="btnExit"
    type="button"
  >
    Вийти з профілю
  </button>`;
  const navbar = document.querySelector("#nav");
  navbar.appendChild(btnExit);
  btnExit.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
}

function createBtnVisite() {
  loginBtn.classList.add("hide");
  const createVisite = document.createElement("div");
  createVisite.innerHTML = ` <button
    class="btn btn-primary"
    id="btnVisit"
    type="button"
    data-bs-toggle="modal"
        data-bs-target="#modalDoctor"
  >
    Створити візит
  </button>`;
  const navbar = document.querySelector("#nav");
  navbar.appendChild(createVisite);
}

async function loginUser() {
  const userEmail = document.querySelector("#userEmail").value;
  const userPassword = document.querySelector("#userPassword").value;
  const errorUser = document.querySelector("#errorUser");
  const user = users.find(function (user) {
    return user.email === userEmail && user.pass === userPassword;
  });

  if (user) {
    formUser.reset();
    errorUser.classList.add("hide");
    localStorage.setItem("user", user.email);
    const modalInstance = bootstrap.Modal.getInstance(modalUser);
    modalInstance.hide();

    // await createBtnVisite();
    await setToken();
    location.reload();
  } else {
    errorUser.classList.remove("hide");
  }
}
async function setToken() {
  const userInLocal = localStorage.getItem("user");
  let token;
  if (userInLocal === "medic@gmail.com") {
    token = "ae7e5a40-f03f-44bd-af6d-43753d1b9a28";
    createBtnVisite();
    createBtnExit();
  }
  if (userInLocal === "doctor@gmail.com") {
    token = "c22c33be-3d53-47cd-9890-4020fa94fd61";
    createBtnVisite();
    createBtnExit();
  }
  if (userInLocal === "admin@gmail.com") {
    token = "f70d32bf-8e19-474d-bf75-90c23f82846b";
    createBtnVisite();
    createBtnExit();
  }
  localStorage.setItem("token", token);
}

window.addEventListener("load", async function () {
  setToken();
  // await location.reload();
});
