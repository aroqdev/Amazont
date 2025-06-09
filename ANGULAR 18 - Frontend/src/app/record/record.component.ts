import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalService } from '../services/local.service';
import { CompraService } from '../services/compra-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [ CommonModule, FormsModule ,RouterLink, TranslateModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {
  productos!: any;
  total!: number;
  vendedor:boolean = false;

  constructor(private localService: LocalService, private compraService: CompraService) {}

  ngOnInit(): void {
    if(this.localService.user?.rol === "Vendedor") {
      this.vendedor = true;
    }
    this.compraService.mostrarCompra(this.localService.user!.id).subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.compraService.totalCompra(this.localService.user!.id).subscribe({
      next: (data) => {
        this.total = data.total;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  update() {
    this.compraService.mostrarCompra(this.localService.user!.id).subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
