import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../interface/producto.interface';
import { ProductoService } from '../services/producto-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  producto: Producto[] = [];
  novedade: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.productPorOferta().subscribe({
      next: (data) => {
        this.producto = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.productoService.productSinOferta().subscribe({
      next: (data) => {
        this.novedade = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
