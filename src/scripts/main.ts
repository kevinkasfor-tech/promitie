/* ============================================================
   PROMITIE — Lógica principal (catálogo, carrito persistente,
   chatbot recomendador por ocasión, formulario, navegación)
   ============================================================ */
import { PRODUCTOS, imagenDe, COP, WHATSAPP_NUMERO, IMAGE_POOL } from '../data/productos';
import type { Producto } from '../data/productos';

type Modo = 'b2c' | 'b2b';
let activeMode: Modo = 'b2c';
let activeFilter = 'todos';

interface ItemCarrito extends Producto { qty: number }
const CART_KEY = 'promitie-cart-v1';
let carrito: ItemCarrito[] = cargarCarrito();

// Registro de carruseles activos (productId -> intervalId)
const carouselIntervals = new Map<string, ReturnType<typeof setInterval>>();

function cargarCarrito(): ItemCarrito[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const items: { id: string; qty: number }[] = JSON.parse(raw);
    // Reconstruye contra el catálogo para evitar datos obsoletos
    return items
      .map(i => {
        const prod = PRODUCTOS.find(p => p.id === i.id);
        return prod ? { ...prod, qty: Math.max(1, i.qty | 0) } : null;
      })
      .filter((x): x is ItemCarrito => x !== null);
  } catch {
    return [];
  }
}

function guardarCarrito() {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito.map(({ id, qty }) => ({ id, qty }))));
}

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderCatalog();
  initCatalogToggles();
  initCart();
  initChatbot();
  initContactForm();
  initMobileNav();

  $('#close-modal-btn')?.addEventListener('click', () => $('#product-modal').classList.remove('open'));
  $('#product-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) $('#product-modal').classList.remove('open');
  });
  $('#hero-b2b-trigger')?.addEventListener('click', () => $('#toggle-b2b')?.click());
});

/* ---------- Header ---------- */
function initHeader() {
  const header = document.querySelector('header')!;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Navegación móvil ---------- */
function initMobileNav() {
  const hamburger = $('#hamburger-btn');
  const overlay = $('#mobile-nav-overlay');
  const closeBtn = $('#mobile-nav-close');
  if (!hamburger || !overlay) return;

  const closeNav = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  hamburger.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeBtn?.addEventListener('click', closeNav);
  overlay.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(l => l.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => e.key === 'Escape' && closeNav());
}

/* ---------- Catálogo ---------- */
function initCatalogToggles() {
  const btnB2c = $('#toggle-b2c');
  const btnB2b = $('#toggle-b2b');

  btnB2c.addEventListener('click', () => {
    activeMode = 'b2c';
    btnB2c.classList.add('active');
    btnB2c.setAttribute('aria-selected', 'true');
    btnB2b.classList.remove('active', 'b2b-mode');
    btnB2b.setAttribute('aria-selected', 'false');
    renderCatalog();
  });

  btnB2b.addEventListener('click', () => {
    activeMode = 'b2b';
    btnB2b.classList.add('active', 'b2b-mode');
    btnB2b.setAttribute('aria-selected', 'true');
    btnB2c.classList.remove('active');
    btnB2c.setAttribute('aria-selected', 'false');
    renderCatalog();
  });

  document.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.category!;
      renderCatalog();
    });
  });
}

