// ******SELECT ELEMEMTS******
const slider = document.querySelector(".slider");
const navigation = document.querySelector(".navigation");

// ******SET INITIAL VALUES******
let initialX;
let clicked = false;
let counter = 1;

// ******INITIATE INTERVAL******
function animate() {
  counter++;
  if (counter > 4) {
    counter = 1;
  }
  document.getElementById("radio" + counter).checked = true;
  document;
}
let interval = setInterval(animate, 5000);

// *******EVENT LISTENERS******
// MOUSE EVENTS
slider.addEventListener("mousedown", dragStart);

slider.addEventListener("mousemove", dragging);

// TOUCH EVENTS
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("touchmove", dragging);

// ******CALLBACK FUNCTIONS******
function dragStart(e) {
  if (navigation.contains(e.target)) return;
  e.preventDefault();
  if (e.type == "touchstart") {
    initialX = e.touches[0].clientX;
  } else {
    initialX = e.clientX;
  }
  clicked = true;
  clearInterval(interval);
}

function dragging(e) {
  if (!clicked) return;
  if (e.type == "touchmove") {
    if (e.touches[0].clientX < initialX && counter < 4) {
      counter++;
    } else if (e.touches[0].clientX > initialX && counter > 1) {
      counter--;
    }
  } else {
    if (e.clientX < initialX && counter < 4) {
      counter++;
    } else if (e.clientX > initialX && counter > 1) {
      counter--;
    }
  }
  document.getElementById("radio" + counter).checked = true;
  clicked = false;
  interval = setInterval(animate, 5000);
}
