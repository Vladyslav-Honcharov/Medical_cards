import { Visit } from "./Visit.js";
// const token = "ae7e5a40-f03f-44bd-af6d-43753d1b9a28";
export class Dentist extends Visit {
  constructor(visitDone, goal, discription, priority, pacient, dateLastVisit) {
    super(visitDone, goal, discription, priority, pacient);
    this.dateLastVisit = dateLastVisit;
  }
  async createVisit() {
    super.createVisit();
    this.dateLastVisit = document.getElementById("date").value;
    const data = {
      title: "Візит до стоматолога",
      visitDone: this.visitDone,
      goal: this.goal,
      discription: this.discription,
      priority: this.priority,
      pacient: this.pacient,
      dateLastVisit: this.dateLastVisit,
    };
    let token = localStorage.getItem("token");
    const dataVisit = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const createNewVisit = await dataVisit.json();
    console.log(createNewVisit);
  }
  async editVisit(cardId) {
    super.editVisit();
    this.dateLastVisit = document.getElementById("dateEdit").value;
    const dataEdit = {
      title: "Візит до стоматолога",
      visitDone: this.visitDone,
      goal: this.goal,
      discription: this.discription,
      priority: this.priority,
      pacient: this.pacient,
      dateLastVisit: this.dateLastVisit,
    };
    let token = localStorage.getItem("token");
    const dataVisitEdit = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataEdit),
      }
    );
    const updateVisit = await dataVisitEdit.json();
  }
}
