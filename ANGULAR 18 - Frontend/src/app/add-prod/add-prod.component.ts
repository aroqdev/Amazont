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
  selector: 'app-add-prod',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-prod.component.html',
  styleUrl: './add-prod.component.css'
})
export class AddProdComponent {
  producto!: Producto;
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
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.imagen = new FormControl('', [Validators.required]);
    this.descripcion = new FormControl('', [Validators.required]);
    this.precio = new FormControl('', [Validators.required]);
    this.precioAnte = new FormControl('');
    this.cantidad = new FormControl('', [Validators.required, Validators.min(1)]);
    this.categoria = new FormControl('', [Validators.required]);

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

  crear() {
    if (this.oferta == false) {
      this.productoService.crearProduct(this.update.value.nombre, this.oferta, this.update.value.imagen, this.update.value.descripcion, this.update.value.precio, 0, this.update.value.cantidad, this.update.value.categoria, this.localService.user!.id).subscribe({
        next: (data) => {
          console.log('Producto creado', data);
          this.router.navigate(['/my_product']);
        },
        error: (err) => {
          console.error('Error', err);
          this.mensajeEstado = 'Error al crear';
        }
      });
    }
    else if (this.oferta == true) {
      this.productoService.crearProduct(this.update.value.nombre, this.oferta, this.update.value.imagen, this.update.value.descripcion, this.update.value.precio, this.update.value.precioAnte, this.update.value.cantidad, this.update.value.categoria, this.localService.user!.id).subscribe({
        next: (data) => {
          console.log('Producto creado', data);
          this.router.navigate(['/my_product']);
        },
        error: (err) => {
          console.error('Error', err);
          this.mensajeEstado = 'Error al crear';
        }
      });
    }
  }
}
