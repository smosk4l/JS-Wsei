const addNoteBtn = document.querySelector(".btn-add-note");
const noteTitleField = document.querySelector(".note--title");
const noteContentField = document.querySelector(".note--content");
const notesListEl = document.querySelector(".notes__list");

let removeNoteBtn = document.querySelector(".btn-remove-note");

const notes = [];

function saveNote() {
  const title = noteTitleField.value;
  const content = noteContentField.value;

  let date = new Date();
  date.setHours(date.getHours() + 1);
  date = date.toISOString().replace("T", " ").slice(0, -5);

  const note = {
    title: title,
    content: content,
    date: date,
  };

  notes.push(note);
}
function updateUI() {
  const note = notes.at(-1);
  const html = `
  <div class="notes__list--item notes__list-item--selected">
    <div class="note-btns">
      <button class="btn btn-pin-note">📌</button>
      <button class="btn btn-remove-note">❌</button>
    </div>
    <div class="note__small--title">${note.title}</div>
    <div class="note__small--content">${note.content}</div>
    <div class="note__small--updated">${note.date}</div>
  </div>
  `;

  notesListEl.insertAdjacentHTML("beforeend", html);
}

function clearFields() {
  noteTitleField.value = "";
  noteContentField.value = "";
}

function getRemoveBtnsAndSetEvent() {
  removeNoteBtn = document.querySelectorAll(".btn-remove-note");
  const elementsLength = removeNoteBtn.length - 1;
  removeNoteBtn[elementsLength].addEventListener("click", removeNote);
}
function addNote() {
  saveNote();
  updateUI();
  getRemoveBtnsAndSetEvent();
  clearFields();
}

function removeNote(e) {
  const noteEl = e.currentTarget.parentNode.parentNode;
  noteEl.remove();
}

addNoteBtn.addEventListener("click", addNote);
removeNoteBtn.addEventListener("click", removeNote);