function renderCatalog() {
  // Detener todos los carruseles activos antes de limpiar el DOM
  carouselIntervals.forEach(id => clearInterval(id));
  carouselIntervals.clear();

  const grid = $('#products-grid');
  grid.innerHTML = '';

  const filtrados = PRODUCTOS.filter(p => activeFilter === 'todos' || p.categoria === activeFilter);

  filtrados.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.prodId = prod.id;

    // Mezcla aleatoria del pool de imágenes para este producto
    const shuffled = [...IMAGE_POOL].sort(() => Math.random() - 0.5);
    const slides = shuffled.slice(0, Math.min(5, shuffled.length));

    // Info que rota con las imágenes (badge sobre la imagen)
    const infoBadges = [
      `📦 Paquete x ${prod.unidades} uds`,
      `✨ ${prod.beneficios[0]}`,
      prod.beneficios[1] ? `🌾 ${prod.beneficios[1]}` : `📍 ${prod.origen}`,
      `⏳ ${prod.vidaUtil}`,
      `🍳 ${prod.preparacion}`,
    ];

    const slidesHTML = slides.map((src, i) => `
      <div class="pcarousel-slide${i === 0 ? ' active' : ''}">
        <img src="${src}" alt="${prod.nombre}" loading="${i === 0 ? 'eager' : 'lazy'}">
        <div class="pcarousel-badge">${infoBadges[i % infoBadges.length]}</div>
      </div>`).join('');

    const dotsHTML = slides.map((_, i) =>
      `<span class="pcarousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`
    ).join('');

    if (activeMode === 'b2c') {
      card.innerHTML = `
        <div class="pcarousel-wrapper open-modal-trigger" data-id="${prod.id}" title="Ver detalles">
          <div class="pcarousel-track">${slidesHTML}</div>
          <div class="pcarousel-dots">${dotsHTML}</div>
          <span class="prod-region-badge pcarousel-region">${prod.origen}</span>
        </div>
        <div class="prod-info">
          <h3 class="prod-title">${prod.nombre}</h3>
          <p class="prod-desc">${prod.descripcionB2C}</p>
          <div class="prod-meta">
            <span class="prod-units">Paquete x ${prod.unidades} unidades</span>
            <span class="prod-price">${COP(prod.precio)}</span>
          </div>
          <div class="prod-actions">
            <div class="quantity-selector">
              <button class="qty-btn minus" data-id="${prod.id}" aria-label="Disminuir">−</button>
              <span class="qty-val" id="qty-${prod.id}">1</span>
              <button class="qty-btn plus" data-id="${prod.id}" aria-label="Aumentar">+</button>
            </div>
            <button class="add-to-cart-btn" data-id="${prod.id}">Agregar al detal</button>
          </div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="pcarousel-wrapper open-modal-trigger" data-id="${prod.id}" title="Ver detalles">
          <div class="pcarousel-track">${slidesHTML}</div>
          <div class="pcarousel-dots">${dotsHTML}</div>
          <span class="prod-region-badge pcarousel-region" style="background-color: var(--color-blue);">${prod.sku}</span>
        </div>
        <div class="prod-info">
          <h3 class="prod-title" style="color: var(--color-blue);">${prod.nombre} B2B</h3>
          <p class="prod-desc">${prod.descripcionB2B}</p>
          <div class="b2b-specs">
            <div class="b2b-spec-row"><span class="b2b-spec-label">Embalaje:</span><span>Caja x ${prod.caja}</span></div>
            <div class="b2b-spec-row"><span class="b2b-spec-label">Vida útil:</span><span>${prod.vidaUtil}</span></div>
            <div class="b2b-spec-row"><span class="b2b-spec-label">Alérgenos:</span><span>${prod.alergenos}</span></div>
            <div class="b2b-spec-row"><span class="b2b-spec-label">Uso Sugerido:</span><span>HORECA / Canal Mayorista</span></div>
          </div>
          <button class="b2b-cotizar-btn" data-name="${prod.nombre}">Solicitar Cotización B2B</button>
        </div>`;
    }
    grid.appendChild(card);
  });

  // Animación de entrada (respeta reduced-motion)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    grid.querySelectorAll('.product-card').forEach((c, i) => {
      (c as HTMLElement).animate(
        [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 450, delay: i * 60, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'backwards' }
      );
    });
  }

  // Iniciar carruseles automáticos
  grid.querySelectorAll<HTMLElement>('.product-card').forEach(card => {
    const prodId = card.dataset.prodId!;
    initCarousel(card, prodId);
  });

  activeMode === 'b2c' ? bindB2CEvents() : bindB2BEvents();
}

