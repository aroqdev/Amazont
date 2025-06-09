import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../interface/categoria.interface';
import { CategoriaService } from '../services/categoria-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-cat',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-cat.component.html',
  styleUrl: './menu-cat.component.css'
})
export class MenuCatComponent implements OnInit {
  categoria: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.mostrarCategory().subscribe({
      next: (data) => {
        this.categoria = data.categorias;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
