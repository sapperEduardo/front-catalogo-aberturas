# AGENTS.md

## Proyecto

**Nombre:** Aberturas Sapper

## Objetivo general

Desarrollar un sitio web **responsive / mobile-first** para la empresa **Aberturas Sapper**, cuyo objetivo principal es:

* Presentar la empresa y generar confianza
* Mostrar un **catálogo online de aberturas de aluminio** con precios
* Permitir al usuario **buscar y filtrar productos fácilmente**
* Facilitar el **contacto inmediato** vía WhatsApp y correo electrónico

El sitio **no es un e‑commerce**: no hay carrito ni pagos online. El objetivo final es **la consulta comercial**.

---

## Público objetivo

* Personas que buscan aberturas de aluminio
* Mayoría de usuarios desde **teléfonos móviles**
* Usuarios no técnicos

Por lo tanto:

* Diseño simple
* Navegación clara
* Botones grandes
* Contenido directo

---

## Estructura general del sitio

El sitio se compone de **una sola página (SPA simple o multipage liviano)** con las siguientes secciones:

1. Inicio / Presentación
2. Quiénes somos
3. Productos (catálogo)
4. Contacto

La navegación debe ser simple y clara, idealmente mediante un **menú hamburguesa en mobile**.

---

## Sección: Inicio / Hero

### Objetivo

Explicar rápidamente qué hace la empresa y dirigir al usuario a una acción.

### Contenido

* Título principal:

  * "Aberturas de aluminio a medida"
* Subtítulo:

  * "Fabricación e instalación de ventanas y puertas de aluminio"
* CTA principal:

  * Botón grande: "Consultar por WhatsApp"
* Imagen representativa:

  * Aberturas / obra real

### Consideraciones de diseño

* Mobile-first
* Texto corto
* CTA visible sin hacer scroll

---

## Sección: Quiénes somos

### Objetivo

Generar confianza y credibilidad.

### Contenido sugerido

* Párrafo breve:

  * Experiencia en carpintería de aluminio
  * Trabajo a medida
  * Atención personalizada
* Beneficios destacados (con íconos):

  * Aberturas a medida
  * Materiales de calidad
  * Instalación profesional

### Consideraciones

* Texto breve
* No usar historias largas
* Diseño visual limpio

---

## Sección: Productos (Catálogo)

### Objetivo

Permitir al usuario explorar, buscar y consultar productos.

### Fuente de datos (Backend)

El catálogo se consume desde un **Google Apps Script (GAS)** que expone un endpoint HTTP GET.

⚠️ **La URL del GAS no debe estar hardcodeada en el código fuente**.
Debe ser inyectada mediante **variables de entorno del entorno de build o deploy**.

#### Variable de entorno requerida

```
CATALOG_API_URL=https://script.google.com/macros/s/{SCRIPT_ID}/exec
```

El frontend debe leer esta variable según la tecnología usada (por ejemplo, `import.meta.env`, `process.env` o equivalente) y utilizarla para realizar las solicitudes HTTP.

#### Endpoint

```
GET {CATALOG_API_URL}
```

#### Formato de respuesta

Devuelve un **array JSON** con productos activos.

Ejemplo:

```json
[
  {
    "id": 1,
    "activo": 1,
    "categoria": "ventanas",
    "nombre": "ventana lisa",
    "descripcion": "ventana rectangular lisa",
    "ancho": 1.2,
    "alto": 1,
    "color": "blanco",
    "linea": "herrero",
    "precio": 120000,
    "imagen_id": "FILE_ID",
    "imagen_thumb_id": "",
    "imagen_url": "https://drive.google.com/uc?id=FILE_ID"
  }
]
```

### Campos relevantes

| Campo            | Uso en frontend      |
| ---------------- | -------------------- |
| nombre           | Título del producto  |
| descripcion      | Texto descriptivo    |
| categoria        | Filtro               |
| linea            | Filtro               |
| precio           | Mostrar precio       |
| imagen_url       | Imagen principal     |
| imagen_thumb_url | Thumbnail (opcional) |
| ancho / alto     | Detalle técnico      |
| color            | Detalle técnico      |

---

### Vista principal del catálogo

* Grid de productos
* En mobile: **1 columna**
* Cada producto se muestra como una **card** con:

  * Imagen
  * Nombre
  * Precio
  * Botón "Ver detalles"

### Búsqueda y filtros

Filtros mínimos requeridos:

