import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto-service.service';
import { Producto } from '../interface/producto.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria-service.service';
import { Categoria } from '../interface/categoria.interface';
import { LocalService } from '../services/local.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-upd-prod',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './upd-prod.component.html',
  styleUrl: './upd-prod.component.css'
})
export class UpdProdComponent {
  producto?: Producto;
  categorias: Categoria[] = [];
  oferta: boolean = false;
  update: FormGroup;
  nombre: FormControl;
  imagen: FormControl;
  descripcion: FormControl;
  precio: FormControl;
  precioAnte!: FormControl;
  cantidad: FormControl;
  categoria: FormControl;
  mensajeEstado: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private localService: LocalService, private productoService: ProductoService, private categoriaService: CategoriaService) {
    this.nombre = new FormControl('', [Validators.maxLength(255)]);
    this.imagen = new FormControl('');
    this.descripcion = new FormControl('');
    this.precio = new FormControl('');
    this.precioAnte = new FormControl('');
    this.cantidad = new FormControl('', [Validators.min(1)]);
    this.categoria = new FormControl('');

    this.update = new FormGroup({
      nombre: this.nombre,
      imagen: this.imagen,
      descripcion: this.descripcion,
      precio: this.precio,
      precioAnte: this.precioAnte,
      cantidad: this.cantidad,
      categoria: this.categoria
    });
  }

  ngOnInit(): void {
    const prodId= this.route.snapshot.params['prodId'];

    this.productoService.mostrarUnSoloProduct(prodId).subscribe({
      next: (data) => {
        this.producto = data.producto;
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

  enOferta() {
    if (this.oferta == false) {
      this.oferta = true;
    }
    else if (this.oferta == true) {
      this.oferta = false;
    }
  }

  actualizar() {
    const body: any = {}; // objeto dinámico

    if (this.update.value.nombre) body.nombre = this.update.value.nombre;
    if (this.oferta !== null && this.oferta !== undefined) body.oferta = this.oferta;
    if (this.update.value.imagen) body.imagen = this.update.value.imagen;
    if (this.update.value.descripcion) body.descripcion = this.update.value.descripcion;
    if (this.update.value.precio) body.precio = this.update.value.precio;
    if (this.update.value.precioAnte) body.precioAnterior = this.update.value.precioAnte;
    if (this.update.value.cantidad) body.cantidad = this.update.value.cantidad;
    if (this.update.value.categoria) body.cat_id = this.update.value.categoria;

    // Solo lo agregás si tenés el user_id (por ejemplo, si es admin o vendedor)
    if (this.localService.user?.id) {
      body.user_id = this.localService.user.id;
    }

    this.productoService.modificarCampoProduct(this.producto!.id, body).subscribe({
      next: (data) => {
        console.log('Producto actualizado', data);
        this.router.navigate(['/my_product']);
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
