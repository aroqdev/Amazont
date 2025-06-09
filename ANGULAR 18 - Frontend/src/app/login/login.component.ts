import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { correoNoExisteValidator } from '../validators/validarCorreo-validator';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service.service';
import { LocalService } from '../services/local.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: FormGroup;
  correo: FormControl;
  contrasena: FormControl;

  mensajeEstado: string = '';

  constructor(private userService: UserService, private localService: LocalService, private router: Router) {
    this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoNoExisteValidator(this.userService)]);
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]);

    this.login = new FormGroup({
      correo: this.correo,
      contrasena: this.contrasena,
    });
  }

  loginUser() {
    this.userService.loginUser(this.login.value.correo, this.login.value.contrasena).subscribe({
      next: (data) => {
        console.log(data);
        this.localService.user = data.user;
        localStorage.setItem('authToken', data.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al iniciar sesion', err);
        this.mensajeEstado = 'Error al iniciar sesion';
      }
    });
  }
}
