// Create a variable called container to hold container DIV
const container = document.querySelector(".container");

// get container width
const containerWidth = container.getBoundingClientRect().width;

// Write a function which create provided numbers grid of squares in container DIV.
function drawDivs(num) {
  let divWidth = containerWidth / num;
  console.log("container width: " + containerWidth);
  console.log(`divWidth: ${divWidth}`);

  for (let i = 1; i <= num; i++) {
    // create number of rows
    for (let j = 1; j <= num; j++) {
      // create number of columns
      createDiv(divWidth, j); // draw divs
    }
  }
}

// Create internal DIVs by providing width and number of divs to add to container
function createDiv(divWidth, i) {
  let div = document.createElement("div");
  div.classList.add("innerDivs");
  div.style.width = divWidth + "px";
  div.style.height = divWidth + "px";

  container.appendChild(div);
}

// read current div from continer
function colorDivs() {
  let currentDivOpacity;
  container.addEventListener("mouseover", (event) => {
    let currentDiv = event.target; // read curren div

    // color the div with random color
    let randomColor = generateRandomColor();
    currentDiv.style.backgroundColor = randomColor;

    // get computed style for current div to update opacity
    const currentDivComputedStyle = window.getComputedStyle(currentDiv);
    currentDivOpacity = Number(currentDivComputedStyle.opacity);
    console.log(currentDivOpacity);

    // increase current div opacity
    if (currentDivOpacity <= 1) {
      currentDiv.style.opacity = currentDivOpacity + 0.1;
    } else {
      currentDiv.style.opacity = currentDivOpacity;
    }
  });
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

// call the function to draw the divs
drawDivs(30);
colorDivs();
console.log(generateRandomColor());
