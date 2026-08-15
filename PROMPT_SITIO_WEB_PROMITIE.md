# Prompt maestro — Sitio web Promitie Arepas

> Copia y pega este documento completo como prompt inicial en Antigravity. Contiene marca, arquitectura, sistema de diseño, tipografía, secciones, interacciones, modelo de datos y requisitos técnicos. Sigue este documento como especificación única — no inventes decisiones de diseño que lo contradigan.

---

## 1. Rol y objetivo

Actúa como un equipo de estudio de diseño y desarrollo senior construyendo el sitio web de **Promitie Arepas**, marca colombiana tradicional de arepas (Productos Alimenticios de Mi Tierra S.A.S.), con sede en Bogotá. El sitio debe verse **auténtico, colombiano, cálido y de primer nivel** — no una plantilla genérica de e-commerce de alimentos. Referencia visual: la calidez de una marca de tradición familiar ejecutada con el pulido de una marca premium internacional.

El objetivo del sitio es doble: vender directamente a consumidores finales (B2C) y captar clientes mayoristas / HORECA (B2B), bajo una sola narrativa de marca.

---

## 2. Narrativa de marca

**Promesa central:**
> "Arepas tradicionales colombianas, hechas para disfrutar en casa y rendir en negocios que sirven sabor auténtico."

- Desde 2004, fundada por Edgar y Luz Alejandra en Bogotá.
- Slogan oficial: **"Hechas con Amor de Hogar"**.
- Pilares: Tradición e Inocuidad (maíz 100% colombiano) · Tecnología Gastronómica (procesos automatizados con textura y frescura garantizadas) · Compromiso Local (empleo y precios justos en Bogotá).

---

## 3. Logo e identidad de marca

- **No rediseñar el mascot ni el logo.** Usa el logo completo a color (maíz antropomorfo sonriente con pulgar arriba, hojas verdes, wordmark "PROMITIE" en rojo, "AREPAS" en azul, cinta roja con "Hechas con Amor de Hogar") tal como fue provisto — colores plenos, estilo glossy/3D original, sin aplanar ni desaturar.
- Formatos a producir/usar:
  - **Logo horizontal completo**: header, footer, hero.
  - **Logo circular (bandera de Colombia)**: favicon, sello en empaque/fábrica, badges de confianza.
  - El logo nunca se recolorea para "encajar" en secciones sobrias (ej. B2B) — en su lugar, el fondo y los acentos alrededor se ajustan (ver sección 4, Azul Profundo).

---

## 4. Sistema de color — "Auténtico Colombiano Premium"

Principio rector: **los colores vivos de la bandera se conservan, pero el fondo domina en tonos neutros cálidos (90% del sitio)**, de modo que el color se sienta curado y no abrumador. Cada color tiene un trabajo específico, no se combinan todos a la vez.

| Rol | Nombre | Hex | Uso |
|---|---|---|---|
| Fondo dominante | Crema cálido | `#FFFBF3` | Fondo de página, 90% del sitio |
| Fondo secundario | Beige arena | `#F7EFDE` | Separación de bloques, tarjetas |
| Texto principal | Café robusto | `#2A1D17` | Tipografía de cuerpo y titulares oscuros |
| Acento primario | Rojo Promitie | `#D62F2F` | CTAs principales, urgencia, badges de promoción |
| Acento secundario | Dorado maíz | `#E8A400` | Precios, hover, íconos clave, subrayados |
| Acento serio (B2B) | Azul profundo | `#1E3A5F` | Sección "Aliado Comercial B2B", footer, tablas técnicas |
| Acento frescura | Verde hoja | `#2E7D32` | Sellos de calidad, línea fit, WhatsApp, badges de frescura |
| Texto secundario | Gris cálido | `#8A8378` | Notas, metadatos, texto secundario |

**Reglas de aplicación:**
- Nunca usar los 4 colores de acento (rojo, dorado, azul, verde) en una misma sección salvo en el header/hero donde vive el logo completo.
- El azul profundo es exclusivo de las zonas donde se necesita seriedad comercial (B2B, footer) — no se usa en secciones B2C.
- Botones primarios (conversión): fondo rojo `#D62F2F`, texto blanco, hover a dorado `#E8A400`.
- Botones secundarios: borde café robusto, fondo transparente.

---

## 5. Tipografía

Pareja tipográfica deliberada — evita Inter+cualquier-serif-por-defecto. Combina calidez artesanal con legibilidad moderna.

