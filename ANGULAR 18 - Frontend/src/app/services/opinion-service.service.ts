import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto.interface';
import { User } from '../interface/user.interface';
import { Opinion } from '../interface/opinon.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  user: User[] = [];
  producto: Producto[] = [];
  opinion: Opinion[]= [];

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //CREAR OPINION
  crearOpinion(prod_id: number, user_id: number, comentario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/opinion/Create`, { prod_id: prod_id, user_id: user_id, comentario: comentario }, {headers: this.getAuthHeaders()});
  }

  //ACTUALIZAR OPINION
  actualizarOpinion(id: number, comentario: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/opinion/Update/${id}`, { comentario: comentario}, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR OPINION
  eliminarOpinion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/opinion/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //OPINION POR PRODUCTO
  OpinionPorProducto(prod_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/opinion/ForProduct/${prod_id}`);
  }

  //OPINION POR USUARIO
  OpinionPorUsuario(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/opinion/ForUser/${user_id}`);
  }
}
