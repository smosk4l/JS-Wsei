const addNoteBtn = document.querySelector(".btn-add-note");
const noteTitleField = document.querySelector(".note--title");
const noteContentField = document.querySelector(".note--content");
const notesListEl = document.querySelector(".notes__list");

notesListEl.addEventListener("click", removeNote);

const notes = getNotes();

init();

function init() {
  notes.forEach((note) => {
    updateUI(note);
  });
}

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

function updateUI(note) {
  const html = `
        <div id="${note.id}"class="notes__list--item notes__list-item--selected">
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

function addNote() {
  createNote();
  saveNote();
  clearFields();
}

function removeNote(e) {
  if (e.target.className.includes("btn-remove-note")) {
    const noteEl = e.target.parentNode.parentNode;
    const noteID = noteEl.id;

    let notes = getNotes();

    notes = notes.filter((note) => note.id !== noteID);
    localStorage.setItem("user-notes", JSON.stringify(notes));

    noteEl.remove();
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

addNoteBtn.addEventListener("click", addNote);
