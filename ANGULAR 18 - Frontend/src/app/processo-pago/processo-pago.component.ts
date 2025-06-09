import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalService } from '../services/local.service';
import { UserService } from '../services/user-service.service';
import { CarritoService } from '../services/carrito-service.service';
import { User } from '../interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-processo-pago',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './processo-pago.component.html',
  styleUrl: './processo-pago.component.css'
})
export class ProcessoPagoComponent {
  user!: User;
  carrito: any[] = [];
  total: number = 0;
  mensajeEstado: string = '';
  direccion: FormGroup;
  ciudad: FormControl;
  calle: FormControl;
  piso: FormControl;
  puerta: FormControl;
  adress: FormControl;

  constructor(private router: Router, private localService: LocalService, private userService: UserService, private carritoService:CarritoService) {
    this.ciudad = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.calle = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.piso = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.puerta = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.adress = new FormControl('');

    this.direccion = new FormGroup({
      ciudad: this.ciudad,
      calle: this.calle,
      piso: this.piso,
      puerta: this.puerta,
      adress: this.adress
    });
  }

  ngOnInit(): void {
    this.user = this.localService.user!;
    this.carritoService.mostrarCart(this.localService.user!.id).subscribe({
      next: (data) => {
        this.carrito = data.carrito;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.carritoService.totalCart(this.localService.user!.id).subscribe({
      next: (data) => {
        this.total = data.total;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  getUltimosDigitos(numeroTarjeta: string): string {
    return numeroTarjeta.slice(-3);
  }

  confirmar() {
    const body: any = {}; // objeto dinámico

    this.direccion.value.adress = `${this.direccion.value.ciudad}, ${this.direccion.value.calle}, ${this.direccion.value.piso}, ${this.direccion.value.puerta}`;

    if (this.direccion.value.adress) body.adress = this.direccion.value.adress;

    this.userService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.localService.user = data.user;
        this.carritoService.confirmarCompra(this.user.id).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/shopping_cart/confirm']);
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  eliminar(id: number): void {
    this.carritoService.eliminarProducto(id).subscribe({
      next: () => {
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.carritoService.totalCart(this.localService.user!.id).subscribe({
          next: (data) => {
            this.total = data.total;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.mensajeEstado = 'Producto eliminado.';
      },
      error: (err) => {
        console.error('Error al eliminar producto', err);
      }
    });
  }
}