| Rol | Tipografía | Fuente | Peso/uso |
|---|---|---|---|
| Display / H1-H2 | **Fraunces** (variable) | Google Fonts | 600–900, itálica opcional para momentos editoriales; da carácter cálido y premium sin ser un serif genérico |
| Cuerpo / UI | **Public Sans** | Google Fonts | 400 texto, 500 énfasis, 600 botones; alta legibilidad, no compite con Fraunces |
| Acento manuscrito | **Caveat** | Google Fonts | Solo para citas cortas, el tagline "Hechas con Amor de Hogar" cuando aparece suelto, y notas tipo "receta de la abuela" — úsalo con moderación, nunca en párrafos largos |
| Datos / Fichas B2B | **Public Sans** (variante tabular-nums) | Google Fonts | Tablas de gramaje, precios por volumen, fichas técnicas |

**Escala tipográfica (rem, base 16px):**
- H1: 3.5rem / Fraunces 700
- H2: 2.25rem / Fraunces 600
- H3: 1.5rem / Fraunces 600
- Body: 1rem / Public Sans 400, line-height 1.7
- Caption: 0.8125rem / Public Sans 500

**Signature tipográfico**: el subrayado o "tachón" hecho a mano bajo palabras clave del hero (usando Caveat superpuesto o un trazo SVG tipo marcador), evocando el gesto de resaltar algo con cariño — este es el elemento distintivo de marca, úsalo con moderación (1–2 veces por página).

---

## 6. Layout, espaciado y componentes

- Radios de borde: `12px` tarjetas, `999px` (píldora) botones y badges.
- Sombra: sutil y cálida, nunca gris fría — `0 4px 20px rgba(42, 29, 23, 0.08)`.
- Grid: 12 columnas desktop, contenedor máximo 1280px, padding lateral 24px mobile / 64px desktop.
- Botones: siempre verbo en infinitivo o imperativo ("Pedir al detal", no "Enviar").
- Mantén foco visible por teclado en todos los componentes interactivos.
- Respeta `prefers-reduced-motion` en todas las animaciones.

---

## 7. Arquitectura del sitio (dual B2C / B2B)

Una sola narrativa, dos rutas de conversión. No crear "dos sitios" — el visitante entiende primero la marca, luego elige su camino.

```
/
├── /catalogo
│   ├── Todas las arepas
│   ├── Por región
│   ├── Para desayunos
│   ├── Para asar / rellenar
│   └── Combos y degustación
├── /negocios (landing B2B independiente)
│   ├── Soluciones HORECA
│   ├── Catálogo mayorista
│   ├── Restaurantes y cafeterías
│   ├── Hoteles y desayunos
│   ├── Distribuidores
│   └── Solicitar cotización
├── /nuestra-tradicion
├── /recetas
├── /puntos-de-venta (mapa fábrica)
└── /contacto
```

- Catálogo maestro único en el CMS — cada producto se renderiza con dos vistas (`ProductCardConsumer` / `ProductCardBusiness`) según el contexto, sin duplicar contenido.

---

## 8. Home — Hero con bifurcación

**Hero (H1):** "Arepas tradicionales colombianas para cada mesa y cada negocio"
**Subtítulo:** "Sabores regionales elaborados para un desayuno memorable y formatos prácticos para restaurantes, cafeterías, hoteles y distribuidores."

- **Fondo:** video en loop de 5–8s (arepa caliente, queso derretido, vapor), overlay degradado de `#1C130E` al 60% en el lado donde va el texto, transparente en el resto.
- **Logo completo** en el header, flotante con glassmorphism sutil (blur + fondo crema al 85% de opacidad) al hacer scroll.
- **Doble CTA, lado a lado en desktop, apilado en mobile:**
  - Primario (rojo `#D62F2F`): "Quiero probar las arepas" → `/catalogo`
  - Secundario (borde blanco translúcido): "Tengo un negocio" → `/negocios`

---

## 9. Secciones — especificación completa

### 9.1 Nuestra Esencia (Historia y valores)
- Fondo crema con marca de agua sutil de granos de maíz.
- Encabezado: "Desde 2004 alimentando a las familias y negocios de Colombia."
- Grid de 3 columnas ("Píldoras de Valor"): Tradición e Inocuidad · Tecnología Gastronómica · Compromiso Local.
- Animación: entrada con `translateY(30px)` a `0` al hacer scroll (GSAP o Framer Motion).

