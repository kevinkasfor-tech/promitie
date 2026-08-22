// Catálogo de productos Promitie (fuente única de verdad)
export interface Producto {
  id: string;
  nombre: string;
  origen: string;
  descripcionB2C: string;
  descripcionB2B: string;
  unidades: number;
  precio: number;
  categoria: 'clasicas' | 'saludables' | 'queso' | 'tradicionales';
  sku: string;
  caja: string;
  vidaUtil: string;
  alergenos: string;
  preparacion: string;
  beneficios: string[];
  ocasiones: string[]; // usado por el chatbot recomendador
}

// Pool de imágenes compartido — rotan en todos los productos del carrusel
export const IMAGE_POOL: string[] = [
  '/imagen%201.png',
  '/imagen%202.png',
  '/arepas.webp',
  '/promitie.webp',
  '/289cfb4d-62d7-4dbb-90a7-319e73f5c6a8.webp',
  '/32168c57-017b-4451-bcfa-85c8ab89449e.jpg',
  '/47facfb4-56ee-483c-a5c4-af8f284ca364.webp',
  '/5c43ee79-d05a-432d-836b-acbbb6e1a29c.webp',
  '/aee02a5b-b62a-4768-8def-d5f829d1a13c.webp',
  '/f61b1bb8-5c9e-4a33-a12b-e595d87902cc%20(1).webp',
];

const BENEFICIOS: Record<Producto['categoria'], string[]> = {
  clasicas: ['Fuente de energía natural', 'Ideal para una dieta equilibrada', 'Sin conservantes artificiales'],
  saludables: ['Alto contenido en fibra', 'Aporta minerales esenciales', 'Ayuda a la digestión'],
  queso: ['Aporte de calcio y proteínas', 'Sabor reconfortante', 'Elaborado con queso campesino fresco'],
  tradicionales: ['Sabor rústico tradicional', 'Fuente de energía natural', 'Maíz pelado 100% natural'],
};

type ProductoBase = Omit<Producto, 'beneficios'> & { beneficios?: string[] };

