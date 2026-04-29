const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const grid = document.getElementById('extensionsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

let extensions = [];
let currentFilter = 'all';

// Persist + apply theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Build one card element
function createCard(ext, index) {
  const li = document.createElement('li');
  li.className = 'ext-card';
  li.dataset.index = index;

  const toggleId = `toggle-${index}`;

  li.innerHTML = `
    <div class="ext-card__top">
      <div class="ext-card__logo">
        <img src="${ext.logo}" alt="${ext.name} logo">
      </div>
      <div class="ext-card__info">
        <h2 class="ext-card__name">${ext.name}</h2>
        <p class="ext-card__desc">${ext.description}</p>
      </div>
    </div>
    <div class="ext-card__bottom">
      <button class="remove-btn" aria-label="Remove ${ext.name}">Remove</button>
      <label class="toggle" aria-label="Toggle ${ext.name}">
        <input type="checkbox" class="toggle__input" id="${toggleId}" ${ext.isActive ? 'checked' : ''}>
        <span class="toggle__track"></span>
        <span class="toggle__thumb"></span>
      </label>
    </div>
  `;

  // Toggle active state
  li.querySelector('.toggle__input').addEventListener('change', (e) => {
    extensions[index].isActive = e.target.checked;
    applyFilter();
  });

  // Remove card
  li.querySelector('.remove-btn').addEventListener('click', () => {
    extensions.splice(index, 1);
    renderAll();
  });

  return li;
}

function applyFilter() {
  const cards = grid.querySelectorAll('.ext-card');
  cards.forEach(card => {
    const idx = parseInt(card.dataset.index, 10);
    const ext = extensions[idx];
    const visible =
      currentFilter === 'all' ||
      (currentFilter === 'active' && ext.isActive) ||
      (currentFilter === 'inactive' && !ext.isActive);
    card.hidden = !visible;
  });
}

function renderAll() {
  grid.innerHTML = '';
  extensions.forEach((ext, i) => {
    grid.appendChild(createCard(ext, i));
  });
  applyFilter();
}

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

// Load data
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    extensions = data;
    renderAll();
  });
