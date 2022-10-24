const recordBtns = document.querySelectorAll(".recordBtn");
const stopBtns = document.querySelectorAll(".stopBtn");
const playBtns = document.querySelectorAll(".playBtn");
const audioEls = document.querySelectorAll("audio");
const metronomeRange = document.querySelector("#metronome-range");
const metronomeNumber = document.querySelector("#bpm-number");
const metronomeBtn = document.querySelector("#metronome-btn");

const records = {};

let isRecording;
let isMetronomeOn;

metronomeBtn.addEventListener("click", function () {
  metronomeBtn.checked === false
    ? (isMetronomeOn = false)
    : (isMetronomeOn = true);
});
document.addEventListener("keypress", onKeyPress);
document.addEventListener("keypress", recordSound);
metronomeRange.addEventListener("click", function () {
  const bpmNumber = metronomeRange.value;
  const bpmTime = (60 / bpmNumber) * 1000;
  console.log(bpmTime, bpmNumber);
  metronomeNumber.textContent = `${bpmNumber} BPM`;
  if (isMetronomeOn && bpmNumber !== "0") {
    setInterval(() => {
      playSound("s9");
    }, bpmTime);
  }
});

stopBtns.forEach((btn) => {
  btn.addEventListener("click", stopRecording);
});

playBtns.forEach((btn) => {
  btn.addEventListener("click", playRecordedSound);
});

recordBtns.forEach((btn) => {
  btn.addEventListener("click", startRecording);
});

for (let i = 0; i < playBtns.length; i++) {
  playBtns[i].id = `playBtn${i}`;
  recordBtns[i].id = `recordBtn${i}`;
  records[`timing${i}`] = [];
  records[`instruments${i}`] = [];
  records[`timeDifference${i}`] = [];
}

const KeyToSound = {};
for (let i = 1; i <= audioEls.length; i++) {
  KeyToSound[i] = audioEls[i - 1].id;
}

function onKeyPress(event) {
  const keys = Object.keys(KeyToSound);
  if (keys.includes(event.key)) {
    const sound = KeyToSound[event.key];
    playSound(sound);
  }
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
  const keys = Object.keys(KeyToSound);
  if (keys.includes(event.key) && isRecording === true) {
    for (let i = 0; i < recordBtns.length; i++) {
      if (recordBtnId === `recordBtn${i}`) {
        const timing = `timing${i}`;
        const instrument = `instruments${i}`;

        records[timing].push(Date.now());
        records[instrument].push(`${event.key}`);
      }
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
