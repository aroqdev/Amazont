export interface Producto {
  id: number;
  nombre: string;
  oferta: boolean;
  imagen: string;
  descripcion: string;
  precio: number;
  precioAnterior: number;
  cantidad: number;
  cat_id: number;
  user_id: number;
}
