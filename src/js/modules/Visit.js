export class Visit {
  constructor(visitDone, goal, discription, priority, pacient) {
    this.visitDone = visitDone;
    this.goal = goal;
    this.discription = discription;
    this.priority = priority;
    this.pacient = pacient;
  }
  createVisit() {
    this.visitDone = document.getElementById("visitDone").checked;
    this.goal = document.getElementById("goal").value;
    this.discription = document.getElementById("discription").value;
    this.priority = document.getElementById("priority").value;
    this.pacient = document.getElementById("pacient").value;
  }
  editVisit(cardId) {
    this.visitDone = document.getElementById("visitDoneEdit").checked;
    this.goal = document.getElementById("goalEdit").value;
    this.discription = document.getElementById("discriptionEdit").value;
    this.priority = document.getElementById("priorityEdit").value;
    this.pacient = document.getElementById("pacientEdit").value;
  }
}
