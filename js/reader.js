// Import language messages
import { updated, back } from "../lang/messages/en/user.js";

// Note class to handle individual note creation and behavior
class Note {
  constructor(content = "") {
    this.content = content;
    this.element = this.createElement();
  }

  createElement() {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    // Create and append the textarea
    const textArea = document.createElement("textarea");
    textArea.disabled = true; // Make textarea non-editable
    textArea.value = this.content;
    noteDiv.appendChild(textArea);

    return noteDiv;
  }

  getContent() {
    return this.element.querySelector("textarea").value;
  }
}

// LocalStorageManager class for handling LocalStorage operations
class LocalStorageManager {
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
    // Set up back button
    const backButton = document.getElementById("backBtn");
    backButton.textContent = back;

    // Load existing notes
    this.loadNotes();
    setInterval(() => this.loadNotes(), 2000);
  }

  loadNotes() {
    const notes = LocalStorageManager.load(this.notesKey);
    this.content.innerHTML = ""; // Clear existing content
    if (notes) {
      notes.forEach((content) => {
        const note = new Note(content);
        this.content.appendChild(note.element);
      });
    }
    this.displayStoreTime();
  }

  displayStoreTime() {
    document.getElementById("updateTime").innerHTML = updated + new Date();
  }
}

// Initialize the NoteApp
new NoteApp();
