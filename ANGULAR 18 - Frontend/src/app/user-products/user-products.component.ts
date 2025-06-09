import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { LocalService } from '../services/local.service';
import { User } from '../interface/user.interface';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent {
  cambiarContrasena: FormGroup;
  contrasenaActual: FormControl;
  contrasenaNueva: FormControl;
  contrasenaRepetir: FormControl;

  mensajeEstado: string = '';
  coincidenContrasenas: boolean = false;
  user: User | null = null;

  constructor(private userService: UserService, private localService: LocalService) {
    this.contrasenaActual = new FormControl('', [Validators.required]);
    this.contrasenaNueva = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.contrasenaRepetir = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);

    this.cambiarContrasena = new FormGroup({
      contrasenaActual: this.contrasenaActual,
      contrasenaNueva: this.contrasenaNueva,
      contrasenaRepetir: this.contrasenaRepetir
    });
  }

  ngOnInit(): void {
    this.user = this.localService.user;
  }

  coincideContrasena() {
    if (this.cambiarContrasena.value.contrasenaNueva === this.cambiarContrasena.value.contrasenaRepetir) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  verificarContrasena() {
    this.userService.verificarContrasena(this.user!.email, this.cambiarContrasena.value.contrasenaNueva).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = '';
        this.userService.cambiarContrasena(this.user!.email, this.cambiarContrasena.value.contrasenaNueva).subscribe({
          next: (data) => {
            console.log(data);
            this.mensajeEstado = 'Contraseña actualizada correctamente';
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña');
            this.mensajeEstado = 'Error al cambiar la contraseña';
          }
        });
      },
      error: (err) => {
        console.error('La nueva contraseña no puede ser igual a la actual');
        this.mensajeEstado = 'La nueva contraseña no puede ser igual a la actual';
      }
    });
  }
}
