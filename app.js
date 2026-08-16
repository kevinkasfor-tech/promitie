/* Lógica e Interacciones del Sitio Promitie Arepas */

// Base de datos de productos (13 Arepas según especificación)
const PRODUCTOS = [
  {
    id: "paisa-grande",
    nombre: "Arepas Paisa Grande",
    origen: "Región Paisa",
    descripcionB2C: "La tradicional arepa blanca y delgada, ideal para acompañar con mantequilla y sal o asar al carbón.",
    descripcionB2B: "Excelente margen de ganancia para desayunaderos y restaurantes tradicionales.",
    unidades: 5,
    precio: 4500,
    categoria: "clasicas",
    sku: "PR-PAI-G5",
    caja: "40 paquetes",
    vidaUtil: "15 días en refrigeración",
    alergenos: "Ninguno",
    preparacion: "Asar a la plancha por 3-5 minutos de cada lado."
  },
  {
    id: "paisa-taco",
    nombre: "Arepas Paisa Taco",
    origen: "Región Paisa",
    descripcionB2C: "Formato práctico y redondo de grosor medio, perfecto para el desayuno de toda la familia.",
    descripcionB2B: "Ideal para emparedados de arepa y combos de desayuno en cafeterías.",
    unidades: 10,
    precio: 6200,
    categoria: "clasicas",
    sku: "PR-PAI-T10",
    caja: "30 paquetes",
    vidaUtil: "15 días en refrigeración",
    alergenos: "Ninguno",
    preparacion: "Plancha o tostadora."
  },
  {
    id: "paisa-bola",
    nombre: "Arepas Paisa Bola",
    origen: "Región Paisa",
    descripcionB2C: "Arepa tradicional gruesa para rellenar de queso, mantequilla, carne desmechada o chicharrón.",
    descripcionB2B: "Excelente retención de calor para entregas a domicilio.",
    unidades: 20,
    precio: 9500,
    categoria: "clasicas",
    sku: "PR-PAI-B20",
    caja: "15 paquetes",
    vidaUtil: "12 días en refrigeración",
    alergenos: "Ninguno",
    preparacion: "Abrir a la mitad, asar y rellenar al gusto."
  },
  {
    id: "peto-multigranos",
    nombre: "Arepas de Maíz Peto con Multigranos",
    origen: "Fórmula Exclusiva",
    descripcionB2C: "Elaborada con maíz peto y una mezcla premium de granos para un desayuno nutritivo y cargado de fibra.",
    descripcionB2B: "Línea saludable de alta demanda para cafeterías y markets especializados.",
    unidades: 5,
    precio: 5800,
    categoria: "saludables",
    sku: "PR-PET-M5",
    caja: "25 paquetes",
    vidaUtil: "15 días",
    alergenos: "Puede contener trazas de gluten",
    preparacion: "Plancha con un toque de aceite de oliva."
  },
  {
    id: "peto-chia",
    nombre: "Arepas de Maíz Peto con Chía",
    origen: "Fórmula Exclusiva",
    descripcionB2C: "Deliciosas y ligeras arepas con semillas de chía seleccionadas que aportan Omega 3 a tu mañana.",
    descripcionB2B: "Presentación ideal para menús saludables B2B en hoteles.",
    unidades: 5,
    precio: 5800,
    categoria: "saludables",
    sku: "PR-PET-C5",
    caja: "25 paquetes",
    vidaUtil: "15 días",
    alergenos: "Ninguno",
    preparacion: "Plancha 4 minutos por lado."
  },
  {
    id: "peto-ajonjoli",
    nombre: "Arepas de Maíz Peto con Ajonjolí y Linaza",
    origen: "Fórmula Exclusiva",
    descripcionB2C: "Combinación perfecta de semillas tostadas que le dan un toque crujiente y aromático único.",
    descripcionB2B: "Sabor gourmet para restaurantes que buscan diferenciarse.",
    unidades: 5,
    precio: 5800,
    categoria: "saludables",
    sku: "PR-PET-AL5",
    caja: "25 paquetes",
    vidaUtil: "15 días",
    alergenos: "Ajonjolí",
    preparacion: "Dorar sin aceite a fuego medio."
  },
  {
    id: "peto-quinoa",
    nombre: "Arepas de Maíz Peto con Quinoa",
    origen: "Fórmula Exclusiva",
    descripcionB2C: "Súper alimento andino incorporado a nuestra masa tradicional de maíz peto 100% colombiano.",
    descripcionB2B: "Gran tracción en la categoría Fit de mercados y restaurantes saludables.",
    unidades: 5,
    precio: 6000,
    categoria: "saludables",
    sku: "PR-PET-Q5",
    caja: "25 paquetes",
    vidaUtil: "15 días",
    alergenos: "Ninguno",
    preparacion: "Asar a fuego medio-alto."
  },
  {
    id: "queso-dulce",
    nombre: "Arepas Rellenas de Queso Dulces",
    origen: "Región Andina",
    descripcionB2C: "Masa de maíz dulce con una generosa porción de queso derretido en su interior. Una delicia irresistible.",
    descripcionB2B: "Producto estrella para meriendas y postres en restaurantes.",
    unidades: 5,
    precio: 7800,
    categoria: "queso",
    sku: "PR-QUE-D5",
    caja: "20 paquetes",
    vidaUtil: "10 días en refrigeración",
    alergenos: "Lácteos",
    preparacion: "Asar lentamente a fuego bajo para derretir el queso interior."
  },
  {
    id: "queso-pequena",
    nombre: "Arepas Rellenas de Queso Pequeña",
    origen: "Región Andina",
    descripcionB2C: "Formato cocktail para pasabocas, reuniones familiares o meriendas rápidas de los niños.",
    descripcionB2B: "Perfectas para catering, eventos y picadas en bares o restaurantes.",
    unidades: 10,
    precio: 6900,
    categoria: "queso",
    sku: "PR-QUE-P10",
    caja: "25 paquetes",
    vidaUtil: "10 días en refrigeración",
    alergenos: "Lácteos",
    preparacion: "Plancha o freidora de aire."
  },
  {
    id: "amasadas-queso",
    nombre: "Arepas Amasadas con Queso",
    origen: "Región Boyacense",
    descripcionB2C: "Queso campesino incorporado directamente en la masa desde el primer momento. Sabor tradicional y auténtico.",
    descripcionB2B: "El sabor artesanal que tus clientes leales agradecerán.",
    unidades: 5,
    precio: 7200,
    categoria: "queso",
    sku: "PR-AMA-Q5",
    caja: "20 paquetes",
    vidaUtil: "12 días en refrigeración",
    alergenos: "Lácteos",
    preparacion: "Asar a fuego medio con un poco de mantequilla."
  },
  {
    id: "rellenas-queso",
    nombre: "Arepas Rellenas de Queso",
    origen: "Región Central",
    descripcionB2C: "Nuestra arepa clásica con un corazón abundante de queso que se estira al primer mordisco.",
    descripcionB2B: "Máximo rendimiento y estandarización para tu línea de menús.",
    unidades: 5,
    precio: 8200,
    categoria: "queso",
    sku: "PR-REL-Q5",
    caja: "20 paquetes",
    vidaUtil: "10 días en refrigeración",
    alergenos: "Lácteos",
    preparacion: "Asar a fuego lento tapadas para óptimo derretido."
  },
  {
    id: "maiz-pelado",
    nombre: "Arepas de Maíz Pelado",
    origen: "Región Santandereana",
    descripcionB2C: "Elaborada con maíz trillado y cocido tradicionalmente, ofreciendo un sabor rústico e incomparable.",
    descripcionB2B: "El toque campestre perfecto para tu oferta de carnes o desayunos criollos.",
    unidades: 5,
    precio: 5200,
    categoria: "tradicionales",
    sku: "PR-PEL-T5",
    caja: "25 paquetes",
    vidaUtil: "12 días",
    alergenos: "Ninguno",
    preparacion: "Plancha o brasa."
  },
  {
    id: "pelado-quinoa",
    nombre: "Arepas de Maíz Pelado con Quinoa y Ajonjolí",
    origen: "Región Santandereana Fit",
    descripcionB2C: "La rusticidad del maíz pelado potenciada con el valor nutricional de la quinoa y el aroma del ajonjolí.",
    descripcionB2B: "Propuesta gourmet para clientes exigentes en el segmento HORECA.",
    unidades: 5,
    precio: 6500,
    categoria: "tradicionales",
    sku: "PR-PEL-QA5",
    caja: "25 paquetes",
    vidaUtil: "12 días",
    alergenos: "Ajonjolí",
    preparacion: "Dorar a la plancha a fuego medio."
  }
];
];

