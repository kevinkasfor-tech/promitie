/* ============================================================
   PROMITIE — Animaciones GSAP + ScrollTrigger + SVG
   (respeta prefers-reduced-motion y adapta a móvil)
   ============================================================ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const isDesktop = matchMedia('(min-width: 992px)').matches;

  /* ---------- Hero: entrada cinematográfica ---------- */
  const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tlHero
    .from('.hero-content .handwritten', { opacity: 0, y: -30, duration: 1 })
    .from('.hero-content h1', { opacity: 0, y: 50, duration: 1.1 }, '-=0.6')
    .from('.hero-content p', { opacity: 0, y: 30, duration: 1 }, '-=0.7')
    .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.9 }, '-=0.6')
    .from('.scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.3');

  // Punto del indicador de scroll flotando
  gsap.to('.scroll-hint-dot', {
    y: 12,
    repeat: -1,
    yoyo: true,
    duration: 0.9,
    ease: 'power1.inOut',
  });

  /* ---------- Parallax del video de fondo del hero ---------- */
  if (isDesktop) {
    gsap.to('.hero-video-bg', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to('.hero-content', {
      yPercent: -12,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom 30%',
        scrub: true,
      },
    });
  }

  /* ---------- Reveal genérico ([data-reveal]) ---------- */
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 44,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });

  /* ---------- Línea SVG del proceso (dibujo con scrub) ---------- */
  const path = document.getElementById('process-path') as SVGPathElement | null;
  if (path) {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-track',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    });
  }

  // Escala suave de las imágenes del proceso al entrar en viewport
  gsap.utils.toArray<HTMLElement>('.step-img-wrapper img').forEach(img => {
    gsap.fromTo(img, { scale: 1.15 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: img, start: 'top 90%', end: 'top 40%', scrub: true },
    });
  });

  /* ---------- Reseñas: entrada escalonada ---------- */
  gsap.from('.review-card', {
    scrollTrigger: { trigger: '.reviews-grid', start: 'top 85%' },
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
  });

  /* ---------- Micro-parallax en tarjetas de esencia (solo desktop) ---------- */
  if (isDesktop) {
    document.querySelectorAll<HTMLElement>('.essence-card, .recipe-card, .review-card').forEach(card => {
      card.addEventListener('mouseenter', () =>
        gsap.to(card, { y: -6, boxShadow: 'var(--shadow-strong)', duration: 0.3, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () =>
        gsap.to(card, { y: 0, boxShadow: 'var(--shadow-warm)', duration: 0.35, ease: 'power2.out' }));
    });
  }

  // Refresca triggers cuando todo (videos/imágenes) termina de cargar
  window.addEventListener('load', () => ScrollTrigger.refresh());
});