const BASE: ProductoBase[] = [
  {
    id: 'paisa-grande',
    nombre: 'Arepas Paisa Grande',
    origen: 'Región Paisa',
    descripcionB2C: 'La tradicional arepa blanca y delgada, ideal para acompañar con mantequilla y sal o asar al carbón.',
    descripcionB2B: 'Excelente margen de ganancia para desayunaderos y restaurantes tradicionales.',
    unidades: 5, precio: 4500, categoria: 'clasicas', sku: 'PR-PAI-G5',
    caja: '40 paquetes', vidaUtil: '15 días en refrigeración', alergenos: 'Ninguno',
    preparacion: 'Asar a la plancha por 3-5 minutos de cada lado.',
    ocasiones: ['desayuno', 'asado', 'negocio'],
  },
  {
    id: 'paisa-taco',
    nombre: 'Arepas Paisa Taco',
    origen: 'Región Paisa',
    descripcionB2C: 'Formato práctico y redondo de grosor medio, perfecto para el desayuno de toda la familia.',
    descripcionB2B: 'Ideal para emparedados de arepa y combos de desayuno en cafeterías.',
    unidades: 10, precio: 6200, categoria: 'clasicas', sku: 'PR-PAI-T10',
    caja: '30 paquetes', vidaUtil: '15 días en refrigeración', alergenos: 'Ninguno',
    preparacion: 'Plancha o tostadora.',
    ocasiones: ['desayuno', 'negocio'],
  },
  {
    id: 'paisa-bola',
    nombre: 'Arepas Paisa Bola',
    origen: 'Región Paisa',
    descripcionB2C: 'Arepa tradicional gruesa para rellenar de queso, mantequilla, carne desmechada o chicharrón.',
    descripcionB2B: 'Excelente retención de calor para entregas a domicilio.',
    unidades: 20, precio: 9500, categoria: 'clasicas', sku: 'PR-PAI-B20',
    caja: '15 paquetes', vidaUtil: '12 días en refrigeración', alergenos: 'Ninguno',
    preparacion: 'Abrir a la mitad, asar y rellenar al gusto.',
    ocasiones: ['desayuno', 'asado', 'evento'],
  },
  {
    id: 'peto-multigranos',
    nombre: 'Arepas de Maíz Peto con Multigranos',
    origen: 'Fórmula Exclusiva',
    descripcionB2C: 'Elaborada con maíz peto y una mezcla premium de granos para un desayuno nutritivo y cargado de fibra.',
    descripcionB2B: 'Línea saludable de alta demanda para cafeterías y markets especializados.',
    unidades: 5, precio: 5800, categoria: 'saludables', sku: 'PR-PET-M5',
    caja: '25 paquetes', vidaUtil: '15 días', alergenos: 'Puede contener trazas de gluten',
    preparacion: 'Plancha con un toque de aceite de oliva.',
    ocasiones: ['fit', 'desayuno'],
  },
  {
    id: 'peto-chia',
    nombre: 'Arepas de Maíz Peto con Chía',
    origen: 'Fórmula Exclusiva',
    descripcionB2C: 'Deliciosas y ligeras arepas con semillas de chía seleccionadas que aportan Omega 3 a tu mañana.',
    descripcionB2B: 'Presentación ideal para menús saludables B2B en hoteles.',
    unidades: 5, precio: 5800, categoria: 'saludables', sku: 'PR-PET-C5',
    caja: '25 paquetes', vidaUtil: '15 días', alergenos: 'Ninguno',
    preparacion: 'Plancha 4 minutos por lado.',
    ocasiones: ['fit', 'desayuno'],
  },
  {
    id: 'peto-ajonjoli',
    nombre: 'Arepas de Maíz Peto con Ajonjolí y Linaza',
    origen: 'Fórmula Exclusiva',
    descripcionB2C: 'Combinación perfecta de semillas tostadas que le dan un toque crujiente y aromático único.',
    descripcionB2B: 'Sabor gourmet para restaurantes que buscan diferenciarse.',
    unidades: 5, precio: 5800, categoria: 'saludables', sku: 'PR-PET-AL5',
    caja: '25 paquetes', vidaUtil: '15 días', alergenos: 'Ajonjolí',
    preparacion: 'Dorar sin aceite a fuego medio.',
    ocasiones: ['fit', 'evento'],
  },
  {
    id: 'peto-quinoa',
    nombre: 'Arepas de Maíz Peto con Quinoa',
    origen: 'Fórmula Exclusiva',
    descripcionB2C: 'Súper alimento andino incorporado a nuestra masa tradicional de maíz peto 100% colombiano.',
    descripcionB2B: 'Gran tracción en la categoría Fit de mercados y restaurantes saludables.',
    unidades: 5, precio: 6000, categoria: 'saludables', sku: 'PR-PET-Q5',
    caja: '25 paquetes', vidaUtil: '15 días', alergenos: 'Ninguno',
    preparacion: 'Asar a fuego medio-alto.',
    ocasiones: ['fit', 'desayuno'],
  },
  {
    id: 'queso-dulce',
    nombre: 'Arepas Rellenas de Queso Dulces',
    origen: 'Región Andina',
    descripcionB2C: 'Masa de maíz dulce con una generosa porción de queso derretido en su interior. Una delicia irresistible.',
    descripcionB2B: 'Producto estrella para meriendas y postres en restaurantes.',
    unidades: 5, precio: 7800, categoria: 'queso', sku: 'PR-QUE-D5',
    caja: '20 paquetes', vidaUtil: '10 días en refrigeración', alergenos: 'Lácteos',
    preparacion: 'Asar lentamente a fuego bajo para derretir el queso interior.',
    ocasiones: ['merienda', 'evento'],
  },
  {
    id: 'queso-pequena',
    nombre: 'Arepas Rellenas de Queso Pequeña',
    origen: 'Región Andina',
    descripcionB2C: 'Formato cocktail para pasabocas, reuniones familiares o meriendas rápidas de los niños.',
    descripcionB2B: 'Perfectas para catering, eventos y picadas en bares o restaurantes.',
    unidades: 10, precio: 6900, categoria: 'queso', sku: 'PR-QUE-P10',
    caja: '25 paquetes', vidaUtil: '10 días en refrigeración', alergenos: 'Lácteos',
    preparacion: 'Plancha o freidora de aire.',
    ocasiones: ['evento', 'merienda', 'negocio'],
  },
  {
    id: 'amasadas-queso',
    nombre: 'Arepas Amasadas con Queso',
    origen: 'Región Boyacense',
    descripcionB2C: 'Queso campesino incorporado directamente en la masa desde el primer momento. Sabor tradicional y auténtico.',
    descripcionB2B: 'El sabor artesanal que tus clientes leales agradecerán.',
    unidades: 5, precio: 7200, categoria: 'queso', sku: 'PR-AMA-Q5',
    caja: '20 paquetes', vidaUtil: '12 días en refrigeración', alergenos: 'Lácteos',
    preparacion: 'Asar a fuego medio con un poco de mantequilla.',
    ocasiones: ['desayuno', 'merienda'],
  },
  {
    id: 'rellenas-queso',
    nombre: 'Arepas Rellenas de Queso',
    origen: 'Región Central',
    descripcionB2C: 'Nuestra arepa clásica con un corazón abundante de queso que se estira al primer mordisco.',
    descripcionB2B: 'Máximo rendimiento y estandarización para tu línea de menús.',
    unidades: 5, precio: 8200, categoria: 'queso', sku: 'PR-REL-Q5',
    caja: '20 paquetes', vidaUtil: '10 días en refrigeración', alergenos: 'Lácteos',
    preparacion: 'Asar a fuego lento tapadas para óptimo derretido.',
    ocasiones: ['merienda', 'evento', 'negocio'],
  },
  {
    id: 'maiz-pelado',
    nombre: 'Arepas de Maíz Pelado',
    origen: 'Región Santandereana',
    descripcionB2C: 'Elaborada con maíz trillado y cocido tradicionalmente, ofreciendo un sabor rústico e incomparable.',
    descripcionB2B: 'El toque campestre perfecto para tu oferta de carnes o desayunos criollos.',
    unidades: 5, precio: 5200, categoria: 'tradicionales', sku: 'PR-PEL-T5',
    caja: '25 paquetes', vidaUtil: '12 días', alergenos: 'Ninguno',
    preparacion: 'Plancha o brasa.',
    ocasiones: ['asado', 'desayuno'],
  },
  {
    id: 'pelado-quinoa',
    nombre: 'Arepas de Maíz Pelado con Quinoa y Ajonjolí',
    origen: 'Región Santandereana Fit',
    descripcionB2C: 'La rusticidad del maíz pelado potenciada con el valor nutricional de la quinoa y el aroma del ajonjolí.',
    descripcionB2B: 'Propuesta gourmet para clientes exigentes en el segmento HORECA.',
    unidades: 5, precio: 6500, categoria: 'tradicionales', sku: 'PR-PEL-QA5',
    caja: '25 paquetes', vidaUtil: '12 días', alergenos: 'Ajonjolí',
    preparacion: 'Dorar a la plancha a fuego medio.',
    ocasiones: ['fit', 'asado'],
  },
  {
    id: 'pelado-queso',
    nombre: 'Arepas de Maíz Pelado Rellenas de Queso',
    origen: 'Región Santandereana',
    descripcionB2C: 'Maíz pelado tradicional relleno con una generosa porción de queso que se funde al asarlo. Combina la fácil digestión del maíz pelado con la proteína y el calcio del queso.',
    descripcionB2B: 'Diferenciador premium de maíz pelado y queso para desayunaderos y menús criollos.',
    unidades: 5, precio: 6500, categoria: 'tradicionales', sku: 'PR-PEL-RQ5',
    caja: '25 paquetes', vidaUtil: '12 días', alergenos: 'Lácteos',
    preparacion: 'Asar a fuego lento tapadas para un óptimo derretido del queso.',
    beneficios: [
      'Combina la fácil digestión del maíz pelado con la proteína y calcio del queso',
      'Maíz pelado 100% natural',
      'Queso campesino fresco que se funde al asarla',
    ],
    ocasiones: ['desayuno', 'merienda'],
  },
];

export const PRODUCTOS: Producto[] = BASE.map(p => ({ ...p, beneficios: p.beneficios ?? BENEFICIOS[p.categoria] }));

// imagenDe mantiene compatibilidad con carrito, modal y chatbot
export const imagenDe = (_p: Pick<Producto, 'categoria'>) => IMAGE_POOL[0];

export const COP = (n: number) => `$${n.toLocaleString('es-CO')} Cop`;

export const WHATSAPP_NUMERO = '573000000000'; // TODO: reemplazar por el número real
