import { cardsList } from "./createCards.js";
import { showMore } from "./card.js";
import { noItemFun } from "./filterCards.js";
const btnDeleteCard = document.querySelectorAll("#deleteCard");
// const token = "ae7e5a40-f03f-44bd-af6d-43753d1b9a28";

cardsList.addEventListener("click", async function (event) {
  if (event.target.classList.contains("btn-close")) {
    await deleteCard();
    await noItemFun();
  }
});
async function deleteCard() {
  const deleteButton = event.target;
  const card = deleteButton.closest(".card");
  const cardId = card.getAttribute("data-id");
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      card.remove();
    } else {
      console.log("Помилка при видалені");
    }
  } catch (error) {
    console.log("Помилка в запиті", error);
  }
}
