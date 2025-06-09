import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import { Producto } from '../interface/producto.interface';
import { Carrito } from '../interface/carrito.interface';
import { Compra } from '../interface/compra.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  user: User[] = [];
  producto: Producto[] = [];
  carrito: Carrito[]= [];
  compra: Compra[]= [];

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //VER MI CARRITO
  mostrarCart(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/My/${id}`, {headers: this.getAuthHeaders()});
  }

  //CREAR CARRITO
  agregarCart(user_id: number, prod_id: number, cantidad: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart/Add`, { user_id: user_id, prod_id: prod_id, cantidad: cantidad }, {headers: this.getAuthHeaders()});
  }

  aumentarCantidad(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cart/increase/${id}`, {}, {headers: this.getAuthHeaders()});
  }

  disminuirCantidad(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cart/decrease/${id}`, {}, {headers: this.getAuthHeaders()});
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //TOTAL DE MI CARRITO
  totalCart(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/Total/${user_id}`, {headers: this.getAuthHeaders()});
  }

  //COMFIRMAR COMPRA DE CARRITO
  confirmarCompra(user_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart/Confirm/${user_id}`, {}, {headers: this.getAuthHeaders()});
  }
}
