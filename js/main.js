/* El Bitute Tres Porter - interacciones principales */
const year = document.getElementById('yr');
if (year) year.textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function setMobileMenu(open) {
  mobileMenu?.classList.toggle('hidden', !open);
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  menuBtn?.setAttribute('aria-expanded', String(open));
  menuBtn?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  iconOpen?.classList.toggle('hidden', open);
  iconClose?.classList.toggle('hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) mobileMenu?.querySelector('a')?.focus();
}

menuBtn?.addEventListener('click', () => setMobileMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
function closeMenu() { setMobileMenu(false); }

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((element) => observer.observe(element));
}

// Contenido sincronizado con la carta vigente. La carta no incluye precios.
const menuCategories = [
  { label: 'Appetizers', hint: 'Para comenzar y compartir.', items: [
    ['Empanadas', '2 unidades por orden'],
    ['Stuffed Potato', '2 unidades por orden'],
    ['Cheese Tequeños', '5 unidades por orden']
  ]},
  { label: 'Sandwiches', hint: 'Opciones preparadas al estilo de la casa.', items: [
    ['Pork Belly Sandwich', 'Sándwich de panceta de cerdo'],
    ['Chicken Sandwich', 'Sándwich de pollo'],
    ['Peruvian Burger Sandwich', 'Hamburguesa de inspiración peruana']
  ]},
  { label: 'Entrees', hint: 'Ceviches y favoritos para disfrutar.', items: [
    ['Fish Ceviche', 'Ceviche de pescado'],
    ['Mixed Ceviche', 'Ceviche mixto'],
    ['Carretillero Fish Ceviche', 'Ceviche carretillero de pescado'],
    ['Carretillero Mixed Ceviche', 'Ceviche carretillero mixto'],
    ['Salchipapas', 'Salchicha con papas fritas'],
    ['Salchipollo', 'Salchicha, pollo y papas fritas'],
    ['Chicken Wings with fries', 'Alitas de pollo con papas fritas']
  ]},
  { label: 'Main Dishes', hint: 'Platos principales y especialidades peruanas.', items: [
    ['Lomo Saltado', 'Con papas fritas y arroz'],
    ['Chicken Saltado', 'Con papas fritas y arroz'],
    ['Cylinder Pork Belly', 'Con arroz, plátano y ensalada'],
    ['Fish and Seafood Jalea', 'Con yucas fritas y ensalada'],
    ['Amazonian Pork Fried Rice', 'Con plátanos'],
    ['Chaufa Beef Fried Rice', 'Arroz chaufa de res'],
    ['Chaufa Chicken Fried Rice', 'Arroz chaufa de pollo'],
    ['Crispy Fried Fish', 'Con yucas y ensalada'],
    ['Trío Marino', 'Ceviche, arroz con mariscos y pescado frito'],
    ['Seafood Fried Rice and Crispy Fish', 'Con yucas']
  ]},
  { label: 'Noodles', hint: 'Tallarines salteados y fetuccine a la huancaína.', items: [
    ['Stir-fried Noodles with Beef', 'Tallarines salteados con res'],
    ['Stir-fried Noodles', 'Con pollo o mariscos'],
    ['Creamy Huancaína Fettuccine', 'Con lomo saltado'],
    ['Creamy Huancaína Fettuccine', 'Con camarones']
  ]},
  { label: 'Desserts', hint: 'El cierre dulce de la experiencia.', items: [
    ['Chocolate Cake', 'Torta de chocolate'],
    ['Five Milk Cake', 'Torta de cinco leches'],
    ['Crema Volteada', 'Postre tradicional peruano'],
    ['Alfajores con Dulce de Leche', 'Alfajores con manjar'],
    ['Ice Cream', 'Maracuyá o lúcuma']
  ]},
  { label: 'Drinks', hint: 'Bebidas frías y jugos frescos.', items: [
    ['Water', 'Agua'],
    ['Soda', 'Gaseosa'],
    ['Passion Fruit Juice', 'Jugo de maracuyá'],
    ['Lucuma Juice', 'Jugo de lúcuma'],
    ['Pineapple Juice', 'Jugo de piña'],
    ['Mango Juice', 'Jugo de mango']
  ]}
];

const menuTabs = document.getElementById('menu-tabs');
const menuTitle = document.getElementById('menu-category-title');
const menuHint = document.getElementById('menu-category-hint');
const menuItems = document.getElementById('menu-items');
let activeCategoryIndex = 0;

function renderMenuCategory(index) {
  const category = menuCategories[index];
  if (!category || !menuTitle || !menuHint || !menuItems) return;
  menuTitle.textContent = category.label;
  menuHint.textContent = category.hint;
  menuTabs?.querySelectorAll('[data-category-tab]').forEach((button) => {
    const active = Number(button.dataset.index) === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  menuItems.replaceChildren(...category.items.map(([name, description, price]) => {
    const article = document.createElement('article');
    article.className = 'menu-item-card text-center py-4';
    const title = document.createElement('p');
    title.className = 'font-display text-crema font-bold text-xl';
    title.textContent = name;
    const detail = document.createElement('p');
    detail.className = 'font-body text-crema/70 text-sm mt-2';
    detail.textContent = description;
    article.append(title, detail);
    if (price) {
      const amount = document.createElement('p');
      amount.className = 'font-display text-dorado font-extrabold text-lg mt-3';
      amount.textContent = price;
      article.append(amount);
    }
    return article;
  }));
}

function changeCategory(direction) {
  activeCategoryIndex = (activeCategoryIndex + direction + menuCategories.length) % menuCategories.length;
  renderMenuCategory(activeCategoryIndex);
}

menuTabs?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category-tab]');
  if (!button) return;
  activeCategoryIndex = Number(button.dataset.index);
  renderMenuCategory(activeCategoryIndex);
});
document.querySelectorAll('[data-nav]').forEach((button) => button.addEventListener('click', () => changeCategory(button.dataset.nav === 'next' ? 1 : -1)));
renderMenuCategory(activeCategoryIndex);

let modalTrigger = null;
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modalTrigger = document.activeElement;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('button, a')?.focus();
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal || modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalTrigger?.focus();
}
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (menuBtn?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuBtn.focus();
  }
  ['modal-wa', 'modal-ig', 'modal-fb'].forEach(closeModal);
});
