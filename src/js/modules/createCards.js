import { showMore } from "./card.js";
import { noItemFun } from "./filterCards.js";
import { filterCards } from "./filterCards.js";
import { editCards, visitDoneCheckbox } from "./card.js";

// const token = "ae7e5a40-f03f-44bd-af6d-43753d1b9a28";
export const cardsList = document.querySelector(".card__list");
const cardsContainer = document.getElementById("cards-container");
const btnCreateVisit = document.getElementById("btnCreateVisit");

let cardsListArr;

async function pushCardsToArray() {
  let token = localStorage.getItem("token");
  const data = await fetch("https://ajax.test-danit.com/api/v2/cards/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let cardsListData = await data.json();
  cardsListArr = cardsListData;
}
pushCardsToArray();
export async function showCards() {
  cardsList.innerHTML = "";
  cardsListArr.forEach((card) => {
    if (card.title === "Візит до терапевта") {
      const cardNew = document.createElement("div");
      cardNew.classList.add("card");
      cardNew.classList.add("m-3");
      cardNew.setAttribute("data-id", `${card.id}`);
      cardNew.setAttribute("data-status", `${card.visitDone}`);
      cardNew.setAttribute("data-priority", `${card.priority}`);
      cardNew.setAttribute("data-goal", `${card.goal}`);
      cardNew.innerHTML = `    <div class="card-title">Терапевт</div>
      <button type="button" class="btn-close" id="deleteCard"></button>
      <div class="card-body">
      <h5 class="card-text">  <div class="card__goal">Ціль візиту: ${card.goal}</div></h5>
      <p class="card-text">      <div class="card__pacient">ПІБ: ${card.pacient}</div></p>
    </div>
    <div class="form-check" id="doneCheckboxDiv">
  <input class="form-check-input" type="checkbox" value="" id="doneCheckbox">
  <label class="form-check-label" for="defaultCheck1">
    Візит пройшов
  </label>
</div>
      
    <a href="#" class="btn btn-secondary" id="showMore">Показати більше</a>
    <ul class="list-group list-group-flush hide">
    <li class="list-group-item">Опис візиту: ${card.discription}</li>
    <li class="list-group-item">Пацієнт: ${card.pacient}</li>
    <li class="list-group-item">Пріорітет: ${card.priority} </li>
    <li class="list-group-item">Вік: ${card.ageTerapist} </li>
  </ul>
  <a href="#" class="btn btn-warning" id="editBtn" data-bs-toggle="modal" data-bs-target="#modalVisitEdit">Редагувати</a>
  `;
      cardsList.appendChild(cardNew);
    }
    if (card.title === "Візит до стоматолога") {
      const cardNew = document.createElement("div");
      cardNew.classList.add("card");
      cardNew.classList.add("m-3");
      cardNew.setAttribute("data-id", `${card.id}`);
      cardNew.setAttribute("data-status", `${card.visitDone}`);
      cardNew.setAttribute("data-priority", `${card.priority}`);
      cardNew.setAttribute("data-goal", `${card.goal}`);
      cardNew.innerHTML = `    <div class="card-title">Стоматолог</div>
      <button type="button" class="btn-close" id="deleteCard"></button>
      <div class="card-body">
      <h5 class="card-text">  <div class="card__goal">Ціль візиту: ${card.goal}</div></h5>
      <p class="card-text">      <div class="card__pacient">ПІБ: ${card.pacient}</div></p>
    </div>
    <div class="form-check" id="doneCheckboxDiv">
    <input class="form-check-input" type="checkbox" value="" id="doneCheckbox">
    <label class="form-check-label" for="defaultCheck1">
      Візит пройшов
    </label>
  </div>
      
    <a href="#" class="btn btn-secondary " id="showMore">Показати більше</a>
    <ul class="list-group list-group-flush hide">
    <li class="list-group-item">Опис візиту: ${card.discription}</li>
    <li class="list-group-item">Пацієнт: ${card.pacient}</li>
    <li class="list-group-item">Пріорітет: ${card.priority} </li>
    <li class="list-group-item">Дата останього візиту: ${card.dateLastVisit} </li>
  </ul>
  <a href="#" class="btn btn-warning" id="editBtn" data-bs-toggle="modal" data-bs-target="#modalVisitEdit">Редагувати</a>
  `;
      cardsList.appendChild(cardNew);
    }
    if (card.title === "Візит до кардіолога") {
      const cardNew = document.createElement("div");
      cardNew.classList.add("card");
      cardNew.classList.add("m-3");
      cardNew.setAttribute("data-id", `${card.id}`);
      cardNew.setAttribute("data-status", `${card.visitDone}`);
      cardNew.setAttribute("data-priority", `${card.priority}`);
      cardNew.setAttribute("data-goal", `${card.goal}`);
      cardNew.innerHTML = `    <div class="card-title">Кардіолог</div>
      <button type="button" class="btn-close" id="deleteCard"></button>
      <div class="card-body">
      <h5 class="card-text">  <div class="card__goal">Ціль візиту: ${card.goal}</div></h5>
      <p class="card-text">      <div class="card__pacient">ПІБ: ${card.pacient}</div></p>
    </div>
    <div class="form-check" id="doneCheckboxDiv">
    <input class="form-check-input" type="checkbox" value="" id="doneCheckbox">
    <label class="form-check-label" for="defaultCheck1">
      Візит пройшов
    </label>
  </div>
      
    <a href="#" class="btn btn-secondary" id="showMore">Показати більше</a>
    <ul class="list-group list-group-flush hide">
    <li class="list-group-item">Опис візиту: ${card.discription}</li>
    <li class="list-group-item">Пацієнт: ${card.pacient}</li>
    <li class="list-group-item">Пріорітет: ${card.priority} </li>

    <li class="list-group-item">Вік: ${card.ageCardiologist} </li>
    <li class="list-group-item">Індекс маси тіла: ${card.index} </li>
    <li class="list-group-item">Перенесені захворювання серцево-судинної системи : ${card.pastDiseases} </li>
    <li class="list-group-item">Тиск: ${card.pressure} </li>
    <li class="list-group-item">Пріорітет: ${card.priority} </li>

    </ul>
  <a href="#" class="btn btn-warning" id="editBtn" data-bs-toggle="modal" data-bs-target="#modalVisitEdit">Редагувати</a>
  `;
      cardsList.appendChild(cardNew);
    }
  });
}
export async function colorCard() {
  let children = Array.from(cardsList.children);
  children.forEach((cardColor) => {
    const status = cardColor.getAttribute("data-status");
    let visitDoneCheckboxDiv = cardColor.querySelector("#doneCheckboxDiv");
    if (status === "true") {
      cardColor.style.background = "#e3f3e1";
      visitDoneCheckboxDiv.classList.add("hide");
    } else if (status === "false") {
      cardColor.style.background = "#e8f196";
    }
  });
}

export async function pushCreate() {
  await pushCardsToArray();
  await showCards();
  await colorCard();

  await noItemFun();
  await filterCards();
  await showMore();
  await editCards();
  await visitDoneCheckbox();
}

btnCreateVisit.addEventListener("click", async function () {
  setTimeout(() => {
    pushCreate();
  }, 0);
  pushCreate();
});

document.addEventListener("DOMContentLoaded", async function () {
  await pushCreate();
});