### 9.2 Del Maíz a la Mesa (Scrollytelling de calidad)
- Fondo beige arena. Secuencia scroll-driven: Desgrane y Selección → Cocción y Amasado Artesanal → Empaque al Vacío y Cadena de Frío.
- Badge flotante interactivo: Registro INVIMA, "Sin Conservantes Masivos / Calidad Certificada" (acento verde hoja).

### 9.3 Catálogo interactivo (B2C)
- Fondo blanco puro, sin distracciones — protagonismo del producto.
- **Filtros:** tipo de arepa (chócolo, boyacense, santandereana, con queso...), momento de consumo, preparación, cantidad.
- **Tarjeta de producto:** foto servida (no solo empacada), nombre + región, descripción corta apetitosa, tiempo de preparación, presentación (x5/x10/x20 unidades), selector de cantidad, botón "Agregar al carrito" con microanimación de check verde.
- **Bloque de descubrimiento:** "¿No sabes cuál elegir?" — mini quiz de 3 preguntas que recomienda un producto o combo degustación.
- **Carrito flotante lateral (drawer):** resumen, subtotal, botón "Enviar Pedido a WhatsApp" (verde hoja).
- Botones "Descargar catálogo PDF" y compartir directo a WhatsApp/Instagram con imagen precargada.

### 9.4 Recetario (Inspiración Gastronómica)
- Formato tipo red social: carrusel de 3 columnas, 5 recetas en tendencia.
- Hover sobre la foto reproduce video ultracorto en loop de la preparación + lista rápida de ingredientes.
- Botón "Comprar ingredientes de esta receta" → añade directo al carrito.
- Cada receta es página indexable (SEO) con su propia URL.

### 9.5 Aliado Comercial B2B (landing `/negocios`)
- Fondo azul profundo `#1E3A5F` con video de fondo oscurecido (parrillas de restaurantes, producción a escala).
- Texto en blanco/crema, acentos en dorado maíz.
- Titular: "Abastece tu restaurante, supermercado o distribución con la mejor arepa de Bogotá."
- 3 puntos de valor: Margen de Ganancia Atractivo · Estandarización de Peso y Tamaño · Despachos con Cadena de Frío Garantizada.
- Casos de uso: desayuno de hotel, cafetería (combo arepa + bebida), restaurante, catering.
- Portafolio profesional: 3–5 referencias destacadas, no el catálogo completo.
- **Ficha de producto B2B** (ver modelo de datos, sección 11): SKU, gramaje, unidades por caja, vida útil, preparación por método (plancha/horno/freidora), rendimiento sugerido, alérgenos, pedido mínimo, precio por volumen (tras cotización), descarga de ficha técnica PDF.
- CTA: "Solicitar Lista de Precios e Información Mayorista" (botón ancho, dorado maíz sobre azul).

### 9.6 Ubicación, Mapa de Fábrica y Formulario
- Layout dividido 50/50.
- **Izquierda:** Google Maps embebido (Carrera 20 No. 164 – 22, Bogotá), botones "Abrir en Waze" / "Llamar a Planta: (601) 6780289", indicador en vivo "Atención en Planta: Lunes a Sábado" (punto verde titilante).
- **Derecha:** formulario inteligente con selector inicial que adapta los campos: "Deseo Comprar al Detal" / "Soy Restaurante o Distribuidor" — campos: nombre, teléfono/WhatsApp, correo, mensaje/volumen.

### 9.7 Chatbot de ventas
- Avatar: versión simplificada en línea del mascot (no glossy) para el widget de chat.
- Primer mensaje identifica el tipo de cliente (detal / mayorista / domicilio) y enruta la conversación de forma distinta para cada uno.
- Integración con WhatsApp Business API para continuidad fuera del sitio.

### 9.8 Clientes Satisfechos
- Video-testimonios cortos tipo reel.
- Carrusel de logos de negocios HORECA que ya compran la marca (si aplica).

### 9.9 Buzón de Sugerencias
- Sección con identidad propia, no perdida en el footer.
- Promesa clara: "Tu opinión mejora la próxima arepa."
- Opcional: mostrar sugerencias implementadas recientemente.

### 9.10 Footer
- Fondo azul profundo o café robusto.
- Columna 1: logo, razón social (Productos Alimenticios de Mi Tierra S.A.S.), NIT.
- Columna 2: navegación y mapa del sitio.
- Columna 3: Registro Sanitario INVIMA, políticas de datos (Habeas Data).
- Créditos y copyright.

