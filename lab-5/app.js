interval(saveCToSessionStorage, discoverPowerBallNumber);

function interval(...parameters) {
  parameters.forEach((parameter) => {
    let timer = 1;
    setInterval(() => {
      parameter(timer);
      timer++;
    }, 2000);
  });
}

class Logger {
  static log(data) {
    console.log(data);
  }
}

function saveCToSessionStorage(data) {
  console.log("[reader C]", data);
  const storageData = { data };
  sessionStorage.setItem("C", JSON.stringify(storageData));
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(`[log from C] ${data}`);
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log("[powerball number]", number);
}
