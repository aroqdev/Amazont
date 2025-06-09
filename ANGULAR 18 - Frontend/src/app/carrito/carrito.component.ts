import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarritoService } from '../services/carrito-service.service';
import { LocalService } from '../services/local.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, TranslateModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  procesoCompra: boolean = true;
  carrito: any[] = [];
  total: number = 0;
  mensajeEstado: string = '';

  constructor(private localService: LocalService, private carritoService: CarritoService) {}

  ngOnInit(): void {
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

  empezarCompra(){
    this.procesoCompra = false;
  }

  aumentar(id: number): void {
    this.carritoService.aumentarCantidad(id).subscribe({
      next: (data) => {
        this.carrito = this.carrito.map(item =>
          item.id === id ? { ...item, cantidad: data.carrito.cantidad, total: data.carrito.total } : item
        );
        this.carritoService.totalCart(this.localService.user!.id).subscribe({
          next: (data) => {
            this.total = data.total;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.mensajeEstado = '';
      },
      error: (err) => {
        console.error('Error al aumentar cantidad', err);
        this.mensajeEstado = 'Stock insuficiente.';
      }
    });
  }

  disminuir(id: number): void {
    this.carritoService.disminuirCantidad(id).subscribe({
      next: (data) => {
        this.carrito = this.carrito.map(item =>
          item.id === id ? { ...item, cantidad: data.carrito.cantidad, total: data.carrito.total } : item
        );
        this.carritoService.totalCart(this.localService.user!.id).subscribe({
          next: (data) => {
            this.total = data.total;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al disminuir cantidad', err);
        this.eliminar(id);
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
