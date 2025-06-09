import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalService } from '../services/local.service';
import { CompraService } from '../services/compra-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-sell',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './my-sell.component.html',
  styleUrl: './my-sell.component.css'
})
export class MySellComponent {
  productos!: any;
  total!: number;
  vendedor:boolean = false;

  constructor(private localService: LocalService, private compraService: CompraService) {}

  ngOnInit(): void {
    if(this.localService.user?.rol === "Vendedor") {
      this.vendedor = true;
    }
    this.compraService.mostrarVentas(this.localService.user!.id).subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.compraService.totalVenta(this.localService.user!.id).subscribe({
      next: (data) => {
        this.total = data.total;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  update() {
    this.compraService.mostrarVentas(this.localService.user!.id).subscribe({
      next: (data) => {
        this.productos = data.productos;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
