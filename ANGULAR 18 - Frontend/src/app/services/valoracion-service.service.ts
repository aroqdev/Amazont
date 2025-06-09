import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Valoracion } from '../interface/valoracion.interface';
import { Producto } from '../interface/producto.interface';
import { User } from '../interface/user.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  user: User[] = [];
  producto: Producto[] = [];
  valoracion: Valoracion[]= [];

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //CREAR VALORACION
  crearValoracion(prod_id: number, user_id: number, puntuacion: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/review/Create`, { prod_id: prod_id, user_id: user_id, puntuacion: puntuacion }, {headers: this.getAuthHeaders()});
  }

  //ACTUALIZAR VALORACION
  actualizarValoracion(id: number, puntuacion: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/review/Update/${id}`, { puntuacion: puntuacion}, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR VALORACION
  eliminarValoracion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/review/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //VALORACION POR PRODUCTO
  ValoracionPorProducto(prod_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review/ForProduct/${prod_id}`);
  }

  //VALORACION POR USUARIO
  ValoracionPorUsuario(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review/ForUser/${user_id}`);
  }

  // MEDIA DE VALORACION POR PRODUCTO
  promedioPuntuacionProducto(prod_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review/Average/${prod_id}`);
  }
}
