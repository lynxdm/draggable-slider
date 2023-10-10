const slideContainer = document.querySelector(".slider");
const slidesFlex = document.querySelector(".slides-flex");
const navigation = document.querySelector(".navigation");

(function slider(container, slides, navigation) {
  let initialX,
    finalX,
    leftPos = -100,
    clicked = false,
    counter = 0,
    slideDistance,
    interval = null,
    slidesWidth = slides.offsetWidth,
    threshold = 40;

  // *******EVENT LISTENERS******
  // initiate interval
  document.addEventListener("DOMContentLoaded", createInterval);

  // mouse events
  container.addEventListener("mousedown", dragStart);

  // touch events
  container.addEventListener("touchstart", dragStart);
  container.addEventListener("touchmove", dragging);
  container.addEventListener("touchend", dragStop);

  // ******FUNCTIONS******
  function moveSlide() {
    slides.style.left = `${leftPos * counter}%`;
    document.getElementById("radio" + (counter + 1)).checked = true;
  }

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

  function createInterval() {
    if (!interval) {
      interval = setInterval(animate, 5000);
    }
  }

  function dragStart(e) {
    clearInterval(interval);
    interval = null;

    // handling manual navigation
    if (navigation.contains(e.target)) {
      counter = e.target.id ? parseInt(e.target.id) - 1 : counter;
      slides.style.transition = "0.8s";
      moveSlide();
      createInterval();
      return;
    }
    e.preventDefault(); // for touchscreen defaults

    // sliding animation
    slides.style.transition = "0.5s";
    container.style.cursor = "grabbing";
    document.body.style.cursor = "grabbing";

    clicked = true;

    if (e.type == "touchstart") {
      initialX = e.touches[0].clientX;
    } else {
      initialX = e.clientX;
      document.onmousemove = dragging;
      document.onmouseup = dragStop;
    }
  }

  function dragging(e) {
    if (!clicked) return;

    if (e.type == "touchmove") {
      finalX = e.touches[0].clientX;
    } else {
      finalX = e.clientX;
    }

    let currentPosition = counter * leftPos;

    slideDistance = ((initialX - finalX) / (slidesWidth / 4)) * 100;

    if (slideDistance > -threshold && slideDistance < threshold) {
      slides.style.left = `${currentPosition - slideDistance}%`;
    }
  }

  function dragStop(e) {
    if (navigation.contains(e.target)) return;

    // check threshold and counter before changing slides
    if (finalX < initialX && counter < 3 && slideDistance >= threshold) {
      counter++;
    } else if (
      finalX > initialX &&
      counter > 0 &&
      -slideDistance >= threshold
    ) {
      counter--;
    }
    moveSlide();

    // return to default
    createInterval();
    document.body.style.cursor = "default";
    container.style.cursor = "grab";
    initialX = undefined;
    finalX = undefined;
    clicked = false;
    document.onmousemove = null;
    document.onmouseup = null;
  }
})(slideContainer, slidesFlex, navigation);
