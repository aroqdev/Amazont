import { Component, OnInit } from '@angular/core';
import { ProdListComponent } from "../prod-list/prod-list.component";
import { Categoria } from '../interface/categoria.interface';
import { Producto } from '../interface/producto.interface';
import { CategoriaService } from '../services/categoria-service.service';
import { ProductoService } from '../services/producto-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categorias-prod',
  standalone: true,
  imports: [ProdListComponent, TranslateModule],
  templateUrl: './categorias-prod.component.html',
  styleUrl: './categorias-prod.component.css'
})
export class CategoriasProdComponent implements OnInit {
  filtroCategoria: string = '';
  isOpen = false; // Estado del menú

  categorias: Categoria[] = [];
  productos: Producto[] = [];

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService) {
    //Declaramos variables
    var side_menu = document.getElementById("side_menu");
    var actionBtn = document.getElementById("btn_open");
    var body = document.getElementById("body");
  }

  ngOnInit(): void {
    this.categoriaService.mostrarCategory().subscribe({
      next: (data) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.productoService.mostrarProduct().subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  get productosFiltrados() {
    return this.productos.filter(prod =>
      (this.filtroCategoria ? this.categoriaService.obtenerNombreCategoria(prod.cat_id).includes(this.filtroCategoria) : true));
  }

  toggleMenu() {
    this.isOpen = !this.isOpen; // Cambia el estado del menú
  }

  //Menu desplegable
  menuOpened = false;

  openMenu(event: Event) {
    event.preventDefault(); // Previene la acción predeterminada

    const sideMenu = document.getElementById('side_menu'); // Selecciona el menú lateral
    const body = document.getElementById('body'); // Selecciona el body principal
    const menu = document.querySelector('.menu'); // Selecciona el div con la clase .menu

    if (sideMenu && menu) {
      const isOpen = sideMenu.classList.toggle('menu-opened'); // Alterna la clase del menú
      const menuOpen = menu.classList.toggle('menu-opened'); // Alterna la clase del menú

      if (isOpen) {
        body?.classList.add('no-scroll'); // Bloquea el scroll si el menú está abierto
        menu.classList.add('menu-resized'); // Agrega la clase para redimensionar el menú

      } else {
        body?.classList.remove('no-scroll'); // Restaura el scroll si el menú se cierra
        menu.classList.remove('menu-resized'); // Agrega la clase para redimensionar el menú
      }
    }
  }
}
