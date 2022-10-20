const recordBtns = document.querySelectorAll(".recordBtn")[0];
const stopBtns = document.querySelectorAll(".stopBtn")[0];
const playBtns = document.querySelectorAll(".playBtn")[0];

const audioEls = document.querySelectorAll("audio");
const instruments = [];
const timing = [];

let isRecording = false;

document.addEventListener("keypress", onKeyPress);
document.addEventListener("keypress", recordSound);
document.addEventListener("keypress", stopRecording);
document.addEventListener("keypress", playRecord);

const KeyToSound = {};
for (let i = 1; i <= audioEls.length; i++) {
  KeyToSound[i] = audioEls[i - 1].id;
}

function onKeyPress(event) {
  const values = Object.values(KeyToSound);
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

const records = {
  timing1: [],
  instruments1: [],

  timing2: [],
  instruments2: [],

  timing3: [],
  instuments3: [],

  timing4: [],
  instruments4: [],
};

function recordSound(event) {
  const keys = Object.keys(KeyToSound);

  if (event.key === "r") {
    console.log("OK");
    isRecording = true;
  }
  if (keys.includes(event.key) && isRecording === true) {
    timing.push(Date.now());
    instruments.push(event.key);
    console.log(timing);
    console.log(instruments);
  }
}
function stopRecording(event) {
  if (event.key === "s") {
    isRecording = false;
  }
}
function playRecord(event) {
  if (event.key === "p") {
    const timeDiff = [];
    timing.forEach((time) => {
      timeDiff.push(time - timing[0]);
    });
    for (let i = 0; i < instruments.length; i++) {
      setTimeout(() => {
        playSound(`s${instruments[i]}`);
      }, timeDiff[i]);
    }
  }
}
// Date.now()
