'use strict';
// Configuración pública: completar con datos autorizados del local. No guardar secretos aquí.
const SITE_CONFIG = {
  address: '',
  hours: '',
  whatsappNumber: '', // Formato internacional, solo dígitos. No configurar un número de ejemplo.
  googleMapsUrl: '' // URL HTTPS de Google Maps del local.
};
const products = [
  {id:'og',name:'THE OG',category:'burgers',description:'Doble smash, cheddar, pepinillos y salsa House.',price:6500,image:'assets/THE OG.webp',badge:'HOUSE FAVORITE'},
  {id:'honey',name:'HOT HONEY',category:'burgers',description:'Doble smash, cheddar, bacon crujiente, jalapeños y miel picante.',price:7200,image:'assets/HOT HONEY.webp',badge:'SWEET HEAT'},
  {id:'truffle',name:'TRUFFLE CLUB',category:'burgers',description:'Doble smash, queso, cebolla caramelizada y mayo de trufa.',price:7800,image:'assets/TRUFFLE CLUB.webp'},
  {id:'smoked',name:'SMOKED OUT',category:'burgers',description:'Doble smash, cheddar, cebolla crispy y salsa ahumada.',price:7500,image:'assets/SMOKED OUT .webp'},
  {id:'monster',name:'THE MONSTER',category:'burgers',description:'Triple smash, triple cheddar, panceta y salsa secreta.',price:8900,image:'assets/THE MOSNTER.webp',badge:'GO BIG'},
  {id:'fries',name:'CRISPY FRIES',category:'sides',description:'Papas doradas, sal de especias y salsa House.',price:3200,image:'assets/crispy-fries.webp'},
  {id:'loaded',name:'LOADED FRIES',category:'sides',description:'Papas con cheddar, panceta y cebolla de verdeo.',price:4500,image:'assets/loaded-fries.webp'},
  {id:'onion',name:'ONION RINGS',category:'sides',description:'Aros de cebolla crocantes con Midnight BBQ.',price:3800,image:'assets/onion-rings.webp'},
  {id:'cola',name:'COLA HELADA',category:'drinks',description:'Gaseosa cola, lata de 354 ml. Bien fría.',price:1800,image:'assets/cola-helada.webp'},
  {id:'lemon',name:'HOUSE LEMONADE',category:'drinks',description:'Limonada de la casa con menta. Vaso de 400 ml.',price:2400,image:'assets/house-lemonade.webp'}
];
const money = value => '$ ' + new Intl.NumberFormat('es-AR').format(value);
const cart = new Map();
const productList = document.querySelector('#products');
const dialog = document.querySelector('#cart-dialog');
let toastTimer;
const menuTitles = {
  burgers: ['BURGER', 'SELECTION.'],
  sides: ['CHOOSE YOUR', 'SIDE DISH.'],
  drinks: ['', 'DRINKS.']
};
let menuTitleAnimation;
function updateMenuTitle(category) {
  const title = document.querySelector('#menu-title');
  const [lead, accent] = menuTitles[category];
  const previousCategory = title.dataset.menuCategory;
  title.replaceChildren();
  if (lead) {
    const whiteText = document.createElement('span');
    whiteText.textContent = lead;
    title.append(whiteText, document.createTextNode(' '));
  }
  const redText = document.createElement('em');
  redText.textContent = accent;
  title.append(redText);
  title.dataset.menuCategory = category;
  menuTitleAnimation?.cancel();
  if (previousCategory && previousCategory !== category && !matchMedia('(prefers-reduced-motion: reduce)').matches && title.animate) {
    menuTitleAnimation = title.animate(
      [{opacity: .55, transform: 'translateY(3px)'}, {opacity: 1, transform: 'translateY(0)'}],
      {duration: 180, easing: 'ease-out'}
    );
  }
}
function renderProducts(category) {
  updateMenuTitle(category);
  productList.classList.toggle('food-photo-grid', category !== 'burgers');
  productList.classList.toggle('burger-grid', category === 'burgers');
  productList.innerHTML = products.filter(product => product.category === category).map(product => {
    const isBurger = product.category === 'burgers';
    // Las fotos incluyen título e ingredientes: evitar duplicarlos visualmente.
    // El contenido HTML sigue disponible para lectores de pantalla y en el desplegable.
    const details = isBurger
      ? `<h3 class="sr-only" id="product-${product.id}">${product.name}</h3><details class="burger-ingredients"><summary>Ver ingredientes</summary><p>${product.description}</p></details>`
      : `<h3 id="product-${product.id}">${product.name}</h3><p>${product.description}</p>`;
    return `<article class="product-card${isBurger ? ' photo-card' : ' food-photo-card'}" aria-labelledby="product-${product.id}"><div class="product-image"><img src="${encodeURI(product.image)}" alt="${isBurger ? 'Presentación de ' + product.name : 'Fotografía de ' + product.name}" loading="lazy" width="1536" height="1024"></div><div class="product-info">${details}<div class="product-bottom"><span class="price">${money(product.price)}</span><button class="add-button" data-add="${product.id}" aria-label="Agregar ${product.name} al pedido">+</button></div></div></article>`;
  }).join('');
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
  document.querySelector('#cart-items').innerHTML = [...cart].map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    total += product.price * quantity;
    count += quantity;
    return `<article class="cart-item"><div><h3>${product.name}</h3><p>${money(product.price)} c/u · Subtotal ${money(product.price * quantity)}</p><button class="remove-item" data-remove="${id}" aria-label="Quitar ${product.name} del pedido">Quitar producto</button></div><div class="quantity"><button data-decrease="${id}" aria-label="Reducir cantidad de ${product.name}">−</button><span aria-label="Cantidad de ${product.name}">${quantity}</span><button data-increase="${id}" aria-label="Aumentar cantidad de ${product.name}">+</button></div></article>`;
  }).join('') || '<p class="cart-empty">Todavía no hay burgers por acá.<br>Elegí tu favorita y empezá el pedido.</p>';
  document.querySelector('#cart-total').textContent = money(total);
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('.cart-trigger').setAttribute('aria-label', `Abrir carrito, ${count} productos`);
  document.querySelector('#finalize-order').disabled = count === 0;
  document.querySelector('#empty-cart-note').hidden = count > 0;
  // Cualquier cambio invalida el borrador anterior, sin borrar los datos del cliente.
  document.querySelector('#order-preview').value = '';
  document.querySelector('#whatsapp-checkout').removeAttribute('href');
  document.querySelector('#whatsapp-checkout').hidden = true;
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
document.querySelectorAll('.order-trigger, .cart-trigger').forEach(button => button.addEventListener('click', () => { renderCart(); showOrderStep('cart', false); dialog.showModal(); }));
function closeCart() { dialog.close(); }
document.querySelector('#close-cart').addEventListener('click', closeCart);
document.querySelector('#continue-shopping').addEventListener('click', () => { closeCart(); document.querySelector('#menu').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const focusable = [...dialog.querySelectorAll('button, a[href], input, textarea, select, summary')].filter(element => !element.hidden && !element.disabled && element.getClientRects().length && (!element.checkVisibility || element.checkVisibility()));
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
// Flujo de pedido: los datos se conservan solo en memoria mientras la página esté abierta.
const orderForm = document.querySelector('#order-form');
const nameInput = document.querySelector('#customer-name');
const addressInput = document.querySelector('#delivery-address');
const notesInput = document.querySelector('#order-notes');
function showOrderStep(step, focus = true) {
  for (const name of ['cart', 'customer', 'review']) {
    document.querySelector(`#${name}-step`).hidden = name !== step;
  }
  document.querySelector('#order-progress').textContent = {
    cart: '01 / CARRITO', customer: '02 / TUS DATOS', review: '03 / REVISAR Y COMPARTIR'
  }[step];
  dialog.scrollTop = 0;
  if (focus) document.querySelector(step === 'cart' ? '#finalize-order' : `#${step}-title`).focus();
}
function selectedMode() {
  return orderForm.querySelector('[name="deliveryMode"]:checked')?.value || '';
}
function setFieldError(id, inputs, message) {
  const error = document.querySelector(`#${id}-error`);
  error.textContent = message;
  error.hidden = !message;
  for (const input of inputs) {
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
}
function updateDeliveryMode() {
  const delivery = selectedMode() === 'delivery';
  document.querySelector('#address-field').hidden = !delivery;
  addressInput.disabled = !delivery;
  addressInput.required = delivery;
  if (!delivery) setFieldError('address', [addressInput], '');
  setFieldError('mode', [...orderForm.querySelectorAll('[name="deliveryMode"]')], '');
}
function validateCustomer() {
  const modeInputs = [...orderForm.querySelectorAll('[name="deliveryMode"]')];
  const fields = [
    ['name', [nameInput], !nameInput.value.trim() ? 'Ingresá tu nombre.' : nameInput.value.length > 100 ? 'Usá hasta 100 caracteres para el nombre.' : ''],
    ['mode', modeInputs, !selectedMode() ? 'Elegí retiro en el local o delivery.' : ''],
    ['address', [addressInput], selectedMode() === 'delivery' && !addressInput.value.trim() ? 'Ingresá la dirección de entrega.' : addressInput.value.length > 250 && selectedMode() === 'delivery' ? 'Usá hasta 250 caracteres para la dirección.' : ''],
    ['notes', [notesInput], notesInput.value.length > 800 ? 'Usá hasta 800 caracteres para las observaciones.' : '']
  ];
  for (const [id, inputs, message] of fields) setFieldError(id, inputs, message);
  const firstError = fields.find(field => field[2]);
  if (firstError) firstError[1][0].focus();
  return !firstError;
}
function buildOrderMessage() {
  const ars = value => `${money(value)} ARS`;
  const delivery = selectedMode() === 'delivery';
  let total = 0;
  const lines = [...cart].map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    const subtotal = product.price * quantity;
    total += subtotal;
    return `${quantity} × ${product.name}\n  Unitario: ${ars(product.price)} · Subtotal: ${ars(subtotal)}`;
  });
  return [
    'SMASH HOUSE — PEDIDO DE DEMOSTRACIÓN',
    `Cliente: ${nameInput.value.trim()}`,
    `Modalidad: ${delivery ? 'Delivery' : 'Retiro en el local'}`,
    ...(delivery ? [`Dirección: ${addressInput.value.trim()}`] : []),
    '', 'PRODUCTOS', ...lines, '', `TOTAL: ${ars(total)}`,
    ...(notesInput.value.trim() ? ['', `Observaciones: ${notesInput.value.trim()}`] : []),
    '', 'Precios ficticios. Sin pagos ni confirmación de compra.',
    'Disponibilidad y entrega a confirmar con el local.'
  ].join('\n');
}
// El destino de prueba vive únicamente en el DOM y esta variable de memoria.
// Nunca escribirlo en configuración, almacenamiento persistente, logs ni mensajes.
const testModeInput = document.querySelector('#test-mode');
const testPhoneInput = document.querySelector('#test-whatsapp-number');
let testWhatsappNumber = '';
function normalizeWhatsappNumber(value) {
  const text = String(value).trim();
  if (!/^\+?[1-9][\d\s().-]*$/.test(text)) return '';
  const digits = text.replace(/[+\s().-]/g, '');
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : '';
}
function setTestPhoneError(message) {
  const error = document.querySelector('#test-phone-error');
  error.textContent = message;
  error.hidden = !message;
  if (message) testPhoneInput.setAttribute('aria-invalid', 'true');
  else testPhoneInput.removeAttribute('aria-invalid');
}
function updateWhatsappLink(showError = false) {
  const checkout = document.querySelector('#whatsapp-checkout');
  const testing = testModeInput.checked;
  testWhatsappNumber = testing ? normalizeWhatsappNumber(testPhoneInput.value) : '';
  const destination = testing ? testWhatsappNumber : normalizeWhatsappNumber(SITE_CONFIG.whatsappNumber);
  setTestPhoneError(testing && showError && !testWhatsappNumber
    ? 'Ingresá un número internacional de 8 a 15 dígitos, con código de país y sin extensiones ni prefijo 00.' : '');
  const ready = Boolean(destination && cart.size && document.querySelector('#order-preview').value);
  checkout.hidden = !ready;
  checkout.replaceChildren(document.createTextNode(testing ? 'ABRIR WHATSAPP DE PRUEBA ' : 'ABRIR WHATSAPP '));
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  checkout.append(arrow);
  if (ready) checkout.href = `https://wa.me/${destination}?text=${encodeURIComponent(buildOrderMessage())}`;
  else checkout.removeAttribute('href');
  document.querySelector('#checkout-note').textContent = testing
    ? (ready ? 'Modo de prueba activo. Se abrirá WhatsApp con el pedido actual para que lo revises y lo envíes manualmente. El carrito se conserva.' : 'Modo de prueba activo. Ingresá un número autorizado con formato internacional para habilitar WhatsApp de prueba. También podés copiar el mensaje.')
    : (destination ? 'WhatsApp se abrirá con un borrador. Vos decidís si enviarlo. Abrirlo no confirma el pedido y no vacía tu carrito.' : 'WhatsApp pendiente de un número autorizado. Podés copiar este mensaje de demostración; no se enviará automáticamente.');
}
function clearTestMode() {
  testModeInput.checked = false;
  testModeInput.setAttribute('aria-expanded', 'false');
  testPhoneInput.value = '';
  testPhoneInput.disabled = true;
  testWhatsappNumber = '';
  document.querySelector('#test-phone-field').hidden = true;
  setTestPhoneError('');
  updateWhatsappLink();
}
function renderOrderSummary() {
  const delivery = selectedMode() === 'delivery';
  document.querySelector('#review-customer-name').textContent = nameInput.value.trim();
  document.querySelector('#review-delivery-mode').textContent = delivery ? 'Delivery' : 'Retiro en el local';
  document.querySelector('#review-address-row').hidden = !delivery;
  document.querySelector('#review-address').textContent = delivery ? addressInput.value.trim() : '';
  const notes = notesInput.value.trim();
  document.querySelector('#review-notes-row').hidden = !notes;
  document.querySelector('#review-notes').textContent = notes;
  const list = document.querySelector('#review-products');
  list.replaceChildren();
  let total = 0;
  for (const [id, quantity] of cart) {
    const product = products.find(item => item.id === id);
    const subtotal = product.price * quantity;
    total += subtotal;
    const item = document.createElement('li');
    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = `${quantity} × ${product.name}`;
    const unit = document.createElement('span');
    unit.textContent = `Unitario: ${money(product.price)} ARS`;
    info.append(title, unit);
    const amount = document.createElement('span');
    amount.className = 'receipt-subtotal';
    amount.textContent = `${money(subtotal)} ARS`;
    const label = document.createElement('small');
    label.textContent = 'Subtotal';
    amount.prepend(label);
    item.append(info, amount);
    list.append(item);
  }
  document.querySelector('#review-total').textContent = `${money(total)} ARS`;
}
function reviewOrder() {
  if (!cart.size) { showOrderStep('cart'); return; }
  if (!validateCustomer()) return;
  document.querySelector('#order-preview').value = buildOrderMessage();
  document.querySelector('#copy-status').textContent = '';
  renderOrderSummary();
  updateWhatsappLink();
  showOrderStep('review');
}
testModeInput.addEventListener('change', () => {
  if (!testModeInput.checked) { clearTestMode(); return; }
  testModeInput.setAttribute('aria-expanded', 'true');
  document.querySelector('#test-phone-field').hidden = false;
  testPhoneInput.disabled = false;
  updateWhatsappLink();
  testPhoneInput.focus();
});
testPhoneInput.addEventListener('input', () => updateWhatsappLink(Boolean(testPhoneInput.value.trim())));
testPhoneInput.addEventListener('blur', () => updateWhatsappLink(testModeInput.checked));
document.querySelector('#whatsapp-checkout').addEventListener('click', event => {
  // Volver a generar desde el carrito actual; nunca navegar sin destino válido.
  updateWhatsappLink(true);
  if (!cart.size || !document.querySelector('#order-preview').value || document.querySelector('#whatsapp-checkout').hidden) event.preventDefault();
});
// Evitar restauración de un destino de prueba por formularios o caché de navegación.
clearTestMode();
window.addEventListener('pagehide', clearTestMode);
window.addEventListener('pageshow', clearTestMode);
document.querySelector('#finalize-order').addEventListener('click', () => {
  if (cart.size) showOrderStep('customer');
});
orderForm.addEventListener('submit', event => { event.preventDefault(); reviewOrder(); });
orderForm.querySelectorAll('[name="deliveryMode"]').forEach(input => input.addEventListener('change', updateDeliveryMode));
for (const [input, id] of [[nameInput, 'name'], [addressInput, 'address'], [notesInput, 'notes']]) {
  input.addEventListener('input', () => setFieldError(id, [input], ''));
}
document.querySelector('#back-to-cart').addEventListener('click', () => showOrderStep('cart'));
document.querySelector('#review-back-cart').addEventListener('click', () => showOrderStep('cart'));
document.querySelector('#edit-customer').addEventListener('click', () => showOrderStep('customer'));
document.querySelector('#copy-order').addEventListener('click', async () => {
  const preview = document.querySelector('#order-preview');
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(preview.value);
    status.textContent = 'Mensaje copiado. Podés pegarlo donde prefieras; no fue enviado.';
  } catch {
    document.querySelector('#message-details').open = true;
    preview.focus();
    preview.select();
    preview.setSelectionRange(0, preview.value.length);
    status.textContent = 'No se pudo copiar automáticamente. El mensaje quedó seleccionado: usá Copiar en tu dispositivo o Ctrl+C / Cmd+C.';
  }
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
