import { Visit } from "./Visit.js";
import { Therapist } from "./VisitTherapist.js";
import { Dentist } from "./VisitDentist.js";
import { Cardiologist } from "./VisitCardiologist.js";

const formSelectDoctor = document.querySelector("#selectDoctor");
const formVisit = document.querySelector(".formVisit");
const numberInput = document.querySelectorAll(".number-input");
const btnCreateVisit = document.getElementById("btnCreateVisit");
const btnCreateFormVisit = document.getElementById("createFormVisit");
const btnCloseModal = document.getElementById("btnCloseVisit");
const visitDone = document.getElementById("visitDone");

numberInput.forEach((e) => {
  //Тільки цифрові інпути
  e.addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/\D/g, "");
  });
});

formVisit.addEventListener("submit", (e) => {
  e.preventDefault();
});

btnCreateFormVisit.addEventListener("click", doctorForm);
async function doctorForm(event) {
  event.preventDefault();
  let currentDoctor = null;
  formVisit.reset();

  let doctorSelect = document.getElementById("doctorSelect");
  const dentistInputs = document.querySelectorAll(".dentist");
  const cardiologistInputs = document.querySelectorAll(".cardiologist");
  const therapistInputs = document.querySelectorAll(".therapist");

  dentistInputs.forEach((e) => e.classList.add("hide"));
  cardiologistInputs.forEach((e) => e.classList.add("hide"));
  therapistInputs.forEach((e) => e.classList.add("hide"));

  const resetCurrentDoctor = () => {
    btnCreateVisit.removeEventListener("click", currentDoctor);
    currentDoctor = null;
  };

  if (doctorSelect.value === "therapist") {
    therapistInputs.forEach((e) => e.classList.remove("hide"));
    resetCurrentDoctor();

    currentDoctor = async () => {
      const newVisit = new Therapist();
      await newVisit.createVisit();
      resetCurrentDoctor();
    };
  }
  if (doctorSelect.value === "dentist") {
    dentistInputs.forEach((e) => e.classList.remove("hide"));

    currentDoctor = async () => {
      const newVisit = new Dentist();
      await newVisit.createVisit();
      resetCurrentDoctor();
    };
  }
  if (doctorSelect.value === "cardiologist") {
    cardiologistInputs.forEach((e) => e.classList.remove("hide"));

    currentDoctor = async () => {
      const newVisit = new Cardiologist();
      await newVisit.createVisit();
      resetCurrentDoctor();
    };
  }

  if (currentDoctor) {
    btnCreateVisit.removeEventListener("click", currentDoctor);
    btnCreateVisit.addEventListener("click", async function () {
      //Валідація пустих інпутів
      const inputsValid = Array.from(
        formVisit.querySelectorAll("input:not(.hide)")
      ).every((input) => input.value.trim() !== "");

      if (inputsValid) {
        formVisit.querySelectorAll("input:not(.hide)").forEach((input) => {
          input.classList.remove("error__input");
        });

        await currentDoctor();
        formVisit.reset();
        btnCloseModal.click();
      } else {
        formVisit.querySelectorAll("input:not(.hide)").forEach((input) => {
          input.classList.add("error__input");
          input.placeholder = "Введіть дані";
        });
      }
    });
  }
  formSelectDoctor.reset();
}