* Categoría
* Línea
* Búsqueda por nombre

Los filtros deben funcionar **del lado del frontend**, sin volver a llamar al backend.

---

### Vista detalle de producto

Al seleccionar un producto:

* Imagen grande
* Nombre
* Descripción
* Medidas (ancho / alto)
* Color
* Línea
* Precio
* CTA principal:

  * Botón: "Consultar este producto"

El botón de consulta debe abrir WhatsApp con un mensaje precargado:

```
Hola, quiero consultar por el producto: {nombre}
```

---

## Sección: Contacto

### Objetivo

Convertir visitas en consultas.

### Contenido

#### WhatsApp

* Botón visible y destacado
* Preferentemente flotante
* Siempre accesible

#### Formulario

Campos mínimos:

* Nombre
* Email o teléfono
* Mensaje

El formulario puede enviar:

* Email
* Servicio externo (Formspree, Google Forms, etc.)

---

## Consideraciones técnicas

### Frontend

* HTML semántico
* CSS moderno (Flexbox / Grid)
* JavaScript vanilla
* Mobile-first
* Carga lazy de imágenes

### Performance

* Evitar imágenes pesadas
* Usar thumbnails si existen
* No cargar todos los productos a la vez si el catálogo crece

### Accesibilidad

* Botones grandes
* Buen contraste
* Texto legible

---

## Principios de diseño

* Simpleza
* Claridad
* Enfoque en contacto
* Prioridad mobile

---

## No requerido (explícitamente fuera de alcance)

* Login
* Carrito de compras
* Pagos online
* Panel de administración propio
* Backend propio

---

## Resumen

**Aberturas Sapper** es un catálogo online liviano, rápido y orientado a conversión, con backend basado en Google Sheets + GAS y frontend simple, moderno y mobile-first.

---

## Tecnología del Frontend

### Stack elegido

* **Framework:** Astro (Static Site Generator)
* **Lenguaje:** TypeScript
* **Renderizado:** Static-first (SSG)
* **Estilos:** CSS moderno (Flexbox + Grid), mobile-first
* **Deploy:** Hosting estático (Netlify / Vercel / Cloudflare Pages)

### Justificación de Astro

* Excelente performance en mobile (HTML casi puro)
* Ideal para catálogos y sitios institucionales
* Permite consumir APIs externas en build o runtime
* Muy bajo JS enviado al cliente
* Fácil manejo de variables de entorno

---

## Variables de entorno

El frontend **NO** debe contener URLs ni datos de contacto hardcodeados.

Variables obligatorias:

```env
PUBLIC_CATALOG_API_URL=https://script.google.com/macros/s/XXXX/exec
PUBLIC_WHATSAPP_PHONE=5491112345678
PUBLIC_CONTACT_EMAIL=contacto@aberturassapper.com
```

Notas:

* En Astro, las variables accesibles desde el navegador deben comenzar con `PUBLIC_`
* El agente debe asumir que estas variables existen en todos los entornos
* Usar las utilidades del servicio `catalog.ts` para acceder a estos valores

Uso esperado:

```ts
import { getWhatsAppPhone, getContactEmail } from '@/services/catalog';

const phone = getWhatsAppPhone();
const email = getContactEmail();
```

---

## Estructura de rutas

```text
/
├── /                → Home / Quiénes somos
├── /productos       → Catálogo completo con filtros
├── /productos/[id]  → Detalle de producto
├── /contacto        → Formulario + WhatsApp
```

---

## Estructura de carpetas sugerida (Astro)

```text
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── productos/
│   │   ├── index.astro
│   │   └── [id].astro
│   └── contacto.astro
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ProductCard.astro
│   ├── ProductGrid.astro
│   ├── Filters.astro
│   └── WhatsAppButton.astro
├── services/
│   └── catalog.ts
├── styles/
│   └── global.css
```

---

## Consumo del backend (GAS)

### Endpoint

```http
GET {PUBLIC_CATALOG_API_URL}
```

### Formato de respuesta

```json
[
  {
    "id": 1,
    "activo": 1,
    "categoria": "ventanas",
    "nombre": "ventana lisa",
    "descripcion": "ventana rectangular lisa",
    "ancho": 1.2,
    "alto": 1,
    "color": "blanco",
    "linea": "herrero",
    "precio": 120000,
    "imagen_id": "...",
    "imagen_thumb_id": "...",
    "imagen_url": "https://drive.google.com/uc?id=..."
  }
]
```

