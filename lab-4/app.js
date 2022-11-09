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
    notes.push({
      title,
      content,
    });

    const note = document.createElement("div");
    const noteTitle = document.createElement("div");
    const noteContent = document.createElement("div");

    note.classList = "note";
    noteTitle.className = "note-title";
    noteContent.className = "note-content";

    noteTitle.textContent = title;
    noteContent.textContent = content;

    note.appendChild(noteTitle);
    note.appendChild(noteContent);
    notesEl.appendChild(note);

    updateFieldVisibility();
  }
}

function create() {}
