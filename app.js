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
  document.getElementById("radio" + counter).checked = true;
}
let interval = setInterval(animate, 5000);

function dragStart(e) {
  e.preventDefault()
  if (navigation.contains(e.target)) return;
  clearInterval(interval);
  startx = e.pageX;
  clicked = true;
  console.log(clicked);
}

function dragging(e) {
  if (!clicked) return;
  e.preventDefault();
  if (e.pageX < startx && counter < 4) {
    counter++;
  } else if (e.pageX > startx && counter > 1) {
    counter--;
  }
  document.getElementById("radio" + counter).checked = true;
  clicked = false;
  interval = setInterval(animate, 5000);
}

// MOUSE EVENTS
slider.addEventListener("mousedown", dragStart);

slider.addEventListener("mousemove", dragging);

// TOUCH EVENTS
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("touchmove", dragging);