// Agregar beneficios dinámicamente según la categoría
PRODUCTOS.forEach(prod => {
  if (prod.categoria === 'clasicas') {
    prod.beneficios = ["Fuente de energía natural", "Ideal para una dieta equilibrada", "Sin conservantes artificiales"];
  } else if (prod.categoria === 'saludables') {
    prod.beneficios = ["Alto contenido en fibra", "Aporta minerales esenciales", "Ayuda a la digestión"];
  } else if (prod.categoria === 'queso') {
    prod.beneficios = ["Aporte de calcio y proteínas", "Sabor reconfortante", "Elaborado con queso campesino fresco"];
  } else if (prod.categoria === 'tradicionales') {
    prod.beneficios = ["Sabor rústico tradicional", "Fuente de energía natural", "Maíz pelado 100% natural"];
  }
});

// Estado global de la aplicación
let activeMode = 'b2c'; // 'b2c' o 'b2b'
let activeFilter = 'todos';
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  renderCatalog();
  initCatalogToggles();
  initCart();
  initChatbot();
  initContactForm();
  initGSAPAnimations();
  initMobileCarousel();
  
  // Cerrar modal global
  const closeBtn = document.getElementById("close-modal-btn");
  if(closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("product-modal").classList.remove("open");
    });
  }
});

