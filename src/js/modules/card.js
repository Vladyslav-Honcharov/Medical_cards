import { Therapist } from "./VisitTherapist.js";
import { Dentist } from "./VisitDentist.js";
import { Cardiologist } from "./VisitCardiologist.js";
import { pushCreate, colorCard, showCards } from "./createCards.js";

export async function showMore() {
  const showMoreBtns = document.querySelectorAll("#showMore");

  for (let i = 0; i < showMoreBtns.length; i++) {
    showMoreBtns[i].addEventListener("click", async function (e) {
      e.preventDefault();

      const currentCard = e.target.closest(".card");
      const currentHiddenInfo = currentCard.querySelector(".list-group");

      currentHiddenInfo.classList.toggle("hide");
    });
  }
}

export async function editCards() {
  const btnCreateVisitEdit = document.querySelector("#btnCreateVisitEdit");
  const btnCloseVisitEdit = document.querySelector("#btnCloseVisitEdit");

  const formVisitEdit = document.getElementById("formVisitEdit");
  formVisitEdit.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const editBtn = document.querySelectorAll("#editBtn");
  editBtn.forEach((button) => {
    button.addEventListener("click", doctorFormEdit);
  });

  // btnCreateVisitEdit.forEach((button) => {
  //   button.addEventListener("click", doctorFormEdit());
  // });

  async function doctorFormEdit(event) {
    event.preventDefault();
    let currentDoctor = null;

    const dentistInputs = document.querySelectorAll(".dentist");
    const cardiologistInputs = document.querySelectorAll(".cardiologist");
    const therapistInputs = document.querySelectorAll(".therapist");
    cardiologistInputs.forEach((e) => e.classList.add("hide"));
    therapistInputs.forEach((e) => e.classList.add("hide"));

    const editButton = event.target;

    const card = editButton.closest(".card");

    const cardTitleText = card.querySelector(".card-title").textContent;

    let cardId = card.getAttribute("data-id");

    const resetCurrentDoctor = () => {
      btnCreateVisitEdit.removeEventListener("click", currentDoctor);
      currentDoctor = null;
    };

    if (cardTitleText === "Терапевт") {
      therapistInputs.forEach((e) => e.classList.remove("hide"));
      resetCurrentDoctor();

      currentDoctor = async () => {
        const editVisit = new Therapist();
        await editVisit.editVisit(cardId);
        resetCurrentDoctor();
      };
    }
    if (cardTitleText === "Стоматолог") {
      dentistInputs.forEach((e) => e.classList.remove("hide"));

      currentDoctor = async () => {
        const editVisit = new Dentist();
        await editVisit.editVisit(cardId);
        resetCurrentDoctor();
      };
    }
    if (cardTitleText === "Кардіолог") {
      cardiologistInputs.forEach((e) => e.classList.remove("hide"));

      currentDoctor = async () => {
        const editVisit = new Cardiologist();
        await editVisit.editVisit(cardId);
        resetCurrentDoctor();
      };
    }

    if (currentDoctor) {
      console.log(btnCreateVisitEdit);
      btnCreateVisitEdit.addEventListener("click", async function () {
        //Валідація пустих інпутів
        const inputsValid = Array.from(
          formVisitEdit.querySelectorAll("input:not(.hide)")
        ).every((input) => input.value.trim() !== "");

        if (inputsValid) {
          formVisitEdit
            .querySelectorAll("input:not(.hide)")
            .forEach((input) => {
              input.classList.remove("error__input");
            });

          await currentDoctor();
          formVisitEdit.reset();
          btnCloseVisitEdit.click();
          await pushCreate();
        } else {
          formVisitEdit
            .querySelectorAll("input:not(.hide)")
            .forEach((input) => {
              input.classList.add("error__input");
              input.placeholder = "Введіть дані";
            });
        }
      });
    }
    formVisitEdit.reset();
  }
}

export async function visitDoneCheckbox() {
  const visitDoneCheckbox = document.querySelectorAll("#doneCheckbox");

  // const visitDoneCheckboxDiv = document.querySelectorAll("#doneCheckboxDiv");

  visitDoneCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", async function () {
      const card = this.closest(".card");
      const cardId = card.dataset.id;
      const visitDone = this.checked;
      const token = localStorage.getItem("token");
      const visitDoneCheckboxDiv = this.closest("#doneCheckboxDiv");

      if (this.checked) {
        visitDoneCheckboxDiv.remove();

        const response = await fetch(
          `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cardData = await response.json();

        cardData.visitDone = visitDone;

        const updateResponse = await fetch(
          `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cardData),
          }
        );

        pushCreate();
      }
    });
  });
}