---

## 10. CTAs por contexto (no usar "Contáctanos" genérico)

| Contexto | CTA |
|---|---|
| Home, B2C | "Descubre las arepas" |
| Producto para hogar | "Pedir por WhatsApp" |
| Combo de degustación | "Quiero probar estos sabores" |
| Home, B2B | "Comprar para mi negocio" |
| Landing HORECA | "Solicitar catálogo mayorista" |
| Producto B2B | "Cotizar por volumen" |
| Prospecto de alto valor | "Agendar degustación" |
| Distribuidor | "Quiero distribuir la marca" |

---

## 11. Modelo de datos (Astro + CMS)

```ts
type Arepa = {
  slug: string
  nombre: string
  origenRegional: string
  descripcionB2C: string
  descripcionB2B: string
  imagenPrincipal: Image
  galeria: Image[]
  categorias: string[]
  momentosConsumo: string[]
  gramajeUnidad: string
  unidadesPorPaquete: number
  unidadesPorCaja: number
  pesoCaja?: string
  vidaUtil?: string
  almacenamiento?: string
  preparacion?: string[]
  ingredientes?: string[]
  alergenos?: string[]
  pedidoMinimo?: string
  aptoHoreca: boolean
  destacadoB2C: boolean
  fichaTecnicaPdf?: string
}
```

Componentes de renderizado: `ProductCardConsumer.astro` y `ProductCardBusiness.astro`, ambos alimentados por el mismo registro `Arepa` del CMS — nunca duplicar productos.

Catálogo base a cargar inicialmente (13 productos, extraídos del catálogo real de la marca):

- Arepas Paisa Grande (x5) · Arepas Paisa Taco (x10) · Arepas Paisa Bola (x20)
- Arepas de Maíz Peto con Multigranos / con Chía / con Ajonjolí y Linaza / con Quinoa (x5 c/u)
- Arepas Rellenas de Queso Dulces (x5) · Pequeña (x10) · Amasadas con Queso (x5) · Rellenas de Queso (x5)
- Arepas de Maíz Pelado (x5) · Rellenas de Queso (x5) · con Quinoa y Ajonjolí (x5)

(Cada producto ya cuenta con descripción de beneficios nutricionales redactada — reutilízala para `descripcionB2C`.)

---

## 12. Stack técnico recomendado

- **Framework:** Astro (SSG + islands para componentes interactivos en React/Vue).
- **Estilos:** Tailwind CSS con tokens del sistema de color/tipografía de este documento configurados en `tailwind.config`.
- **CMS:** headless (Sanity, Strapi o similar) modelando el tipo `Arepa` de la sección 11.
- **Animaciones:** GSAP + ScrollTrigger para scrollytelling; Framer Motion (o CSS) para microinteracciones.
- **Carrito:** estado en cliente (React island) + integración WhatsApp API para checkout.
- **Mapas:** Google Maps Embed API.
- **Formularios:** validación en cliente + envío a backend/CMS o servicio de formularios (ej. Formspree) con notificación a ventas.

---

## 13. Requisitos no negociables

- Responsive completo mobile-first, probado desde 360px de ancho.
- Foco visible por teclado en todo elemento interactivo.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Imágenes con `alt` descriptivo; videos de fondo con fallback estático para conexiones lentas.
- SEO: cada receta y cada producto con metadatos únicos, Open Graph configurado.
- Rendimiento: Lighthouse ≥ 90 en performance, accesibilidad y SEO.
- El logo y el mascot se usan siempre en su versión de color original — no aplanar, no desaturar, no reemplazar por versiones simplificadas salvo en el favicon (16–32px, versión circular bandera).

---

## 14. Qué construir primero (orden sugerido)

1. Setup del proyecto (Astro + Tailwind + tokens de diseño de este documento).
2. Header + Hero con bifurcación B2C/B2B.
3. Modelo de datos `Arepa` + carga del catálogo de 13 productos.
4. Sección Catálogo B2C con filtros y carrito.
5. Landing `/negocios` (B2B) completa.
6. Nuestra Esencia + Del Maíz a la Mesa (scrollytelling).
7. Recetario + Ubicación/Formulario + Footer.
8. Chatbot, buzón de sugerencias, pulido de microinteracciones.
