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
  // handling manual navigation
  if (navigation.contains(e.target)) {
    // pause animation to avoid clashes
    clearInterval(interval);

    // update counter with manual btn id
    counter = parseInt(e.target.id);

    // resume animation
    interval = setInterval(animate, 5000);

    return; // to avoid mistaking manual navigation for drag intent
  }
  e.preventDefault(); // preventing touchscreen scroll defaults

  // set initialX according to event type
  if (e.type == "touchstart") {
    initialX = e.touches[0].clientX;
  } else {
    initialX = e.clientX;
  }

  clicked = true; // to know that the user wants to drag
  clearInterval(interval); // stop interval
}

function dragging(e) {
  if (!clicked) return; // run only if dragStart ran

  // set finalX according to event type
  let finalX;
  if (e.type == "touchmove") {
    finalX = e.touches[0].clientX;
  } else {
    finalX = e.clientX;
  }

  // check in what direction the user goes
  if (finalX < initialX && counter < 4) {
    counter++;
  } else if (finalX > initialX && counter > 1) {
    counter--;
  }
  document.getElementById("radio" + counter).checked = true;

  // resetting values and recalling interval
  clicked = false;
  interval = setInterval(animate, 5000);
}
