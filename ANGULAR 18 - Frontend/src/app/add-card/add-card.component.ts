import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { UserService } from '../services/user-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css'
})
export class AddCardComponent {
  tarjeta: FormGroup;
  nombre: FormControl;
  numero: FormControl;
  vencimiento: FormControl;
  codigo: FormControl;

  constructor(private router: Router, private localService: LocalService, private userService: UserService) {
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.numero = new FormControl('', [Validators.required, Validators.maxLength(16)]);
    this.vencimiento = new FormControl('', [Validators.required]);
    this.codigo = new FormControl('', [Validators.required, Validators.maxLength(3)]);

    this.tarjeta = new FormGroup({
      nombre: this.nombre,
      numero: this.numero,
      vencimiento: this.vencimiento,
      codigo: this.codigo
    });
  }

  guardar() {
    const body: any = {}; // Objeto dinámico

    if (this.tarjeta.value.nombre) body.nombre_titular = this.tarjeta.value.nombre;
    if (this.tarjeta.value.numero) body.numero_tarjeta = this.tarjeta.value.numero;
    if (this.tarjeta.value.vencimiento) body.fecha_vencimiento = this.tarjeta.value.vencimiento;
    if (this.tarjeta.value.codigo) body.cvv = this.tarjeta.value.codigo;

    this.userService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log('Tarjeta actualizada', data);
        this.localService.user = data.user;
        this.router.navigate(['/shopping_cart/payment']); // Ruta tras actualizar
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
