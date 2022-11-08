// "use strict";
const showFieldBtn = document.querySelector(".show-field-btn");
const addNoteBtn = document.querySelector(".add-note-btn");
const addNoteField = document.querySelector(".add-note-field");
const noteTitle = document.querySelector("#title");
const noteContent = document.querySelector("#content");
const notes = [];

showFieldBtn.addEventListener("click", updateFieldVisibilty);
addNoteBtn.addEventListener("click", createNote);

function updateFieldVisibilty() {
  addNoteField.classList.toggle("hidden");
  noteTitle.value = "";
  noteContent.value = "";
}

function createNote() {
  const title = noteTitle.value;
  const content = noteContent.value;
  notes.push({
    title,
    content,
  });
  updateFieldVisibilty();
  showNoteOnPage();
}

function showNoteOnPage() {
  console.log(notes.map((x) => x.title));
  console.log(notes.map((x) => x.content));
}
console.log(localStorage);
