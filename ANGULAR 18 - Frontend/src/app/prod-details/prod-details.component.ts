import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interface/producto.interface';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../services/producto-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoService } from '../services/carrito-service.service';
import { LocalService } from '../services/local.service';
import { ValoracionService } from '../services/valoracion-service.service';
import { OpinionService } from '../services/opinion-service.service';
import { User } from '../interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-prod-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './prod-details.component.html',
  styleUrl: './prod-details.component.css'
})
export class ProdDetailsComponent {
  selectProd?: any;
  productos: any[] = [];
  cantidad: number = 1;
  promedio: number = 0;
  promedioEntero: number = 0;
  mensajeEstado: string = '';
  opinion: any[] = [];
  valoracion: any[] = [];
  user?: User;

  addOpinion: boolean = false;
  addValoracion: boolean = false;

  createOpinion: FormGroup;
  crearComentario: FormControl;

  createValoracion: FormGroup;
  crearPuntuacion: FormControl;

  actOpinion: boolean = false;
  actValoracion: boolean = false;

  modifyOpinion: FormGroup;
  comentario: FormControl;

  modifyValoracion: FormGroup;
  puntuacion: FormControl;

  distribucionEstrellas: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  constructor(private route: ActivatedRoute,
    private localervice: LocalService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private opinionService: OpinionService,
    private valoracionService: ValoracionService
  ) {
    this.crearComentario = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.crearPuntuacion = new FormControl('', [Validators.required]);

    this.comentario = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.puntuacion = new FormControl('', [Validators.required]);

    this.createOpinion = new FormGroup({
      crearComentario: this.crearComentario
    });

    this.createValoracion = new FormGroup({
      crearPuntuacion: this.crearPuntuacion
    });

    this.modifyOpinion = new FormGroup({
      comentario: this.comentario
    });

    this.modifyValoracion = new FormGroup({
      puntuacion: this.puntuacion
    });
  }

  ngOnInit(): void {
    this.user = this.localervice.user!;
    const prodId= this.route.snapshot.params['prodId'];

    this.productoService.mostrarProduct().subscribe({
      next: (data) => {
        this.productos = data.productos;
        this.selectProd = this.getProducto(prodId);

        this.opinionService.OpinionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.opinion = data.opiniones;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });

        this.valoracionService.ValoracionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.valoracion = data.valoraciones;

            // Calcular la distribución de estrellas
            const totalValoraciones = this.valoracion.length;
            if (totalValoraciones > 0) {
              this.distribucionEstrellas = this.valoracion.reduce((acumulador, valoracion) => {
                acumulador[valoracion.puntuacion] = (acumulador[valoracion.puntuacion] || 0) + 1;
                return acumulador;
              }, {});

              // Convertir a porcentajes
              for (let estrella in this.distribucionEstrellas) {
                this.distribucionEstrellas[estrella] = Math.round((this.distribucionEstrellas[estrella] / totalValoraciones) * 100);
              }
            }
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.obtenerPromedio();
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  actualizarOpiniion() {
    this.opinionService.OpinionPorProducto(this.selectProd!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.opinion = data.opiniones;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  actualizarValoracion() {
    this.valoracionService.ValoracionPorProducto(this.selectProd!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.valoracion = data.valoraciones;

        // Calcular la distribución de estrellas
        const totalValoraciones = this.valoracion.length;
        if (totalValoraciones > 0) {
          this.distribucionEstrellas = this.valoracion.reduce((acumulador, valoracion) => {
            acumulador[valoracion.puntuacion] = (acumulador[valoracion.puntuacion] || 0) + 1;
            return acumulador;
          }, {});

          // Convertir a porcentajes
          for (let estrella in this.distribucionEstrellas) {
            this.distribucionEstrellas[estrella] = Math.round((this.distribucionEstrellas[estrella] / totalValoraciones) * 100);
          }
        }
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  getProducto(name: string): any | undefined {
    return this.productos.find((producto) => producto.nombre === name);
  }

  agregar(id: number) {
    this.carritoService.agregarCart(this.localervice.user!.id, id, this.cantidad).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Producto añadido al carrito';
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al agregar al carrito';
      }
    });
  }

  // Función para encontrar la valoración correspondiente
  getValoracionParaOpinion(userId: number): any | null {
    return this.valoracion.find(valor => valor.user_id === userId) || null;
  }

  anadirOpinion() {
    this.addOpinion = true;
    this.addValoracion = false;
  }

  anadirValoracion() {
    this.addValoracion = true;
    this.addOpinion = false;
  }

  cerrarOpinion() {
    this.addOpinion = false;
  }

  cerrarValoracion() {
    this.addValoracion = false;
  }

  agregarOpinion() {
    this.opinionService.crearOpinion(this.selectProd!.id, this.localervice.user!.id, this.createOpinion.value.crearComentario).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Opinion creada';
        this.opinionService.OpinionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.opinion = data.opiniones;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.cerrarOpinion();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al crear la opinion';
      }
    });
  }

