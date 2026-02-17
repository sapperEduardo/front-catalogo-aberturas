export interface Product {
  id: number;
  activo: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  'ancho '?: number;
  ancho?: number;
  alto: number;
  color: string;
  linea: string;
  precio: number;
  imagen_id: string;
  imagen_thumb_id: string;
  imagen_url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Line {
  id: string;
  name: string;
}

export interface FilterState {
  category: string;
  line: string;
  search: string;
  minPrice?: number;
  maxPrice?: number;
}