function initCarousel(card: HTMLElement, prodId: string) {
  const track = card.querySelector<HTMLElement>('.pcarousel-track');
  const dots = card.querySelectorAll<HTMLElement>('.pcarousel-dot');
  if (!track) return;

  const slides = track.querySelectorAll<HTMLElement>('.pcarousel-slide');
  const total = slides.length;
  if (total <= 1) return;

  let current = 0;

  const goTo = (idx: number) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  // Click en dots para navegación manual
  dots.forEach((dot, i) => {
    dot.addEventListener('click', e => {
      e.stopPropagation();
      goTo(i);
      // Reiniciar el timer al navegar manualmente
      clearInterval(carouselIntervals.get(prodId));
      const newId = setInterval(() => goTo(current + 1), 2800);
      carouselIntervals.set(prodId, newId);
    });
  });

  // Auto-rotación aleatoria: elige un orden aleatorio de slides
  const order = Array.from({ length: total }, (_, i) => i).sort(() => Math.random() - 0.5);
  let orderIdx = 0;

  const intervalId = setInterval(() => {
    orderIdx = (orderIdx + 1) % order.length;
    goTo(order[orderIdx]);
  }, 2600 + Math.random() * 800); // intervalo con variación aleatoria

  carouselIntervals.set(prodId, intervalId);
}

function bindB2CEvents() {
  const grid = $('#products-grid');
  grid.querySelectorAll<HTMLButtonElement>('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = $(`#qty-${btn.dataset.id}`);
      el.innerText = String(parseInt(el.innerText) + 1);
    });
  });
  grid.querySelectorAll<HTMLButtonElement>('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = $(`#qty-${btn.dataset.id}`);
      const v = parseInt(el.innerText);
      if (v > 1) el.innerText = String(v - 1);
    });
  });
  grid.querySelectorAll<HTMLButtonElement>('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id!;
      const qty = parseInt($(`#qty-${id}`).innerText);
      addToCart(id, qty);
      btn.innerText = '✓ Agregado';
      btn.classList.add('added');
      setTimeout(() => {
        btn.innerText = 'Agregar al detal';
        btn.classList.remove('added');
        $(`#qty-${id}`).innerText = '1';
      }, 1500);
    });
  });
  grid.querySelectorAll<HTMLElement>('.open-modal-trigger').forEach(el =>
    el.addEventListener('click', () => openProductModal(el.dataset.id!))
  );
}

function bindB2BEvents() {
  document.querySelectorAll<HTMLButtonElement>('.b2b-cotizar-btn').forEach(btn => {
    btn.addEventListener('click', () => irACotizacion(btn.dataset.name!));
  });
  $('#products-grid').querySelectorAll<HTMLElement>('.open-modal-trigger').forEach(el =>
    el.addEventListener('click', () => openProductModal(el.dataset.id!))
  );
}

function irACotizacion(prodName: string) {
  const selectTipo = $('#tipo-cliente') as HTMLSelectElement;
  const textarea = $('#mensaje') as HTMLTextAreaElement;
  if (selectTipo && textarea) {
    selectTipo.value = 'B2B';
    selectTipo.dispatchEvent(new Event('change'));
    textarea.value = `Hola, estoy interesado en una cotización por volumen del producto: ${prodName} B2B para mi negocio.`;
    $('#contacto').scrollIntoView({ behavior: 'smooth' });
  }
}