  agregarValoracion() {
    this.valoracionService.crearValoracion(this.selectProd!.id, this.localervice.user!.id, this.createValoracion.value.crearPuntuacion).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Valoracion creada';
        this.valoracionService.ValoracionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.valoracion = data.valoraciones;

            // Calcular la distribución de estrellas
            const totalValoraciones = this.valoracion.length;
            if (totalValoraciones > 0) {
              this.distribucionEstrellas = this.valoracion.reduce((acumulador, valoracion) => {
                acumulador[valoracion.puntuacion] = (acumulador[valoracion.puntuacion] || 0) + 1;
                return acumulador;
              }, {});

              // Convertir a porcentajes
              for (let estrella in this.distribucionEstrellas) {
                this.distribucionEstrellas[estrella] = Math.round((this.distribucionEstrellas[estrella] / totalValoraciones) * 100);
              }
            }
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.obtenerPromedio();
        this.cerrarValoracion();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al crear la valoracion';
      }
    });
  }

  mostrarOpinion() {
    this.actOpinion = true;
    this.actValoracion = false;
  }

  mostrarValoracion() {
    this.actValoracion = true;
    this.actOpinion = false;
  }

  ocultarOpinion() {
    this.actOpinion = false;
  }

  ocultarValoracion() {
    this.actValoracion = false;
  }

  modificarOpinion(id: number) {
    this.opinionService.actualizarOpinion(id, this.modifyOpinion.value.comentario).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Opinion actualizadao';
        this.opinionService.OpinionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.opinion = data.opiniones;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.ocultarOpinion();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar la opinion';
      }
    });
  }

  modificarValoracion(id: number) {
    this.valoracionService.actualizarValoracion(id, this.modifyValoracion.value.puntuacion).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Valoracion actualizadao';
        this.valoracionService.ValoracionPorProducto(this.selectProd!.id).subscribe({
          next: (data) => {
            console.log(data);
            this.valoracion = data.valoraciones;

            // Calcular la distribución de estrellas
            const totalValoraciones = this.valoracion.length;
            if (totalValoraciones > 0) {
              this.distribucionEstrellas = this.valoracion.reduce((acumulador, valoracion) => {
                acumulador[valoracion.puntuacion] = (acumulador[valoracion.puntuacion] || 0) + 1;
                return acumulador;
              }, {});

              // Convertir a porcentajes
              for (let estrella in this.distribucionEstrellas) {
                this.distribucionEstrellas[estrella] = Math.round((this.distribucionEstrellas[estrella] / totalValoraciones) * 100);
              }
            }
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
        this.obtenerPromedio();
        this.ocultarValoracion();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar la valoracion';
      }
    });
  }

  eliminarOpinion(id: number) {
    this.opinionService.eliminarOpinion(id).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Opinion y valoracion eliminada.';
        this.actualizarOpiniion();
        if (this.opinion[id].user_id === this.valoracion[id].user_id) {
          this.eliminarValoracion(id);
        }
        this.actualizarValoracion();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminbar';
      }
    });
  }

  eliminarValoracion(id: number) {
    this.valoracionService.eliminarValoracion(id).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstado = 'Valoracion eliminada';
        this.actualizarValoracion();
        this.obtenerPromedio();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminbar';
      }
    });
  }

  obtenerPromedio() {
    this.valoracionService.promedioPuntuacionProducto(this.selectProd!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.promedio = data.promedio_puntuacion;
        this.promedioEntero = Math.round(data.promedio_puntuacion);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