// Cambiar estilo de la barra de navegación al hacer scroll
function initHeader() {
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Configurar interruptores de Catálogo (B2C / B2B)
function initCatalogToggles() {
  const btnB2c = document.getElementById("toggle-b2c");
  const btnB2b = document.getElementById("toggle-b2b");
  
  btnB2c.addEventListener("click", () => {
    activeMode = 'b2c';
    btnB2c.classList.add("active");
    btnB2b.classList.remove("active");
    btnB2b.classList.remove("b2b-mode");
    renderCatalog();
  });
  
  btnB2b.addEventListener("click", () => {
    activeMode = 'b2b';
    btnB2b.classList.add("active");
    btnB2b.classList.add("b2b-mode");
    btnB2c.classList.remove("active");
    renderCatalog();
  });
  
  // Configurar filtros de categorías
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", (e) => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.category;
      renderCatalog();
    });
  });
}

// Renderizar el catálogo según el modo y filtros seleccionados
function renderCatalog() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  
  const productosFiltrados = PRODUCTOS.filter(prod => {
    if (activeFilter === 'todos') return true;
    return prod.categoria === activeFilter;
  });
  
  productosFiltrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Ruta dinámica o fallback de imagen según los activos provistos
    const imgUrl = prod.categoria === 'queso' ? 'imagen 2.png' : 'imagen 1.png';
    
    if (activeMode === 'b2c') {
      // Tarjeta B2C
      card.innerHTML = `
        <div class="prod-img-wrapper open-modal-trigger" data-id="${prod.id}" style="cursor: pointer;" title="Ver detalles">
          <img src="${imgUrl}" alt="${prod.nombre}">
          <span class="prod-region-badge">${prod.origen}</span>
        </div>
        <div class="prod-info">
          <h3 class="prod-title">${prod.nombre}</h3>
          <p class="prod-desc">${prod.descripcionB2C}</p>
          <div class="prod-meta">
            <span class="prod-units">Paquete x ${prod.unidades} unidades</span>
            <span class="prod-price">$${prod.precio.toLocaleString()} Cop</span>
          </div>
          <div class="prod-actions">
            <div class="quantity-selector">
              <button class="qty-btn minus" data-id="${prod.id}">-</button>
              <span class="qty-val" id="qty-${prod.id}">1</span>
              <button class="qty-btn plus" data-id="${prod.id}">+</button>
            </div>
            <button class="add-to-cart-btn" data-id="${prod.id}">Agregar al detal</button>
          </div>
        </div>
      `;
    } else {
      // Ficha Técnica / Vista B2B
      card.innerHTML = `
        <div class="prod-img-wrapper open-modal-trigger" data-id="${prod.id}" style="cursor: pointer;" title="Ver detalles">
          <img src="${imgUrl}" alt="${prod.nombre}">
          <span class="prod-region-badge" style="background-color: var(--color-blue);">${prod.sku}</span>
        </div>
        <div class="prod-info">
          <h3 class="prod-title" style="color: var(--color-blue);">${prod.nombre} B2B</h3>
          <p class="prod-desc">${prod.descripcionB2B}</p>
          <div class="b2b-specs">
            <div class="b2b-spec-row">
              <span class="b2b-spec-label">Embalaje:</span>
              <span>Caja x ${prod.caja}</span>
            </div>
            <div class="b2b-spec-row">
              <span class="b2b-spec-label">Vida Útil:</span>
              <span>${prod.vidaUtil}</span>
            </div>
            <div class="b2b-spec-row">
              <span class="b2b-spec-label">Alérgenos:</span>
              <span>${prod.alergenos}</span>
            </div>
            <div class="b2b-spec-row">
              <span class="b2b-spec-label">Uso Sugerido:</span>
              <span>HORECA / Canal Mayorista</span>
            </div>
          </div>
          <a href="#contacto" class="b2b-cotizar-btn" data-name="${prod.nombre}">Solicitar Cotización B2B</a>
        </div>
      `;
    }
    
    grid.appendChild(card);
  });
  
  // Agregar eventos a los nuevos botones
  if (activeMode === 'b2c') {
    bindB2CEvents();
  } else {
    bindB2BEvents();
  }
}

