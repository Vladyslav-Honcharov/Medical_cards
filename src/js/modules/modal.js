const btnCreateVisit = document.querySelector("#createFormVisit");

const btnCloseBtnVisit = document.querySelectorAll("#btnCloseVisit");
const modalVisit = new bootstrap.Modal(document.getElementById("modalVisit"));

btnCreateVisit.addEventListener("click", function () {
  modalVisit.show();
});

window.addEventListener("click", function (event) {
  if (event.target === modalVisit) {
    modalVisit.style.display = "none";
  }
});
