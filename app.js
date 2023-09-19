let slider = document.querySelector(".slider");
let navigation = document.querySelector(".navigation");
let startx;
let clicked = false;
let counter = 1;

function animate() {
  counter++;
  if (counter > 4) {
    counter = 1;
  }
  document.getElementById(`radio${counter}`).checked = true;
  document;
}
let interval = setInterval(animate, 5000);

function dragStart(e) {
  if (navigation.contains(e.target)) return;
  e.preventDefault();
  if (e.type == "touchstart") {
    startx = e.touches[0].clientX;
  } else {
    startx = e.clientX;
  }
  clicked = true;
  clearInterval(interval);
  //   clearInterval(interval);
  //   startx = e.pageX;
  //   clicked = true;
}

function dragging(e) {
  if (!clicked) return;
  if (e.type == "touchmove") {
    if (e.touches[0].clientX < startx && counter < 4) {
      counter++;
    } else if (e.touches[0].clientX > startx && counter > 1) {
      counter--;
    }
  } else {
    if (e.clientX < startx && counter < 4) {
      counter++;
    } else if (e.clientX > startx && counter > 1) {
      counter--;
    }
  }
  document.getElementById(`radio${counter}`).checked = true;
  clicked = false;
  interval = setInterval(animate, 5000);
}

// MOUSE EVENTS
slider.addEventListener("mousedown", dragStart);

slider.addEventListener("mousemove", dragging);

// TOUCH EVENTS
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("touchmove", dragging);
