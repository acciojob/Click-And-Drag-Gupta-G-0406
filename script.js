const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

// 1. Initial Grid Setup (Optional, but keeps them from stacking)
items.forEach((item, index) => {
  const col = index % 5;
  const row = Math.floor(index / 5);
  item.style.left = (col * 160 + 20) + 'px';
  item.style.top = (row * 160 + 20) + 'px';
});

// 2. Mouse Down: Select the cube
container.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('item')) {
    activeItem = e.target;
    activeItem.style.zIndex = 1000; // Bring to front
    
    // Calculate where inside the cube the user clicked
    const rect = activeItem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    container.classList.add('active');
  }
});

// 3. Mouse Move: Drag within boundaries
window.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();
  
  // Calculate new position relative to container
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Boundary Constraints
  const maxX = containerRect.width - activeItem.offsetWidth;
  const maxY = containerRect.height - activeItem.offsetHeight;

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxX) newX = maxX;
  if (newY > maxY) newY = maxY;

  activeItem.style.left = newX + 'px';
  activeItem.style.top = newY + 'px';
});

// 4. Mouse Up: Drop
window.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.zIndex = ''; 
    activeItem = null;
    container.classList.remove('active');
  }
});