import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCatComponent } from "../menu-cat/menu-cat.component";
import { ProductosComponent } from '../productos/productos.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, MenuCatComponent, ProductosComponent, RouterLink, TranslateModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  //Funcion que alterna entre el modo oscuro y el claro
  darkMode() {
    var element = document.getElementById('head');
    let body = document.body;

    if(element){
      element.classList.toggle("dark_mode");
    }

    var isDark = body.getAttribute("data-is-dark") === "true";

      //Colores del modo claro
      if (isDark) {
         body.style.backgroundColor = "#FFFFFF";
         body.style.color = "#080808";
      }

      //Colores del modo oscuro
      else {
        body.style.backgroundColor = "#303030";
        body.style.color = "#FFFFFF";
      }

      // Cambiar el estado de isDark para la próxima llamada
      body.setAttribute("data-is-dark", String(!isDark));
    }

}


