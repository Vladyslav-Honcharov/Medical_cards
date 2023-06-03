import { Visit } from "./Visit.js";
// const token = "ae7e5a40-f03f-44bd-af6d-43753d1b9a28";
export class Cardiologist extends Visit {
  constructor(
    visitDone,
    goal,
    discription,
    priority,
    pacient,
    pressure,
    index,
    pastDiseases
  ) {
    super(visitDone, goal, discription, priority, pacient);
    this.pressure = pressure;
    this.index = index;
    this.pastDiseases = pastDiseases;
    this.ageCardiologist = ageCardiologist;
  }
  async createVisit() {
    super.createVisit();

    this.pressure = document.getElementById("pressure").value;
    this.index = document.getElementById("index").value;
    this.pastDiseases = document.getElementById("pastDiseases").value;
    this.ageCardiologist = document.getElementById("ageCardiologist").value;
    const data = {
      title: "Візит до кардіолога",
      visitDone: this.visitDone,
      goal: this.goal,
      discription: this.discription,
      priority: this.priority,
      pacient: this.pacient,
      pressure: this.pressure,
      index: this.index,
      pastDiseases: this.pastDiseases,
      ageCardiologist: this.ageCardiologist,
    };
    let token = localStorage.getItem("token");
    const dataVisit = await fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const createNewVisit = await dataVisit.json();
  }
  async editVisit(cardId) {
    super.editVisit();

    this.pressure = document.getElementById("pressureEdit").value;
    this.index = document.getElementById("indexEdit").value;
    this.pastDiseases = document.getElementById("pastDiseasesEdit").value;
    this.ageCardiologist = document.getElementById("ageCardiologistEdit").value;
    const dataEdit = {
      title: "Візит до кардіолога",
      visitDone: this.visitDone,
      goal: this.goal,
      discription: this.discription,
      priority: this.priority,
      pacient: this.pacient,
      pressure: this.pressure,
      index: this.index,
      pastDiseases: this.pastDiseases,
      ageCardiologist: this.ageCardiologist,
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
