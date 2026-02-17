import type { Product, FilterState, Category, Line } from '@/types';

const API_URL = import.meta.env.PUBLIC_CATALOG_API_URL;

export function getWhatsAppPhone(): string {
  return import.meta.env.PUBLIC_WHATSAPP_PHONE || '5491112345678';
}

export function getContactEmail(): string {
  return import.meta.env.PUBLIC_CONTACT_EMAIL || 'contacto@aberturassapper.com';
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data.filter((p) => p.activo === 1);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.category && filters.category !== 'all' && product.categoria !== filters.category) {
      return false;
    }

    if (filters.line && filters.line !== 'all' && product.linea !== filters.line) {
      return false;
    }

    if (filters.minPrice !== undefined && product.precio < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && product.precio > filters.maxPrice) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = product.nombre.toLowerCase().includes(searchLower);
      const matchesDescription = product.descripcion?.toLowerCase().includes(searchLower);
      const matchesAncho = String(product.ancho).toLowerCase().includes(searchLower);
      const matchesAlto = String(product.alto).toLowerCase().includes(searchLower);
      if (!matchesName && !matchesDescription && !matchesAncho && !matchesAlto) {
        return false;
      }
    }

    return true;
  });
}

export function getCategories(products: Product[]): Category[] {
  const categories = new Set(products.map((p) => p.categoria));
  return Array.from(categories)
    .filter(Boolean)
    .sort()
    .map((c) => ({ id: c, name: c.charAt(0).toUpperCase() + c.slice(1) }));
}

export function getLines(products: Product[]): Line[] {
  const lines = new Set(products.map((p) => p.linea));
  return Array.from(lines)
    .filter(Boolean)
    .sort()
    .map((l) => ({ id: l, name: l.charAt(0).toUpperCase() + l.slice(1) }));
}

export function getProductById(products: Product[], id: string): Product | undefined {
  const numericId = parseInt(id, 10);
  return products.find((p) => p.id === numericId);
}

export function formatPrice(price: number, currency = 'ARS'): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMeasure(value: number | undefined): string {
  if (value === undefined || value === null) return '-';
  return `${value}m`;
}

export function generateWhatsAppMessage(productName: string): string {
  return `Hola, quiero consultar por el producto: ${productName}`;
}
