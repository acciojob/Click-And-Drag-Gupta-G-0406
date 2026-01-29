const slider = document.querySelector('.items');

let isDown = false;
let startX;
let startScrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = startX - e.pageX;
  slider.scrollLeft = startScrollLeft + walk;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});
