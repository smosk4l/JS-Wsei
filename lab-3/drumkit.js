const audioEls = document.querySelectorAll("audio");
const recordBtns = document.querySelectorAll(".recordBtn");
const stopBtns = document.querySelectorAll(".stopBtn");
const playBtns = document.querySelectorAll(".playBtn");
const metronomeRange = document.querySelector("#metronome-range");
const metronomeNumber = document.querySelector("#bpm-number");
const metronomeBtn = document.querySelector("#metronome-btn");
const addFieldBtn = document.querySelector("#addField");

let playBtnId;
let recordBtnId;
let isRecording;
let isMetronomeOn;
let metronomeInterval;

const records = {};
const KeyToSound = {};
for (let i = 1; i <= audioEls.length; i++) {
  KeyToSound[i] = audioEls[i - 1].id;
}
const keys = Object.keys(KeyToSound);

for (let i = 0; i < playBtns.length; i++) {
  playBtns[i].id = `playBtn${i}`;
  recordBtns[i].id = `recordBtn${i}`;
  records[`timing${i}`] = [];
  records[`instruments${i}`] = [];
  records[`timeDifference${i}`] = [];
}

console.log(records);

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  if (!keys.includes(event.key)) return;
  playSound(sound);
}

function playSound(sound) {
  const audioTag = document.querySelector("#" + sound);
  audioTag.currentTime = 0;
  audioTag.play();
}

function startRecording() {
  isRecording = true;
  recordBtnId = this.id;
}

function recordSound(event) {
  if (!(keys.includes(event.key) && isRecording === true)) return;

  for (let i = 0; i < recordBtns.length; i++) {
    if (recordBtnId === `recordBtn${i}`) {
      const timing = `timing${i}`;
      const instrument = `instruments${i}`;

      records[timing].push(Date.now());
      records[instrument].push(`${event.key}`);
    }
  }
}

function stopRecording() {
  isRecording = false;
}

function playRecordedSound() {
  playBtnId = this.id;
  for (let i = 0; i < playBtns.length; i++) {
    const timing = `timing${i}`;
    const instrument = `instruments${i}`;
    const timeDiff = `timeDifference${i}`;
    if (playBtns[i].id === playBtnId) {
      for (let j = 0; j < records[timing].length; j++) {
        records[timeDiff].push(records[timing][j] - records[timing][0]);
      }
      for (let j = 0; j < records[instrument].length; j++) {
        setTimeout(() => {
          playSound(`s${records[instrument][j]}`);
        }, records[timeDiff][j]);
      }
    }
  }
}

function setMetronomValue() {
  const bpmNumber = Number(metronomeRange.value);
  metronomeNumber.textContent = `${bpmNumber} BPM`;

  if (metronomeBtn.checked && bpmNumber !== 0) {
    console.log(bpmNumber);
    playMetronomeSound(bpmNumber);
  }
}

function playMetronomeSound(bpmNumber) {
  bpmNumber = Number(metronomeRange.value);
  if (bpmNumber !== 0) {
    !metronomeBtn.checked ? (isMetronomeOn = false) : (isMetronomeOn = true);
    metronomeInterval && clearInterval(metronomeInterval);
    const bpmTime = (60 / bpmNumber) * 1000;
    if (isMetronomeOn) {
      metronomeInterval = setInterval(() => {
        playSound("s9");
      }, bpmTime);
    }
  }
}

stopBtns.forEach((btn) => {
  btn.addEventListener("click", stopRecording);
});

playBtns.forEach((btn) => {
  btn.addEventListener("click", playRecordedSound);
});

recordBtns.forEach((btn) => {
  btn.addEventListener("click", startRecording);
});

document.addEventListener("keypress", onKeyPress);
document.addEventListener("keypress", recordSound);
metronomeRange.addEventListener("click", setMetronomValue);
metronomeBtn.addEventListener("click", playMetronomeSound);
