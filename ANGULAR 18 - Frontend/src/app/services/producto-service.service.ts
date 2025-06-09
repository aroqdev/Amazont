import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto.interface';
import { Categoria } from '../interface/categoria.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  categoria: Categoria[] = [];
  producto: Producto[] = [];

  constructor(private localService: LocalService, private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //VER TODOS LOS PRODUCTOS
  mostrarProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/All`);
  }

  //VER UN SOLO PRODUCTO
  mostrarUnSoloProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/Only/${id}`);
  }

  //CREAR PRODUCTO
  crearProduct(nombre: string, oferta: boolean, imagen: string, descripcion: string, precio: number, precioAnterior: number, cantidad: number, cat_id: number, user_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/Create`, { nombre: nombre, oferta: oferta, imagen: imagen, descripcion: descripcion, precio: precio, precioAnterior: precioAnterior, cantidad: cantidad, cat_id: cat_id, user_id: user_id }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR PRODUCTO
  modificarProduct(id: number, nombre: string, oferta: boolean, imagen: string, descripcion: string, precio: number, precioAnterior: number, cantidad: number, cat_id: number, user_id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/Modify/${id}`, { nombre: nombre, oferta: oferta, imagen: imagen, descripcion: descripcion, precio: precio, precioAnterior: precioAnterior, cantidad: cantidad, cat_id: cat_id, user_id: user_id }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR CAMPOS DE PRODUCTO
  modificarCampoProduct(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/product/ModifyCamp/${id}`, body, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR PRODUCTO
  eliminarProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //PRODUCTO POR CATEGORIA
  productPorCategoria(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/ProdForCat`);
  }

  //PRODUCTO EN OFERTA
  productPorOferta(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/ProdSale`);
  }

  //PRODUCTO SIN OFERTA
  productSinOferta(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/ProdNotSale`);
  }

  //PRODUCTO POR UNA CATEGORIA
  productPorUnaCategoria(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/ProdForOnlyCat/${id}`);
  }

  //PRODUCTOS DE UN VENDEDOR
  miProduct(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/My/${user_id}`, {headers: this.getAuthHeaders()});
  }
}
