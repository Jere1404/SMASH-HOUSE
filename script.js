'use strict';
// Configuración pública: completar con datos autorizados del local. No guardar secretos aquí.
const SITE_CONFIG = {
  address: '',
  hours: '',
  whatsappNumber: '', // Formato internacional, solo dígitos. No configurar un número de ejemplo.
  googleMapsUrl: '' // URL HTTPS de Google Maps del local.
};
const products = [
  {id:'og',name:'THE OG',category:'burgers',description:'Doble smash, cheddar, pepinillos y salsa House.',price:6500,image:'assets/hero-burger.png',badge:'HOUSE FAVORITE'},
  {id:'honey',name:'HOT HONEY',category:'burgers',description:'Doble smash, cheddar, panceta y miel picante.',price:7200,image:'assets/hero-burger.png',badge:'SWEET HEAT'},
  {id:'truffle',name:'TRUFFLE CLUB',category:'burgers',description:'Doble smash, queso, cebolla caramelizada y mayo de trufa.',price:7800,image:'assets/hero-burger.png'},
  {id:'smoked',name:'SMOKED OUT',category:'burgers',description:'Doble smash, cheddar, cebolla crispy y salsa ahumada.',price:7500,image:'assets/hero-burger.png'},
  {id:'monster',name:'THE MONSTER',category:'burgers',description:'Triple smash, triple cheddar, panceta y salsa secreta.',price:8900,image:'assets/hero-burger.png',badge:'GO BIG'},
  {id:'fries',name:'CRISPY FRIES',category:'sides',description:'Papas doradas, sal de especias y salsa House.',price:3200,image:'assets/fries.svg'},
  {id:'loaded',name:'LOADED FRIES',category:'sides',description:'Papas con cheddar, panceta y cebolla de verdeo.',price:4500,image:'assets/fries.svg'},
  {id:'onion',name:'ONION RINGS',category:'sides',description:'Aros de cebolla crocantes con Midnight BBQ.',price:3800,image:'assets/rings.svg'},
  {id:'cola',name:'COLA HELADA',category:'drinks',description:'Gaseosa cola, lata de 354 ml. Bien fría.',price:1800,image:'assets/drink.svg'},
  {id:'lemon',name:'HOUSE LEMONADE',category:'drinks',description:'Limonada de la casa con menta. Vaso de 400 ml.',price:2400,image:'assets/lemonade.svg'}
];
const money = value => '$ ' + new Intl.NumberFormat('es-AR').format(value);
const cart = new Map();
const productList = document.querySelector('#products');
const dialog = document.querySelector('#cart-dialog');
let toastTimer;
function renderProducts(category) {
  productList.innerHTML = products.filter(product => product.category === category).map(product => `
    <article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.category === 'burgers' ? 'Imagen ilustrativa de smash burger; la composición puede variar' : product.name + ', ilustración de demostración'}" loading="lazy"><span class="product-number">${String(products.indexOf(product)+1).padStart(2,'0')}</span>${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}</div><div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><div class="product-bottom"><span class="price">${money(product.price)}</span><button class="add-button" data-add="${product.id}" aria-label="Agregar ${product.name} al pedido">+</button></div></div></article>`).join('');
}
function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}
function renderCart() {
  let total = 0, count = 0;
  const lines = [];
  document.querySelector('#cart-items').innerHTML = [...cart].map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    total += product.price * quantity;
    count += quantity;
    lines.push(`${quantity} × ${product.name} — ${money(product.price * quantity)}`);
    return `<article class="cart-item"><div><h3>${product.name}</h3><p>${money(product.price)} c/u · Subtotal ${money(product.price * quantity)}</p><button class="remove-item" data-remove="${id}" aria-label="Quitar ${product.name} del pedido">Quitar producto</button></div><div class="quantity"><button data-decrease="${id}" aria-label="Reducir cantidad de ${product.name}">−</button><span aria-label="Cantidad de ${product.name}">${quantity}</span><button data-increase="${id}" aria-label="Aumentar cantidad de ${product.name}">+</button></div></article>`;
  }).join('') || '<p class="cart-empty">Todavía no hay burgers por acá.<br>Elegí tu favorita y empezá el pedido.</p>';
  document.querySelector('#cart-total').textContent = money(total);
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('.cart-trigger').setAttribute('aria-label', `Abrir carrito, ${count} productos`);
  const checkout = document.querySelector('#whatsapp-checkout');
  const validNumber = /^[1-9]\d{7,14}$/.test(SITE_CONFIG.whatsappNumber);
  checkout.hidden = !validNumber || count === 0;
  if (validNumber && count > 0) {
    const message = `Hola SMASH HOUSE. Quisiera consultar por este pedido de demostración (precios ficticios):\n\n${lines.join('\n')}\n\nTotal de demostración: ${money(total)}\nA confirmar con el local. Este mensaje no confirma una compra.`;
    checkout.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  } else checkout.removeAttribute('href');
  document.querySelector('#checkout-note').textContent = validNumber ? 'Se abrirá WhatsApp con un borrador. Vos decidís si enviarlo. Pedido demo, sin pagos ni confirmación de compra.' : 'WhatsApp pendiente de configuración. No se enviará ningún pedido.';
}
function addProduct(id) {
  if (!products.some(product => product.id === id)) return;
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  notify(`${products.find(product => product.id === id).name} agregado al pedido`);
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    filter.classList.toggle('active', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  renderProducts(button.dataset.category);
}));
productList.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (button) addProduct(button.dataset.add);
});
document.querySelectorAll('.order-trigger, .cart-trigger').forEach(button => button.addEventListener('click', () => { renderCart(); dialog.showModal(); }));
function closeCart() { dialog.close(); }
document.querySelector('#close-cart').addEventListener('click', closeCart);
document.querySelector('#continue-shopping').addEventListener('click', () => { closeCart(); document.querySelector('#menu').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const focusable = [...dialog.querySelectorAll('button, a[href]')].filter(element => !element.hidden && element.getClientRects().length);
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeCart(); } });
document.querySelector('#cart-items').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = button.dataset.increase || button.dataset.decrease || button.dataset.remove;
  if (!cart.has(id)) return;
  const operation = button.hasAttribute('data-increase') ? 'increase' : button.hasAttribute('data-decrease') ? 'decrease' : 'remove';
  if (operation === 'increase') cart.set(id, cart.get(id) + 1);
  else if (operation === 'remove' || cart.get(id) === 1) cart.delete(id);
  else cart.set(id, cart.get(id) - 1);
  renderCart();
  const replacement = document.querySelector(`[data-${operation}="${id}"]`);
  (replacement || document.querySelector('#close-cart')).focus();
});
const mobileToggle = document.querySelector('.mobile-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() { navigation.classList.remove('open'); mobileToggle.setAttribute('aria-expanded','false'); mobileToggle.setAttribute('aria-label','Abrir navegación'); }
mobileToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded',String(open));
  mobileToggle.setAttribute('aria-label',open ? 'Cerrar navegación' : 'Abrir navegación');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click',closeNavigation));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeNavigation(); mobileToggle.focus(); } });
if (SITE_CONFIG.address) document.querySelector('#address').textContent = SITE_CONFIG.address;
if (SITE_CONFIG.hours) document.querySelector('#hours').textContent = SITE_CONFIG.hours;
try {
  const url = new URL(SITE_CONFIG.googleMapsUrl);
  if (url.protocol === 'https:' && ['www.google.com','google.com','maps.google.com','maps.app.goo.gl'].includes(url.hostname)) {
    const link = document.querySelector('#maps-link'); link.href = url.href; link.hidden = false; document.querySelector('#maps-pending').hidden = true;
  }
} catch { /* No Maps URL configured; show the explicit placeholder. */ }
renderProducts('burgers');
renderCart();
