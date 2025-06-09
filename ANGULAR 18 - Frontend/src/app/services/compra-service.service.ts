import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../interface/compra.interface';
import { Carrito } from '../interface/carrito.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://127.0.0.1:8000/api';
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

  //MIS COMPRAS
  mostrarCompra(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shop/Buy/${user_id}`, {headers: this.getAuthHeaders()});
  }

  //MIS VENTAS
  mostrarVentas(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shop/Sell/${user_id}`, {headers: this.getAuthHeaders()});
  }

  //TOTAL DE COMPRAS
  totalCompra(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shop/TotalBuy/${user_id}`, {headers: this.getAuthHeaders()});
  }

  //TOTAL DE VENTAS
  totalVenta(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shop/TotalSell/${user_id}`, {headers: this.getAuthHeaders()});
  }
}
