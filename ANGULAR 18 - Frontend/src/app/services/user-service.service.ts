import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  user: User[] = [];

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //VER TODOS LOS USUARIOS
  mostrarUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/All`);
  }

  //VER UN SOLO USUARIO
  mostrarUnSoloUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/Only/${id}`);
  }

  //LOGIN, REGISTRO, RECUPERAR CONTRASEÑA
  verificarCorreo(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/VerifyEmail`, { email: email });
  }

  //LOGIN
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Login`, { email, password });
  }

  //REGISTER
  registerUser(name: string, email: string, password: string, rol: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Create`, { name, email, password, rol });
  }

  //RECUPERAR CONTRASEÑA
  enviarCodigo(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/SendCode`, { email: email });
  }
  verificarCodigo(email: string, code: string | null): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/VerifyCode`, { email: email, code: code } );
  }
  verificarContrasena(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/VerifyPassword`, { email: email, password: password });
  }
  cambiarContrasena(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/ChangePassword`, { email: email, password: password });
  }

  //MODIFICAR USUARIO
  modificarUser(id: number, name: string, email: string, password: string, rol: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/Modify/${id}`, { name: name, email: email, password: password, rol: rol});
  }

  // MODIFICAR CAMPOS DE USUARIO
  modificarCampoUser(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/user/ModifyCamp/${id}`, body);
  }

  //ELIMINAR USUARIO
  eliminarUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/Delete/${id}`);
  }

  //CERRAR SESION
  Logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Logout`, {}, {headers: this.getAuthHeaders()});
  }
}
