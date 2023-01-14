const addNoteBtn = document.querySelector(".btn-add-note");
const noteTitleField = document.querySelector(".note--title");
const noteContentField = document.querySelector(".note--content");
const notesListEl = document.querySelector(".notes__list");

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
  console.log(note);
  const html = `
  <div class="notes__list--item notes__list-item--selected">
    <div class="note__small--title">${note.title}</div>
    <div class="note__small--content">${note.content}</div>
    <div class="note__small--updated">${note.date}</div>
  </div>
  `;

  notesListEl.insertAdjacentHTML("beforeend", html);
}
function addNote() {
  saveNote();
  updateUI();
}

addNoteBtn.addEventListener("click", addNote);
