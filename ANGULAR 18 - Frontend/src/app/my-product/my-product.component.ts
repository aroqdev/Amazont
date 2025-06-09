import { Component } from '@angular/core';
import { ProductoService } from '../services/producto-service.service';
import { LocalService } from '../services/local.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, TranslateModule],
  templateUrl: './my-product.component.html',
  styleUrl: './my-product.component.css'
})
export class MyProductComponent {
  categorias!: any;
  mensajeEstado: string = '';

  constructor(private localService: LocalService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.miProduct(this.localService.user!.id).subscribe({
      next: (data) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  update() {
    this.productoService.miProduct(this.localService.user!.id).subscribe({
      next: (data) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  eliminar(id: number) {
    this.productoService.eliminarProduct(id).subscribe({
      next: (data) => {
        console.error(data);
        this.update();
        this.mensajeEstado = 'Producto eliminado';
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminar';
      }
    });
  }
}