/* ---------- Modal de producto ---------- */
function openProductModal(id: string) {
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) return;

  ($('#modal-img') as HTMLImageElement).src = imagenDe(prod);
  $('#modal-category').innerText = prod.origen;
  $('#modal-title').innerText = prod.nombre;
  $('#modal-desc').innerText = activeMode === 'b2c' ? prod.descripcionB2C : prod.descripcionB2B;

  const ul = $('#modal-benefits-list');
  ul.innerHTML = '';
  prod.beneficios.forEach(b => {
    const li = document.createElement('li');
    li.innerText = b;
    ul.appendChild(li);
  });

  $('#modal-units').innerText = activeMode === 'b2c' ? `Paquete x ${prod.unidades} uds` : `Caja x ${prod.caja}`;
  $('#modal-price').innerText = activeMode === 'b2c' ? COP(prod.precio) : 'Precios Especiales B2B';

  const actionArea = $('#modal-action-area');
  if (activeMode === 'b2c') {
    actionArea.innerHTML = `
      <div class="quantity-selector" style="margin-bottom: 0.5rem; justify-content: flex-end;">
        <button class="qty-btn minus" id="modal-qty-minus">−</button>
        <span class="qty-val" id="modal-qty-val">1</span>
        <button class="qty-btn plus" id="modal-qty-plus">+</button>
      </div>
      <button class="add-to-cart-btn" id="modal-add-cart" style="width: 100%;">Agregar al detal</button>`;
    let qty = 1;
    const qtyEl = () => $('#modal-qty-val');
    $('#modal-qty-minus').onclick = () => { if (qty > 1) qtyEl().innerText = String(--qty); };
    $('#modal-qty-plus').onclick = () => { qtyEl().innerText = String(++qty); };
    ($('#modal-add-cart') as HTMLButtonElement).onclick = e => {
      addToCart(prod.id, qty);
      const b = e.target as HTMLButtonElement;
      b.innerText = '✓ Agregado';
      b.classList.add('added');
      setTimeout(() => { b.innerText = 'Agregar al detal'; b.classList.remove('added'); }, 1500);
    };
  } else {
    actionArea.innerHTML = `<button class="b2b-cotizar-btn" style="display:block; text-align:center; width:100%;">Solicitar Cotización B2B</button>`;
    actionArea.querySelector('.b2b-cotizar-btn')!.addEventListener('click', () => {
      $('#product-modal').classList.remove('open');
      irACotizacion(prod.nombre);
    });
  }

  $('#product-modal').classList.add('open');
}

/* ---------- Carrito ---------- */
function initCart() {
  $('#open-cart-btn').addEventListener('click', () => $('#cart-drawer').classList.add('open'));
  $('#close-cart-btn').addEventListener('click', () => $('#cart-drawer').classList.remove('open'));
  $('#checkout-btn').addEventListener('click', sendOrderToWhatsApp);
  updateCartUI();
}

function addToCart(id: string, qty: number) {
  const prod = PRODUCTOS.find(p => p.id === id)!;
  const existente = carrito.find(i => i.id === id);
  if (existente) existente.qty += qty;
  else carrito.push({ ...prod, qty });
  guardarCarrito();
  updateCartUI();
  animarContadorCarrito();
}

function animarContadorCarrito() {
  const el = $('#cart-count');
  el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    { duration: 350, easing: 'ease-out' }
  );
}

