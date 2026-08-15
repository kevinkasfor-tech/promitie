---
name: promitie-project-guidelines
description: Directivas y habilidades para la creación, modificación y ajuste del proyecto PROMITIE.
---

# 🚀 Directivas del Proyecto PROMITIE

Este archivo define las habilidades, reglas y mejores prácticas para el desarrollo del proyecto **PROMITIE**. Cualquier agente que trabaje en este espacio de trabajo debe seguir estas directivas y hacer uso de las skills globales provistas.

## 🎯 Habilidades Globales Disponibles

El sistema cuenta con un catálogo de 42 skills instaladas localmente en `C:\Users\kevin\.gemini\antigravity\playground\skills\`. A continuación se detallan las principales agrupaciones que debes incorporar según las necesidades del proyecto:

### 1. Animaciones Profesionales con GSAP
- **/gsap-core**: Para animaciones de interpolación simples y avanzadas (`gsap.to`, `gsap.from`, `gsap.fromTo`).
- **/gsap-timeline**: Para secuenciación e hilvanación de múltiples animaciones.
- **/gsap-scrolltrigger**: Para animaciones y efectos interactivos controlados por el desplazamiento de la página.
- **/gsap-react**: Para uso óptimo de animaciones dentro del hook `useGSAP` en entornos React.

### 2. Sensibilidad de Diseño & UI/UX (Taste Skills)
- **/high-end-visual-design**: Diseños sofisticados, premium y de alta gama visual.
- **/brandkit**: Consistencia de marca y paleta cromática profesional.
- **/design-taste-frontend**: Interfaces web sensibles al diseño estético moderno.
- **/minimalist-ui** o **/industrial-brutalist-ui**: Para enfoques estilísticos específicos.

### 3. Generación y Manejo de Video/Media
- **/hyperframes**: Manipulación avanzada de video y animación.
- **/music-to-video** y **/website-to-video**: Integración y conversión de formatos de media.

---

## 🎨 Activos Locales del Proyecto

El espacio de trabajo actual cuenta con los siguientes recursos estáticos iniciales que debes utilizar en la interfaz:
- **Logo del Proyecto:** `LOGO.png` ([ver logo](file:///c:/Users/kevin/.gemini/antigravity/playground/PROMITIE/LOGO.png))
- **Imágenes de Referencia:**
  - `imagen 1.png` ([ver imagen 1](file:///c:/Users/kevin/.gemini/antigravity/playground/PROMITIE/imagen%201.png))
  - `imagen 2.png` ([ver imagen 2](file:///c:/Users/kevin/.gemini/antigravity/playground/PROMITIE/imagen%202.png))
- **Video del Proyecto:** `promi.webm` ([ver video](file:///c:/Users/kevin/.gemini/antigravity/playground/PROMITIE/promi.webm))

---

## 🛠️ Reglas para la Creación y Modificación de Código

Al crear o modificar código en **PROMITIE**, sigue estrictamente estos lineamientos:

1. **Estilo y Estética Premium:**
   - Evita colores planos y genéricos. Utiliza paletas en HSL o variables CSS bien estructuradas.
   - Aplica efectos de glassmorphism, gradientes suaves y micro-animaciones en estados hover.
   - Utiliza tipografías modernas (ej. Inter, Outfit, Roboto) cargadas de forma óptima.

2. **Estructura del Proyecto:**
   - Si creas una aplicación web SPA, utiliza la estructura de componentes modular.
   - Si usas GSAP, registra siempre los plugins correspondientes y realiza la limpieza adecuada en el desmontaje (especialmente en React/useGSAP).

3. **SEO y Semántica:**
   - Usa etiquetas semánticas de HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).
   - Utiliza un único `<h1>` por página y mantén una jerarquía clara de títulos.
   - Configura metaetiquetas descriptivas.

4. **Interactividad:**
   - Los elementos interactivos deben contar con identificadores únicos (`id`) consistentes.
   - Asegura la adaptabilidad en dispositivos móviles y de escritorio (Responsive Web Design).
