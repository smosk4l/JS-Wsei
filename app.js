const dynamicInputEl = document.querySelector(".dynamicInputs");
const fieldsEl = document.querySelector("#fields");
const newFieldBtn = document.querySelector("#add");
const sumEl = document.querySelector("#sum");
const averageEl = document.querySelector("#average");
const vminEl = document.querySelector("#vmin");
const vmaxEl = document.querySelector("#vmax");

fieldsEl.addEventListener("keyup", calculateResult);
newFieldBtn.addEventListener("click", createFieldInput);

function createFieldInput() {
  const newFieldInput = document.createElement("input");
  const deleteFieldBtn = document.createElement("button");

  deleteFieldBtn.className = "removeBtn";
  deleteFieldBtn.textContent = "X";
  deleteFieldBtn.style.background = "red";

  newFieldInput.type = "text";
  newFieldInput.className = "numberField newField";

  dynamicInputEl.appendChild(newFieldInput);
  dynamicInputEl.appendChild(deleteFieldBtn);

  getFieldsInput().forEach((item) => {
    item.addEventListener("keyup", calculateResult);
  });

  getRemovesBtn().forEach((item) => {
    item.addEventListener("click", function () {
      dynamicInputEl.removeChild(newFieldInput);
      dynamicInputEl.removeChild(deleteFieldBtn);
    });
  });
}

function getFieldsInput() {
  return document.querySelectorAll(".numberField");
}

function calculateResult() {
  const numbers = [];

  let fieldsInputNumbers = getFieldsInput();
  let result = 0;

  for (let i = 0; i < fieldsInputNumbers.length; i++) {
    if (!(fieldsInputNumbers[i].value === "")) {
      numbers.push(Number(fieldsInputNumbers[i].value));
      result += Number(fieldsInputNumbers[i].value);
    }
  }

  sumEl.textContent = `Wynik dodawania: ${result}`;
  averageEl.textContent = `Średnia: ${result / numbers.length}`;
  vminEl.textContent = `Najmniejsza liczba to: ${Math.min(...numbers)}`;
  vmaxEl.textContent = `Najwieksza liczba to: ${Math.max(...numbers)}`;
}

function getRemovesBtn() {
  return document.querySelectorAll(".removeBtn");
}

function removeFieldInput() {
  getRemovesBtn;
}
