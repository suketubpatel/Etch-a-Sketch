// Create a variables to hold relevent element from html file
const container = document.querySelector(".container");
const userInput = document.querySelector(".input-size");
const btnSubmit = document.querySelector(".btn-submit");
const btnErase = document.querySelector(".btn-erase");
const btnReset = document.querySelector(".btn-reset");

// get container width
const containerWidth = container.getBoundingClientRect().width;

// read user input
let gridSize = parseInt(userInput.value);
console.log("Grid Size: " + gridSize);

// remove color from currnet div
let eraseColor = false;

function initialDivDraw() {
  drawDivs(gridSize);
  updateCurrentDiv();
}

function textPassed() {
  if (checkUserInput()) {
    // call the function to draw the divs
    console.log("Grid Size: " + gridSize);
    drawDivs(gridSize);
    // updateCurrentDiv();
  }
  userInput.focus;
}
// click event for btn-submit
btnSubmit.addEventListener("click", () => {
  textPassed();
});

// When user click EREASE button
btnErase.addEventListener("click", () => {
  if (!eraseColor) {
    btnErase.textContent = "Stop Erase";
    eraseColor = true;
  } else {
    btnErase.textContent = "Erase";
    eraseColor = false;
  }
});

// Reset the gird to 16 grids
btnReset.addEventListener("click", () => {
  userInput.value = 16;
  gridSize = 16;
  drawDivs(gridSize);
});

// Read text from input text when user press ENTER key
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") textPassed();
});

// Check user input is between 1 to 100, if yes accept girdsize
function checkUserInput() {
  // read user input
  let size = parseInt(userInput.value);
  if (size !== NaN && size >= 1 && size <= 100) {
    gridSize = size;
    return true;
  } else {
    alert("Grid size must be between 1 to 100!!!");
    return false;
  }
}
// Write a function which create provided numbers grid of squares in container DIV.
function drawDivs(num) {
  eraseDivs(); // erease existing dives

  console.log("Num: " + num);
  let divWidth = containerWidth / num;
  console.log("container width: " + containerWidth);
  console.log(`divWidth: ${divWidth}`);

  for (let i = 1; i <= num; i++) {
    // create number of rows
    for (let j = 1; j <= num; j++) {
      // create number of columns
      createDivs(divWidth); // draw divs
    }
  }
}

function eraseDivs() {
  while (container.firstChild) {
    // reset erease button and variable status
    btnErase.textContent = "Erase";
    eraseColor = false;
    // Remove existing divs
    container.removeChild(container.firstChild);
  }
}

// remove current div's colore by setting it to default color
// and set opacity to default
function eraseDivColors(currentDiv) {
  currentDiv.style.backgroundColor = "rgb(211, 211, 211)";
  currentDiv.style.opacity = 0.0;
}

// Create internal DIVs by providing width and number of divs to add to container
function createDivs(divWidth) {
  let div = document.createElement("div");
  div.classList.add("innerDivs");
  div.style.width = divWidth + "px";
  div.style.height = divWidth + "px";

  container.appendChild(div);
}

// read current div from continer
function updateCurrentDiv() {
  container.addEventListener("mouseover", (event) => {
    let currentDiv = event.target; // read curren div

    if (!eraseColor) {
      // color the div with random color
      colorTheCurrenDiv(currentDiv);

      // increase current div's opecity
      increaseCurrentDivOpecity(currentDiv);
    } else {
      eraseDivColors(currentDiv);
    }
  });
}

function colorTheCurrenDiv(currentDiv) {
  // color the div with random color
  let randomColor = generateRandomColor();
  currentDiv.style.backgroundColor = randomColor;
}

function increaseCurrentDivOpecity(currentDiv) {
  // get computed style for current div to update opacity
  const currentDivComputedStyle = window.getComputedStyle(currentDiv);
  let currentDivOpacity = Number(currentDivComputedStyle.opacity);
  console.log(currentDivOpacity);

  currentDiv.style.opacity = currentDivOpacity + 0.1;

  // increase current div opacity
  // if (currentDivOpacity <= 1) {
  //   currentDiv.style.opacity = currentDivOpacity + 0.1;
  // } else {
  //   currentDiv.style.opacity = currentDivOpacity;
  // }
}

// generate random rgb color
function generateRandomColor() {
  let randomNumRed = generateRandomNumber();
  let randomNumGreen = generateRandomNumber();
  let randomNumBlue = generateRandomNumber();

  return (
    "rgb(" + randomNumRed + ", " + randomNumGreen + ", " + randomNumBlue + ")"
  );
}

// generate random number between 0 to 255
function generateRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256);
  return randomNumber;
}

initialDivDraw();
