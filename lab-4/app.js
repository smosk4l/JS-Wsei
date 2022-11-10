// "use strict";
const showFieldBtn = document.querySelector(".show-field-btn");
const addNoteBtn = document.querySelector(".add-note-btn");
const addNoteField = document.querySelector(".add-note-field");
const notesEl = document.querySelector(".notes");
const noteTitle = document.querySelector("#title");
const noteContent = document.querySelector("#content");
const notes = [];

showFieldBtn.addEventListener("click", updateFieldVisibility);
addNoteBtn.addEventListener("click", createNote);

function updateFieldVisibility() {
  addNoteField.classList.toggle("hidden");
  noteTitle.value = "";
  noteContent.value = "";
}

function createNote() {
  const title = noteTitle.value;
  const content = noteContent.value;
  if (!title || !content) alert("Please enter text into field");
  else {
    const note = document.createElement("div");
    const noteTitle = document.createElement("div");
    const noteContent = document.createElement("div");
    const noteTime = document.createElement("div");

    let time = new Date();
    time.setHours(time.getHours() + 1);
    time = time.toISOString().replace("T", " ").slice(0, -5);
    // time = time.replace("T", " ");
    // time = time.slice(0, -5);

    note.classList = "note";
    noteTitle.className = "note-title";
    noteContent.className = "note-content";
    noteTime.className = "note-time";

    noteTitle.textContent = title;
    noteContent.textContent = content;
    noteTime.textContent = time;

    note.appendChild(noteTitle);
    note.appendChild(noteContent);
    note.appendChild(noteTime);
    notesEl.appendChild(note);

    updateFieldVisibility();
  }
}

function create() {}