function updateCartUI() {
  const container = $('#cart-items-container');
  container.innerHTML = '';

  if (carrito.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-sec); margin-top: 3rem;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
  }

  let total = 0, totalItems = 0;
  carrito.forEach(item => {
    total += item.precio * item.qty;
    totalItems += item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${imagenDe(item)}" alt="${item.nombre}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.nombre}</div>
        <div class="cart-item-price">${COP(item.precio * item.qty)}</div>
        <div class="caption">Cant: ${item.qty}</div>
      </div>
      <button class="remove-item-btn" data-id="${item.id}">Quitar</button>`;
    el.querySelector('.remove-item-btn')!.addEventListener('click', () => {
      carrito = carrito.filter(c => c.id !== item.id);
      guardarCarrito();
      updateCartUI();
    });
    container.appendChild(el);
  });

  $('#cart-total-value').innerText = COP(total);
  $('#cart-count').innerText = String(totalItems);
}

function sendOrderToWhatsApp() {
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  let msg = '¡Hola Promitie! Quisiera realizar el siguiente pedido hogareño (B2C):\n\n';
  let total = 0;
  carrito.forEach(item => {
    msg += `• ${item.nombre} x${item.qty} pqts - ${COP(item.precio * item.qty)}\n`;
    total += item.precio * item.qty;
  });
  msg += `\nTotal Pedido: ${COP(total)}\n`;
  msg += 'Por favor indíquenme los pasos para el pago y despacho en Bogotá.';
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---------- Chatbot recomendador por ocasión ---------- */
const RECOMENDACIONES: Record<string, { intro: string; ids: string[]; cierre: string }> = {
  desayuno: {
    intro: '¡El desayuno es sagrado! 🌅 Para la mesa familiar te recomiendo:',
    ids: ['paisa-taco', 'paisa-grande', 'amasadas-queso'],
    cierre: 'La Paisa Taco rinde para todos; si prefieres algo más contundente, la Paisa Bola rellena nunca falla.',
  },
  merienda: {
    intro: 'Para ese antojo de media tarde 🧀 estas son mis favoritas:',
    ids: ['rellenas-queso', 'queso-dulce', 'amasadas-queso'],
    cierre: 'Ásalas a fuego lento tapadas para que el queso se derrita perfecto. 🤤',
  },
  asado: {
    intro: '¡A fuego lento y al carbón! 🔥 Para tu asado te sugiero:',
    ids: ['maiz-pelado', 'paisa-grande', 'pelado-quinoa'],
    cierre: 'La de Maíz Pelado a la brasa queda crujiente por fuera y suave por dentro. Acompáñala con chicharrón.',
  },
  fit: {
    intro: '¡Nutrición sin sacrificar sabor! 💪 La línea fit te va a encantar:',
    ids: ['peto-chia', 'peto-quinoa', 'peto-multigranos'],
    cierre: 'Altas en fibra y elaboradas con maíz peto. Perfectas con huevo poché o aguacate.',
  },
  evento: {
    intro: '¡Que la reunión sea memorable! 🎉 Para pasabocas y eventos:',
    ids: ['queso-pequena', 'rellenas-queso', 'peto-ajonjoli'],
    cierre: 'La Rellena Pequeña es formato cocktail: las sirves directo de la freidora de aire y vuelan.',
  },
  negocio: {
    intro: '¡Hagamos crecer tu negocio! 🏪 Los favoritos de nuestros aliados HORECA:',
    ids: ['rellenas-queso', 'paisa-grande', 'queso-pequena'],
    cierre: 'Activa el modo "Aliado Comercial (B2B)" en el catálogo para ver fichas técnicas, o escríbenos desde el formulario de contacto para cotizar.',
  },
};

function initChatbot() {
  const btn = $('#chatbot-toggle');
  const box = $('#chatbot-box');
  const optionsContainer = $('#chatbot-options');
  const optionsToggle = $('#chatbot-options-toggle');
  const messages = $('#chatbot-messages');

  btn.addEventListener('click', () => box.classList.toggle('open'));

  const toggleOptions = (collapsed: boolean) => {
    box.classList.toggle('options-collapsed', collapsed);
    optionsContainer.classList.toggle('collapsed', collapsed);
    optionsToggle.setAttribute('aria-expanded', String(!collapsed));
    messages.scrollTop = messages.scrollHeight;
  };

  optionsToggle.addEventListener('click', () => {
    toggleOptions(!box.classList.contains('options-collapsed'));
  });

  const pushMsg = (text: string, who: 'bot' | 'user') => {
    const el = document.createElement('div');
    el.className = `chat-msg ${who}`;
    el.innerText = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };

  const pushRecomendacion = (rec: { intro: string; ids: string[]; cierre: string }) => {
    const seleccion: Record<string, number> = {};
    rec.ids.forEach(id => { seleccion[id] = 1; });

    pushMsg(rec.intro, 'bot');

    const wrap = document.createElement('div');
    wrap.className = 'chat-products';
    rec.ids.forEach(id => {
      const p = PRODUCTOS.find(x => x.id === id)!;
      const row = document.createElement('div');
      row.className = 'chat-product-row';
      row.innerHTML = `
        <img src="${imagenDe(p)}" alt="${p.nombre}">
        <div class="chat-product-info">
          <span class="chat-product-name">${p.nombre}</span>
          <span class="chat-product-price">${COP(p.precio)}</span>
        </div>
        <div class="chat-qty-selector">
          <button type="button" class="chat-qty-btn minus" data-id="${id}" aria-label="Disminuir unidades">−</button>
          <span class="chat-qty-val" data-id="${id}">1</span>
          <button type="button" class="chat-qty-btn plus" data-id="${id}" aria-label="Aumentar unidades">+</button>
        </div>`;
      wrap.appendChild(row);
    });
    messages.appendChild(wrap);

    const form = document.createElement('div');
    form.className = 'chat-order-form';
    form.innerHTML = `
      <p class="chat-order-title">Ajusta las unidades con + y − y deja tus datos 🛒</p>
      <input type="text" class="chat-order-input" id="chat-order-name" placeholder="Tu nombre" autocomplete="name">
      <input type="text" class="chat-order-input" id="chat-order-address" placeholder="Dirección de entrega" autocomplete="street-address">
      <div class="chat-order-total">Total: <span class="chat-order-total-value"></span></div>
      <button type="button" class="chat-order-btn" id="chat-order-submit">
        <i class="fa-brands fa-whatsapp"></i> Completar compra
      </button>`;

    const updateTotal = () => {
      let total = 0;
      rec.ids.forEach(id => {
        const p = PRODUCTOS.find(x => x.id === id)!;
        total += p.precio * seleccion[id];
      });
      form.querySelector('.chat-order-total-value')!.textContent = COP(total);
    };

    wrap.querySelectorAll<HTMLButtonElement>('.chat-qty-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.id!;
        const next = Math.max(1, seleccion[id] + (b.classList.contains('plus') ? 1 : -1));
        seleccion[id] = next;
        wrap.querySelector<HTMLElement>(`.chat-qty-val[data-id="${id}"]`)!.innerText = String(next);
        updateTotal();
      });
    });

    form.querySelector<HTMLButtonElement>('#chat-order-submit')!.addEventListener('click', () => {
      const nameInput = form.querySelector<HTMLInputElement>('#chat-order-name')!;
      const addrInput = form.querySelector<HTMLInputElement>('#chat-order-address')!;
      const nombre = nameInput.value.trim();
      const direccion = addrInput.value.trim();
      if (!nombre || !direccion) {
        pushMsg('Por favor completa tu nombre y la dirección de entrega para enviar el pedido. ✍️', 'bot');
        nameInput.classList.add('chat-order-error');
        addrInput.classList.add('chat-order-error');
        return;
      }
      let msg = '¡Hola Promitie! Quiero completar mi pedido:\n\n';
      let total = 0;
      rec.ids.forEach(id => {
        const p = PRODUCTOS.find(x => x.id === id)!;
        const q = seleccion[id];
        msg += `• ${p.nombre} x${q} pqts - ${COP(p.precio * q)}\n`;
        total += p.precio * q;
      });
      msg += `\n👤 Nombre: ${nombre}\n📍 Dirección: ${direccion}\n\nTotal Pedido: ${COP(total)}\nPor favor confírmenme pago y despacho.`;
      window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
      pushMsg('¡Listo! Abrimos WhatsApp con tu pedido. 🎉', 'bot');
    });

    messages.appendChild(form);
    updateTotal();
    messages.scrollTop = messages.scrollHeight;
    setTimeout(() => pushMsg(rec.cierre + ' Ajusta las cantidades y completa tus datos para enviar el pedido por WhatsApp.', 'bot'), 400);
  };

  optionsContainer.querySelectorAll<HTMLButtonElement>('.chat-opt-btn').forEach(opt => {
    opt.addEventListener('click', () => {
      const key = opt.dataset.option!;
      const rec = RECOMENDACIONES[key];
      if (!rec) return;
      pushMsg(opt.innerText, 'user');
      toggleOptions(true);
      setTimeout(() => pushRecomendacion(rec), 700);
    });
  });
}

/* ---------- Formulario ---------- */
function initContactForm() {
  const form = $('#promitie-form') as HTMLFormElement;
  const select = $('#tipo-cliente') as HTMLSelectElement;
  const textLabel = $('#mensaje-label');

  select.addEventListener('change', () => {
    textLabel.innerText = select.value === 'B2B'
      ? 'Detalles del Negocio (Volumen estimado, tipo de local, etc.):'
      : 'Mensaje o Sugerencia:';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.innerText = '✓ ¡Mensaje enviado!';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = 'Enviar mensaje de contacto';
      btn.disabled = false;
      form.reset();
      select.dispatchEvent(new Event('change'));
    }, 3000);
  });
}
