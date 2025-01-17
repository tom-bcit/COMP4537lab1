const content = document.getElementById("content");

function createNoteElement() {
  const note = document.createElement("div");
  note.className = "note";
  note.appendChild(document.createElement("textarea"));
  return note;
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