// Asignar eventos para B2C (Cantidad y Carrito)
function bindB2CEvents() {
  const cards = document.getElementById("products-grid");
  
  cards.querySelectorAll(".qty-btn.plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const valEl = document.getElementById(`qty-${id}`);
      let val = parseInt(valEl.innerText);
      valEl.innerText = val + 1;
    });
  });
  
  cards.querySelectorAll(".qty-btn.minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const valEl = document.getElementById(`qty-${id}`);
      let val = parseInt(valEl.innerText);
      if (val > 1) valEl.innerText = val - 1;
    });
  });
  
  cards.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
      addToCart(id, qty);
      
      // Feedback visual
      btn.innerText = "✓ Agregado";
      btn.classList.add("added");
      setTimeout(() => {
        btn.innerText = "Agregar al detal";
        btn.classList.remove("added");
        document.getElementById(`qty-${id}`).innerText = 1;
      }, 1500);
    });
  });
  
  cards.querySelectorAll(".open-modal-trigger").forEach(el => {
    el.addEventListener("click", () => openProductModal(el.dataset.id));
  });
}

// Asignar eventos para B2B (Cotizar directo)
function bindB2BEvents() {
  const buttons = document.querySelectorAll(".b2b-cotizar-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const prodName = btn.dataset.name;
      const selectTipo = document.getElementById("tipo-cliente");
      const textarea = document.getElementById("mensaje");
      
      if (selectTipo && textarea) {
        selectTipo.value = "B2B";
        textarea.value = `Hola, estoy interesado en una cotización por volumen del producto: ${prodName} B2B para mi negocio.`;
        document.getElementById("contacto").scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  const cards = document.getElementById("products-grid");
  cards.querySelectorAll(".open-modal-trigger").forEach(el => {
    el.addEventListener("click", () => openProductModal(el.dataset.id));
  });
}

// Abrir Modal de Producto
function openProductModal(id) {
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) return;
  
  const imgUrl = prod.categoria === 'queso' ? 'imagen 2.png' : 'imagen 1.png';
  document.getElementById("modal-img").src = imgUrl;
  document.getElementById("modal-category").innerText = prod.origen;
  document.getElementById("modal-title").innerText = prod.nombre;
  
  const desc = activeMode === 'b2c' ? prod.descripcionB2C : prod.descripcionB2B;
  document.getElementById("modal-desc").innerText = desc;
  
  const ul = document.getElementById("modal-benefits-list");
  ul.innerHTML = "";
  if (prod.beneficios) {
    prod.beneficios.forEach(b => {
      const li = document.createElement("li");
      li.innerText = b;
      ul.appendChild(li);
    });
  }
  
  document.getElementById("modal-units").innerText = activeMode === 'b2c' ? `Paquete x ${prod.unidades} uds` : `Caja x ${prod.caja}`;
  document.getElementById("modal-price").innerText = activeMode === 'b2c' ? `$${prod.precio.toLocaleString()} Cop` : 'Precios Especiales B2B';
  
  const actionArea = document.getElementById("modal-action-area");
  if (activeMode === 'b2c') {
    actionArea.innerHTML = `
      <div class="quantity-selector" style="margin-bottom: 0.5rem; justify-content: flex-end;">
        <button class="qty-btn minus" id="modal-qty-minus">-</button>
        <span class="qty-val" id="modal-qty-val">1</span>
        <button class="qty-btn plus" id="modal-qty-plus">+</button>
      </div>
      <button class="add-to-cart-btn" id="modal-add-cart" style="width: 100%;">Agregar al detal</button>
    `;
    
    let qty = 1;
    document.getElementById("modal-qty-minus").onclick = () => { if(qty > 1) { qty--; document.getElementById("modal-qty-val").innerText = qty; }};
    document.getElementById("modal-qty-plus").onclick = () => { qty++; document.getElementById("modal-qty-val").innerText = qty; };
    document.getElementById("modal-add-cart").onclick = (e) => {
      addToCart(prod.id, qty);
      e.target.innerText = "✓ Agregado";
      e.target.classList.add("added");
      setTimeout(() => { e.target.innerText = "Agregar al detal"; e.target.classList.remove("added"); }, 1500);
    };
  } else {
    actionArea.innerHTML = `<a href="#contacto" class="b2b-cotizar-btn" style="display:block; text-align:center;">Solicitar Cotización B2B</a>`;
    actionArea.querySelector(".b2b-cotizar-btn").onclick = (e) => {
      e.preventDefault();
      document.getElementById("product-modal").classList.remove("open");
      const selectTipo = document.getElementById("tipo-cliente");
      const textarea = document.getElementById("mensaje");
      if (selectTipo && textarea) {
        selectTipo.value = "B2B";
        textarea.value = `Hola, estoy interesado en una cotización por volumen del producto: ${prod.nombre} B2B.`;
        document.getElementById("contacto").scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
  
  document.getElementById("product-modal").classList.add("open");
}

// Lógica de Carrito de Compras
function initCart() {
  const cartToggle = document.getElementById("open-cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCart = document.getElementById("close-cart-btn");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  cartToggle.addEventListener("click", (e) => {
    e.preventDefault();
    cartDrawer.classList.add("open");
  });
  
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
  });
  
  checkoutBtn.addEventListener("click", () => {
    sendOrderToWhatsApp();
  });
}

function addToCart(id, qty) {
  const prod = PRODUCTOS.find(p => p.id === id);
  const existIndex = carrito.findIndex(item => item.id === id);
  
  if (existIndex > -1) {
    carrito[existIndex].qty += qty;
  } else {
    carrito.push({ ...prod, qty });
  }
  
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById("cart-items-container");
  const totalValEl = document.getElementById("cart-total-value");
  const countEl = document.getElementById("cart-count");
  
  container.innerHTML = "";
  let total = 0;
  let totalItems = 0;
  
  carrito.forEach(item => {
    total += item.precio * item.qty;
    totalItems += item.qty;
    
    const el = document.createElement("div");
    el.className = "cart-item";
    const imgUrl = item.categoria === 'queso' ? 'imagen 2.png' : 'imagen 1.png';
    el.innerHTML = `
      <img src="${imgUrl}" alt="${item.nombre}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.nombre}</div>
        <div class="cart-item-price">$${(item.precio * item.qty).toLocaleString()} Cop</div>
        <div class="caption">Cant: ${item.qty}</div>
      </div>
      <button class="remove-item-btn" data-id="${item.id}">Quitar</button>
    `;
    
    el.querySelector(".remove-item-btn").addEventListener("click", () => {
      carrito = carrito.filter(c => c.id !== item.id);
      updateCartUI();
    });
    
    container.appendChild(el);
  });
  
  totalValEl.innerText = `$${total.toLocaleString()} Cop`;
  countEl.innerText = totalItems;
}

function sendOrderToWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  
  let msg = "¡Hola Promitie! Quisiera realizar el siguiente pedido hogareño (B2C):\n\n";
  let total = 0;
  carrito.forEach(item => {
    msg += `• ${item.nombre} x${item.qty} pqts - $${(item.precio * item.qty).toLocaleString()} Cop\n`;
    total += item.precio * item.qty;
  });
  
  msg += `\nTotal Pedido: $${total.toLocaleString()} Cop\n`;
  msg += "Por favor indíquenme los pasos para el pago y despacho en Bogotá.";
  
  const encodedText = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/573000000000?text=${encodedText}`;
  window.open(whatsappUrl, "_blank");
}

// Chatbot Interactivo
function initChatbot() {
  const btn = document.getElementById("chatbot-toggle");
  const box = document.getElementById("chatbot-box");
  const optionsContainer = document.getElementById("chatbot-options");
  const messages = document.getElementById("chatbot-messages");
  
  btn.addEventListener("click", () => {
    box.classList.toggle("open");
  });
  
  optionsContainer.querySelectorAll(".chat-opt-btn").forEach(opt => {
    opt.addEventListener("click", () => {
      const option = opt.dataset.option;
      const userMsg = document.createElement("div");
      userMsg.className = "chat-msg user";
      userMsg.innerText = opt.innerText;
      messages.appendChild(userMsg);
      
      // Respuesta automática en base a la opción elegida
      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-msg bot";
        
        if (option === "detal") {
          botMsg.innerText = "¡Excelente! Puedes ver nuestras arepas en el catálogo, agregarlas a tu carrito de compras y realizar tu pedido directamente a nuestro WhatsApp.";
        } else if (option === "negocio") {
          botMsg.innerText = "¡Genial! Fabricamos con altos estándares sanitarios e inocuidad. Ve a la sección Aliados, o rellena el formulario de contacto eligiendo la opción Mayorista para cotizar.";
        } else if (option === "receta") {
          botMsg.innerText = "¡Qué rico! Desplázate a nuestra sección de Recetario y deléitate con recetas tradicionales colombianas recomendadas por la abuela.";
        }
        
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 800);
      
      messages.scrollTop = messages.scrollHeight;
    });
  });
}

// Formulario de Contacto Dinámico
function initContactForm() {
  const form = document.getElementById("promitie-form");
  const select = document.getElementById("tipo-cliente");
  const textLabel = document.getElementById("mensaje-label");
  
  select.addEventListener("change", () => {
    if (select.value === "B2B") {
      textLabel.innerText = "Detalles del Negocio (Volumen estimado, tipo de local, etc.):";
    } else {
      textLabel.innerText = "Mensaje o Sugerencia:";
    }
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Muchas gracias! Tu mensaje ha sido recibido. Nos comunicaremos contigo a la mayor brevedad posible.");
    form.reset();
  });
}

// Animaciones con GSAP
function initGSAPAnimations() {
  // Animaciones básicas para el Hero y las tarjetas
  gsap.from(".hero-content h1", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out"
  });
  
  gsap.from(".hero-content p", {
    opacity: 0,
    y: 30,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
  });
  
  gsap.from(".hero-ctas", {
    opacity: 0,
    y: 20,
    duration: 1.2,
    delay: 0.6,
    ease: "power3.out"
  });
  
  // Scrollytelling animaciones usando GSAP ScrollTrigger si está cargado
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".essence-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2
      });
    });
    
    gsap.utils.toArray(".scroll-step").forEach((step) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 80%"
        },
        opacity: 0,
        y: 40,
        duration: 0.9
      });
    });

    // Animación para reseñas
    gsap.from(".review-card", {
      scrollTrigger: {
        trigger: ".reviews-grid",
        start: "top 85%"
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out"
    });
  }
}

// Carrusel automático en móvil
function initMobileCarousel() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  
  setInterval(() => {
    if (window.innerWidth <= 768) {
      // Obtenemos el ancho de una tarjeta + el gap (aprox 20px)
      const firstCard = grid.querySelector('.product-card');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 20; 
      
      // Si llegamos al final del scroll, regresamos al inicio
      if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
        grid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  }, 4000);
}

/* ============================================
   HAMBURGER MENU MÓVIL
   ============================================ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const overlay   = document.getElementById('mobile-nav-overlay');
  const closeBtn  = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  if (!hamburger || !overlay) return;

  function openNav() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Cierra con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
})();

