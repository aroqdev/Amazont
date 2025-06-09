import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { correoNoExisteValidator } from '../validators/validarCorreo-validator';
import { UserService } from '../services/user-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recover-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './recover-pwd.component.html',
  styleUrl: './recover-pwd.component.css'
})
export class RecoverPwdComponent {
  validarCorreo: FormGroup;
  validarContrasena: FormGroup;
  correo: FormControl;
  contrasena: FormControl;
  repetirContrasena: FormControl;

  correoS: string = '';
  codigo: string | null = null;
  contrasenaS: string = '';
  repetirContrasenaS: string = '';
  correoVerificado: boolean = false;
  codigoVerificado: boolean = false;
  coincidenContrasenas: boolean = false;
  contrasenaCambiada: boolean = false;
  mensajeError: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoNoExisteValidator(this.userService)]);
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.repetirContrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);

    this.validarCorreo = new FormGroup({
      correo: this.correo
    });

    this.validarContrasena = new FormGroup({
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena
    });
  }

  enviarCorreo(){
    this.userService.enviarCodigo(this.validarCorreo.value.correo).subscribe({
      next: (data) => {
        console.log(data)
        this.correoVerificado = true;
      },
      error: (err) => {
        console.error('Error al enviar el codigo', err);
      }
    });
  }

  verificarCodigo(codigo: string | null){
    this.userService.verificarCodigo(this.correoS, codigo).subscribe({
      next: (data) => {
        console.log(data)
        this.codigo = codigo;
        this.codigoVerificado = true;
        this.mensajeError = '';
      },
      error: (err) => {
        if (err.status === 400) { // Código de error del backend
          console.error('El código de recuperación es inválido. Verifica e intenta nuevamente.');
          this.mensajeError = 'El código de recuperación es inválido. Verifica e intenta nuevamente.';
        }
        console.error('Error al verificar el codigo', err);
      }
    });
  }

  coincidirContrasena() {
    if (this.contrasenaS === this.repetirContrasenaS) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  verificarContrasena(){
    this.userService.verificarContrasena(this.correoS, this.validarContrasena.value.contrasena).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeError = '';
        this.userService.cambiarContrasena(this.correoS, this.validarContrasena.value.contrasena).subscribe({
          next: (data) => {
            console.log(data);
            this.contrasenaCambiada = true;
            this.mensajeError = '';
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña');
            this.mensajeError = 'Error al cambiar la contraseña';
          }
        });
      },
      error: (err) => {
        console.error('La nueva contraseña no puede ser igual a la actual');
        this.mensajeError = 'La nueva contraseña no puede ser igual a la actual';
      }
    });
  }
}
