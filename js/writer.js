import { stored, add, back } from "../lang/messages/en/user.js"

const content = document.getElementById("content");

function addNote() {
  content.appendChild(createNoteElement());
}

function createNoteElement() {
  const note = document.createElement("div");
  note.className = "note";
  note.appendChild(document.createElement("textarea"));
  note.appendChild(createRemoveButton());
  return note;
}

function createRemoveButton() {
  const button = document.createElement("button");
  button.className = "remove";
  button.textContent = "Remove";
  button.onclick = () => {
    button.parentElement.remove();
    saveNotes();
  };
  return button;
}

function saveNotes() {
  const notes = Array.from(content.children).map((note) => note.children[0].value);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("storeTime", new Date());
  displayStoreTime();
}

function loadNotes() {
  displayStoreTime();
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes.forEach((note) => {
    const noteElement = createNoteElement();
    noteElement.children[0].value = note;
    content.appendChild(noteElement);
  });
}

function displayStoreTime() {
  document.getElementById("storeTime").innerHTML = stored +  new Date(localStorage.getItem("storeTime"));
}

const backButton = document.getElementById("backBtn");
backButton.textContent = back;

const addButton = document.getElementById("addBtn");
addButton.textContent = add;

loadNotes();

setInterval(saveNotes, 2000);