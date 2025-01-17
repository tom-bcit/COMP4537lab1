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
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes.forEach((note) => {
    const noteElement = createNoteElement();
    noteElement.children[0].value = note;
    content.appendChild(noteElement);
  });
}

loadNotes();

setInterval(saveNotes, 2000);