// Import language messages
import { stored, add, back } from "../lang/messages/en/user.js";

// Note class to handle individual note creation and behavior
class Note {
  constructor(content = "") {
    this.content = content;
    this.element = this.createNoteDiv();
  }

  createNoteDiv() {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    // Create and append the textarea
    const textArea = document.createElement("textarea");
    textArea.value = this.content;
    noteDiv.appendChild(textArea);

    // Create and append the remove button
    const removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      this.remove(noteDiv);
    };
    noteDiv.appendChild(removeButton);

    return noteDiv;
  }

  remove(noteElement) {
    noteElement.remove();
    NoteApp.getInstance().saveNotes(); // Trigger save on removal
  }
}

// LocalStorageManager class for handling LocalStorage operations
class LocalStorageManager {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// NoteApp class to manage the entire application
class NoteApp {
  constructor() {
    if (NoteApp.instance) {
      return NoteApp.instance; // Singleton pattern
    }
    this.notesKey = "notes";
    this.content = document.getElementById("content");
    this.init();
    NoteApp.instance = this;
  }

  static getInstance() {
    return NoteApp.instance || new NoteApp();
  }

  init() {
    // Set up buttons
    const backButton = document.getElementById("backBtn");
    backButton.textContent = back;

    const addButton = document.getElementById("addBtn");
    addButton.textContent = add;
    addButton.onclick = () => this.addNote();

    // Load existing notes
    this.loadNotes();

    // Auto-save notes periodically
    setInterval(() => this.saveNotes(), 2000);
  }

  addNote() {
    const note = new Note();
    this.content.appendChild(note.element);
  }

  saveNotes() {
    const notes = Array.from(this.content.children).map((noteElement) =>
      noteElement.querySelector("textarea").value
    );
    LocalStorageManager.save(this.notesKey, notes);
    this.displayStoreTime();
  }

  loadNotes() {
    const notes = LocalStorageManager.load(this.notesKey);
    if (notes) {
      notes.forEach((content) => {
        const note = new Note(content);
        this.content.appendChild(note.element);
      });
    }
    this.displayStoreTime();
  }

  displayStoreTime() {
    document.getElementById("storeTime").innerHTML = stored + new Date();
  }
}

// Initialize the NoteApp
new NoteApp();
