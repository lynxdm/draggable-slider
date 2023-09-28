// ******SELECT ELEMEMTS******
const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const navigation = document.querySelector(".navigation");

// ******SET INITIAL VALUES******
let initialX;
let finalX;
let newPos = -100;
let clicked = false;
let counter = 0;
let slideDistance;
let interval;
let slidesWidth = slides.offsetWidth;
let threshold = 60;

// *******EVENT LISTENERS******
// INITIATE INTERVAL
document.addEventListener("DOMContentLoaded", () => {
  interval = setInterval(animate, 4000);
});

// MOUSE EVENTS
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
slider.addEventListener("mouseup", dragStop);

// TOUCH EVENTS
slider.addEventListener("touchstart", dragStart);
slider.addEventListener("touchmove", dragging);
slider.addEventListener("touchend", dragStop);

// ******FUNCTIONS******
function moveSlide() {
  slides.style.left = `${newPos * counter}%`;
  document.getElementById("radio" + (counter + 1)).checked = true;
}

// ******CALLBACK FUNCTIONS******
function animate() {
  if (clicked) return; //stop if dragging
  counter++;
  if (counter > 3) {
    counter = 0;
    slides.style.transition = "none";
  } else {
    slides.style.transition = "0.8s";
  }
  moveSlide();
}

function dragStart(e) {
  // handling manual navigation
  if (navigation.contains(e.target)) {
    // pause interval to avoid clashes
    clearInterval(interval);

    // update counter with manual btn id
    counter = parseInt(e.target.id) - 1;

    slides.style.transition = "0.8s";
    moveSlide();
    // resume interval
    interval = setInterval(animate, 4000);

    return; // to avoid mistaking manual navigation for drag intent
  }
  e.preventDefault(); // preventing touchscreen scroll defaults

  // sliding animation
  slides.style.transition = "0.5s";
  slider.style.cursor = "grabbing";
  document.body.style.cursor = "grabbing";

  // set initialX according to event type
  if (e.type == "touchstart") {
    initialX = e.touches[0].clientX;
  } else {
    initialX = e.clientX;
  }

  clicked = true; // to know that the user wants to drag
  clearInterval(interval); // stop interval

  // continue dragging even when outside the slider
  document.onmousemove = dragging;
  document.onmouseup = dragStop;
}

function dragging(e) {
  if (!clicked) return; // proceed only if dragStart ran

  // set finalX according to event type
  if (e.type == "touchmove") {
    finalX = e.touches[0].clientX;
  } else {
    finalX = e.clientX;
  }

  let currentPosition = counter * newPos;

  slideDistance = ((initialX - finalX) / (slidesWidth / 4)) * 100;

  function dragSlide() {
    if (slideDistance < 100) {
      slides.style.left = `${currentPosition - slideDistance / 2}%`;
    }
  }

  // drag in direction of mouse
  if (finalX < initialX && counter <= 3) {
    dragSlide();
  } else if (finalX > initialX && counter >= 0) {
    dragSlide();
  } else if (finalX == 0) {
    finalX = undefined;
  }
}

function dragStop(e) {
  if (navigation.contains(e.target)) return; // avoid interval clashing

  // check threshold before changing slides
  if (finalX < initialX && counter < 3 && slideDistance >= threshold) {
    counter++;
  } else if (finalX > initialX && counter > 0 && -slideDistance >= threshold) {
    counter--;
  }
  moveSlide();

  // return to default
  document.body.style.cursor = "default";
  slider.style.cursor = "grab";
  initialX = undefined;
  finalX = undefined;
  clicked = false;
  interval = setInterval(animate, 4000);
  document.onmousemove = null;
  document.onmouseup = null;
}
