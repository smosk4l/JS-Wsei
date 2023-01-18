const addNoteBtn = document.querySelector(".btn-add-note");
const noteTitleField = document.querySelector(".note--title");
const noteContentField = document.querySelector(".note--content");
const notesListEl = document.querySelector(".notes__list");

let removeNoteBtn = document.querySelector(".btn-remove-note");

const notes = JSON.parse(localStorage.getItem("user-notes") || "[]");

function getNotes() {
  return JSON.parse(localStorage.getItem("user-notes") || "[]");
}

function createNote() {
  const title = noteTitleField.value;
  const content = noteContentField.value;
  const id = Math.random().toString(36).slice(2);

  if (title === "" || content === "") {
    alert("Please fill in the missing fields");
    return;
  }

  let date = new Date();
  date.setHours(date.getHours() + 1);
  date = date.toISOString().replace("T", " ").slice(0, -5);

  const note = {
    id: id,
    title: title,
    content: content,
    date: date,
  };

  notes.push(note);
  updateUI(note);
}
function saveNote() {
  localStorage.setItem("user-notes", JSON.stringify(notes));
}

function init() {
  notes.forEach((note) => {
    updateUI(note);
  });
  getRemoveBtnsAndSetEvent();
}

function updateUI(note) {
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

  notesListEl.insertAdjacentHTML("afterbegin", html);
}

function clearFields() {
  noteTitleField.value = "";
  noteContentField.value = "";
}

function getRemoveBtnsAndSetEvent() {
  document
    .querySelectorAll(".btn-remove-note")
    .forEach((btn) => btn.addEventListener("click", removeNote));
}

function addNote() {
  createNote();
  saveNote();
  getRemoveBtnsAndSetEvent();
  clearFields();
}

function removeNote(e) {
  let notes = getNotes();

  const noteEl = e.currentTarget.parentNode.parentNode;
  const noteBody = noteEl.querySelector(".note__small--content").textContent;

  notes = notes.filter((note) => note.content !== noteBody);
  localStorage.setItem("user-notes", JSON.stringify(notes));
  noteEl.remove();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

addNoteBtn.addEventListener("click", addNote);
// removeNoteBtn.addEventListener("click", removeNote);

// TO DO
// 1. Zrobic funkcje create note, która tworzy notatke z klas
// 2. Zmienic funcke save note, na zapisywanie do local stora
// 3. Zrobic funckcje init, ktora wyswietli wszystkie notsy  z local storage, da im removenote event,
init();