---

## Estrategia de datos

* El catálogo se obtiene una vez y se mantiene en memoria
* Filtros y búsquedas se realizan **client-side**
* Solo se muestran productos con `activo === 1`

Filtros previstos:

* Categoría
* Línea
* Rango de precio
* Texto libre (nombre / descripción)

---

## Estrategia de imágenes

* `imagen_url` se usa directamente en `<img src>`
* Si existe `imagen_thumb_id`, se puede generar:

```text
https://drive.google.com/uc?id={imagen_thumb_id}
```

* Mobile-first:

  * Grid de 1 columna
  * Lazy loading
  * `object-fit: cover`

---

## Decisiones UX clave

* Menú superior simple (hamburger en mobile)
* CTA principal: "Ver productos"
* Botón flotante de WhatsApp
* Formulario de contacto simple (nombre, email, mensaje)
* Navegación clara, sin scroll infinito

---

## Comandos de desarrollo

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo (localhost:4321)
npm run build        # Build de producción
npm run preview      # Preview del build local

# Calidad de código
npm run lint         # Linting y typecheck con astro check (recomendado)
npm run typecheck    # Verificación de tipos con TypeScript
```

---

## Code Style Guidelines

### General

- **TypeScript**: Modo strict habilitado
- **Linting**: ESLint con configuración base
- **Formatting**: Prettier (2 espacios, single quotes)
- **Imports**: Usar aliases configurados (`@/*` para `src/*`)

### Convenciones de nomenclatura

| Tipo | Convention | Ejemplo |
|------|------------|---------|
| Componentes Astro | PascalCase | `Header.astro`, `ProductCard.astro` |
| Componentes React | PascalCase | `ProductGrid.tsx` |
| Funciones/utils | camelCase | `formatPrice()`, `filterProducts()` |
| Archivos CSS | kebab-case | `global.css`, `product-card.css` |
| Types/Interfaces | PascalCase con prefijo opcional | `Product`, `Category` |
| Constantes | UPPER_SNAKE_CASE | `API_URL`, `MAX_ITEMS` |
| Variables booleanas | Prefijo `is`, `has`, `should` | `isActive`, `hasError` |

### Estructura de archivos

```
src/
├── components/      # Componentes UI (Astro/React)
├── layouts/         # Layouts base
├── pages/           # Rutas del sitio
├── services/        # Lógica de negocio (API, utils)
├── styles/          # CSS global
└── types/           # TypeScript interfaces
```

### Patrones de código

#### Tipado de Props

```astro
---
interface Props {
  title: string;
  subtitle?: string;
  isActive?: boolean;
}

const { title, subtitle = '', isActive = false } = Astro.props;
---
```

#### Tipado de funciones

```typescript
// ✅ Correcto - tipado explícito
function formatPrice(price: number, currency: string = 'ARS'): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(price);
}

// ❌ Evitar - any implícito
function formatPrice(price: any) { ... }
```

#### Manejo de errores en API

```typescript
async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.filter((p: Product) => p.activo === 1);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
```

#### Imágenes

```astro
<img 
  src={product.imagen_url} 
  alt={product.nombre}
  loading="lazy"
  decoding="async"
  width="400"
  height="300"
/>
```

### CSS Guidelines

- Mobile-first: usar `@media (min-width: ...)`
- Preferir CSS custom properties para colores/tamaños
- Evitar `!important`
- Usar `rem` para tamaños de fuente
- `object-fit: cover` para imágenes

### Import order (auto-ordenado por ESLint)

```typescript
// 1. Imports externos (React, etc)
// import { useState } from 'react';

// 2. Aliases internos (@/...)
// import { ProductCard } from '@/components';

// 3. relative imports
// import { formatPrice } from '../utils';

// 4. Tipos (si están en archivos separados)
// import type { Product } from '@/types';
```

### Reglas de decisión

- **Lógica cliente**: solo en archivos `.ts` / `.tsx` (no en `.astro`)
- **Datos del backend**: siempre tipados con interfaces
- **Valores sensibles**: nunca hardcodear, usar variables de entorno
- **Errores**: nunca revelar información sensible en mensajes de error

---

## Objetivo final

Construir un sitio institucional y catálogo de productos para **Aberturas Sapper**, rápido, simple y optimizado para móviles, consumiendo un backend basado en Google Apps Script mediante variables de entorno, sin dependencias innecesarias ni lógica compleja en el cliente.
