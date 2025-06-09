import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../interface/categoria.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  categoria: Categoria[] = [];

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //VER TODOS LAS CATEGORIAS
  mostrarCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/All`);
  }

  //VER UNA SOLA CATEGORIAS
  mostrarUnSoloCategory(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/category/Only/${id}`);
  }

  //CREAR CATEGORIA
  crearCategory(nombre: string, imagen: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/category/Create`, { nombre: nombre, imagen: imagen }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR CATEGORIA
  modificarCategory(id: number, nombre: string, imagen: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/category/Modify/${id}`, { nombre: nombre, imagen: imagen }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR CAMPOS DE CATEGORIA
  modificarCampoCategory(id: number, nombre: string, imagen: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/category/ModifyCamp/${id}`, { nombre: nombre, imagen: imagen }, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR CATEGORIA
  eliminarCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/category/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  obtenerNombreCategoria(categoriaId: number): string {
    const categoria = this.categoria.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  }
}
