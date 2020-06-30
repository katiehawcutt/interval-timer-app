var setNum = 0;
var workSeconds = 0;
var restSeconds = 0;
var setNumCountdown;
var workSecondsCountdown;
var restSecondsCountdown;
var timeoutId;
const speed = 1000;
const setSetNumber = document.querySelector("#setSetNumber");
const setWorkNumber = document.querySelector("#setWorkNumber");
const setRestNumber = document.querySelector("#setRestNumber");
const confirmedSetNumber = document.querySelector("#confirmedSetNumber");
const confirmedWorkNumber = document.querySelector("#confirmedWorkNumber");
const confirmedRestNumber = document.querySelector("#confirmedRestNumber");
const workContainer = document.querySelector("#work-container");
const restContainer = document.querySelector("#rest-container");

//SET TIMER

//Changing set number//
function handleNumberOfSets(operation) {
  if (operation == "add") {
    setNum += 1;
  } else {
    setNum = Math.max(0, setNum - 1);
  }
  setSetNumber.innerHTML = setNum;
}

//Changing work and rest numbers//

function handleWorkSeconds(operation) {
  workSeconds = handleClockOperation(operation, workSeconds);
  setWorkNumber.innerHTML = clockify(workSeconds);
}
function handleRestSeconds(operation) {
  restSeconds = handleClockOperation(operation, restSeconds);
  setRestNumber.innerHTML = clockify(restSeconds);
}
function handleClockOperation(operation, seconds) {
  if (operation == "minusMinutes") {
    return Math.max(0, seconds - 60);
  } else if (operation == "plusMinutes") {
    return seconds + 60;
  } else if (operation == "minusSeconds") {
    return Math.max(0, seconds - 1);
  } else {
    return seconds + 1;
  }
}

//make a function which takes in a number (seconds) and returns it as a string mm:ss
// use modulus to find seconds and store in a variable called seconds
//take the seconds off the original number and then divide the number left by 60 to find minutes and store in var called mins
//return the numbers as a string with a colon in the numbber

//Format seconds - THIS IS A PURE FUNCTION

function clockify(number) {
  const seconds = number % 60;
  const minutes = (number - seconds) / 60;
  return (
    formatNumbersLessThanTen(minutes) + ":" + formatNumbersLessThanTen(seconds)
  );
}
function formatNumbersLessThanTen(number) {
  if (number <= 9) {
    return "0" + number;
  } else {
    return number;
  }
}

//Clear button
function clearNumbers() {
  setNum = 0;
  workSeconds = 0;
  restSeconds = 0;
  setSetNumber.innerHTML = "0";
  setWorkNumber.innerHTML = "00:00";
  setRestNumber.innerHTML = "00:00";
}

//CONFIRM TIMER

function confirmTimer() {
  confirmedSetNumber.innerHTML = setNum;
  confirmedWorkNumber.innerHTML = clockify(workSeconds);
  confirmedRestNumber.innerHTML = clockify(restSeconds);
  workSecondsCountdown = workSeconds;
  restSecondsCountdown = restSeconds;
  setNumCountdown = setNum;
}

//START TIMER

//set the countdown equal to the user input
// work countdown to zero
//then rest countdown to zero
// then check set number and run both functions again until set num = 0

function startCountdown() {
  if (workSecondsCountdown > 0) {
    timoutId = setTimeout(workCountdown, speed);
    workContainer.style.backgroundImage = "linear-gradient(white, #0cf11a)";
    confirmedWorkNumber.style = "color:#fe8004; text-shadow:1px 1px black ";
  } else if (restSecondsCountdown > 0) {
    startRestCountdown();
  }
}
function workCountdown() {
  workSecondsCountdown -= 1;
  confirmedWorkNumber.innerHTML = clockify(workSecondsCountdown);
  if (workSecondsCountdown > 0) {
    timeoutId = setTimeout(workCountdown, speed);
  } else if (workSecondsCountdown == 0 && setNumCountdown > 1) {
    startRestCountdown();
  } else {
    countSets();
  }
}

