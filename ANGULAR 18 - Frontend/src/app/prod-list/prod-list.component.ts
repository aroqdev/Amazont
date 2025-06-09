import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../interface/producto.interface';
import { ProductoService } from '../services/producto-service.service';
import { CategoriaService } from '../services/categoria-service.service';
import { Categoria } from '../interface/categoria.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-prod-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './prod-list.component.html',
  styleUrl: './prod-list.component.css'
})
export class ProdListComponent implements OnInit {
  filtroCategoria: number | null = null;
  filtroPrecioMin: number = 0;
  filtroPrecioMax: number = Infinity;
  productos: Producto[] = [];
  categorias: Categoria[] = [];

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.productoService.mostrarProduct().subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.categoriaService.mostrarCategory().subscribe({
      next: (data) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });

  }

  get productosFiltrados() {
    return this.productos.filter(prod =>
      (!this.filtroCategoria || prod.cat_id == this.filtroCategoria) &&
      prod.precio >= this.filtroPrecioMin &&
      prod.precio <= this.filtroPrecioMax
    );
  }

  limpiarFiltros() {
    this.filtroCategoria = null;
    this.filtroPrecioMin = 0;
    this.filtroPrecioMax = Infinity;
    this.productoService.mostrarProduct().subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
