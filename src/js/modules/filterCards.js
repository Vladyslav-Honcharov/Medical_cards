const searchInput = document.getElementById("search");
const visitDoneCheckbox = document.getElementById("visitDoneFilter");
const visitWaitCheckbox = document.getElementById("visitWaitFilter");
const highPriorityCheckbox = document.getElementById("high");
const mediumPriorityCheckbox = document.getElementById("medium");
const lowPriorityCheckbox = document.getElementById("low");
const cardsContainer = document.getElementById("cards-container");

//Фільтер каток

export async function filterCards() {
  const childrens = Array.prototype.map.call(
    cardsContainer.children,
    (child) => ({
      visitDone: child.getAttribute("data-status"),
      priority: child.getAttribute("data-priority"),
      goal: child.getAttribute("data-goal"),
    })
  );

  const searchText = searchInput.value.toLowerCase().trim();
  const visitDone = visitDoneCheckbox.checked;
  const visitWait = visitWaitCheckbox.checked;
  const highPriority = highPriorityCheckbox.checked;
  const mediumPriority = mediumPriorityCheckbox.checked;
  const lowPriority = lowPriorityCheckbox.checked;

  Array.prototype.forEach.call(cardsContainer.children, (card) => {
    const title = card.getAttribute("data-goal").toLowerCase();
    const status = card.getAttribute("data-status");
    const priority = card.getAttribute("data-priority").toLowerCase();

    // Умови для фільтрації
    const isVisible =
      (searchText === "" || title.includes(searchText)) &&
      ((visitDone && status === "true") ||
        (visitWait && status === "false") ||
        (!visitDone && !visitWait)) &&
      ((highPriority && priority === "важливий") ||
        (mediumPriority && priority === "середній") ||
        (lowPriority && priority === "низький") ||
        (!highPriority && !mediumPriority && !lowPriority) ||
        (highPriority && mediumPriority && lowPriority));

    if (isVisible) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

window.addEventListener("load", filterCards);

searchInput.addEventListener("input", filterCards);
visitDoneCheckbox.addEventListener("change", filterCards);
visitWaitCheckbox.addEventListener("change", filterCards);
highPriorityCheckbox.addEventListener("change", filterCards);
mediumPriorityCheckbox.addEventListener("change", filterCards);
lowPriorityCheckbox.addEventListener("change", filterCards);

export async function noItemFun() {
  const noItem = document.querySelector(".no__item");

  if (cardsContainer.childNodes.length > 0) {
    noItem.classList.add("hide");
  } else {
    noItem.classList.remove("hide");
  }

  const childNodes = Array.from(cardsContainer.childNodes);
  const allHidden = childNodes.every((node) => node.classList.contains("hide"));

  if (allHidden) {
    noItem.classList.remove("hide");
  }
}

document.getElementById("filterForm").addEventListener("input", async () => {
  await noItemFun();
});
document.getElementById("filterForm").addEventListener("change", async () => {
  await noItemFun();
});