function startRestCountdown() {
  workContainer.style.backgroundImage = "none";
  restContainer.style.backgroundImage = "linear-gradient(white,#0ce6f1 )";
  confirmedRestNumber.style = "color:#fe8004, text-shadow: 1px 1px black";
  timeoutId = setTimeout(restCountdown, speed);
}
function restCountdown() {
  restSecondsCountdown -= 1;
  confirmedRestNumber.innerHTML = clockify(restSecondsCountdown);
  if (restSecondsCountdown > 0) {
    timeoutId = setTimeout(restCountdown, speed);
  } else if (restSecondsCountdown == 0) {
    countSets();
  }
}

function countSets() {
  restContainer.style.backgroundImage = "none";
  setNumCountdown -= 1;
  confirmedSetNumber.innerHTML = setNumCountdown;
  if (setNumCountdown > 1) {
    workSecondsCountdown = workSeconds;
    confirmedWorkNumber.innerHTML = clockify(workSecondsCountdown);
    restSecondsCountdown = restSeconds;
    confirmedRestNumber.innerHTML = clockify(restSecondsCountdown);
    startCountdown();
  } else if (setNumCountdown > 0) {
    workSecondsCountdown = workSeconds;
    confirmedWorkNumber.innerHTML = clockify(workSecondsCountdown);
    startCountdown();
  } else {
    console.log("finished!!");
    workContainer.style.backgroundImage = "linear-gradient(white, black)";
  }
}

function pauseCountdown() {
  clearTimeout(timeoutId);
  if (workSecondsCountdown > 0) {
    workContainer.style.backgroundImage = "linear-gradient(white, red)";
    confirmedWorkNumber.style = "color: black; text-shadow: 1px 1px white";
  } else if (restSecondsCountdown > 0) {
    restContainer.style.backgroundImage = "linear-gradient(white, red)";
    confirmedRestNumber.style = "color: black; text-shadow: 1px 1px white";
  }
}

function displayBox() {
  document.querySelector("#popUpBox").style.display = "flex";
  document.querySelector(".main-container").classList.add("background-opacity");
}

function hideBox() {
  document.querySelector("#popUpBox").style.display = "none";
  document.querySelector("#nameOfCountdown").value = "";
  document
    .querySelector(".main-container")
    .classList.remove("background-opacity");
  console.log(setNum, workSeconds, restSeconds);
}

function saveCountdown() {
  document.querySelector(
    "#save-countdown"
  ).innerHTML += `<div class="save-mini-containers">
<ul>
<li id="savedName">Name: ${
    document.querySelector("#nameOfCountdown").value
  }</li>
<li id="savedSets">Sets: ${setNum}</li>
<li id="savedWork">Work: ${workSeconds}secs</li>
<li id="savedRest">Rest: ${restSeconds}secs</li>
</ul>
<div class="go-delete-container">
<button class="go" onclick= "confirmTimer()"><span>GO!</span></button>
<button class="delete" onclick="deleteSavedCountdowns()">DEL</button>
</div>
</div>`;
  // document.querySelector("#clock-image").style.display = "none";

  // saveTimer();
}
function deleteSavedCountdowns() {
  document.querySelector("#save-countdown").innerHTML = "";
  localStorage.removeItem(storedList);
  // document.querySelector("#clock-image").style.display = "flex";
}

// function saveTimer() {
//   localStorage.storedList = document.querySelector("#save-countdown").innerHTML;
//   localStorage.setItem("storedList");
// }

// function loadTimers() {
//   document.querySelector("#save-countdown").innerHTML = localStorage.storedList;
// }
// if (localStorage.storedList) {
//   loadTimers();
// }

// function hideStartButton() {
//   document.querySelector("startButton").style.display = "none";
//   document.querySelector("pauseButton").style.display = "flex";
// }

// function hidePauseButton() {
//   document.querySelector("startButton").style.display = "flex";
//   document.querySelector("pauseButton").style.display = "none";
// }
