const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Convert initial inline layout → absolute positioning
cubes.forEach(cube => {
  const rect = cube.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  cube.style.position = 'absolute';
  cube.style.left = rect.left - parentRect.left + 'px';
  cube.style.top = rect.top - parentRect.top + 'px';
});

// Mouse down → start drag
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    container.classList.add('active');
  });
});

// Mouse move → drag
document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  activeCube.style.left = newX + 'px';
  activeCube.style.top = newY + 'px';
});

// Mouse up → drop
document.addEventListener('mouseup', () => {
  activeCube = null;
  container.classList.remove('active');
});
