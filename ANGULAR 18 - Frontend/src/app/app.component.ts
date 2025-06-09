import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from './interface/user.interface';
import { LocalService } from './services/local.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  idiomaActual: string;

  title = 'AMAZONT';
  user: User | null = null;

  constructor(private languageService: LanguageService, private localService: LocalService) {
    this.idiomaActual = this.languageService.obtenerIdiomaActual();
  }

  cambiarIdioma(idioma: string) {
    this.languageService.cambiarIdioma(idioma);
    this.idiomaActual = idioma;
  }

  ngOnInit(): void {
    this.user = this.localService.user;
  }
  ngDoCheck(): void {
    this.user = this.localService.user;
  }

  darkMode() {
    let body = document.body;
    let title = document.querySelectorAll("h4");
    let div = document.querySelector("div"); // Selecciona el div
    let p = document.querySelectorAll("p"); // Selecciona todos los elementos <p>

    var isDark = body.getAttribute("data-is-dark") === "true";

    // Colores del modo claro
    if (isDark) {
        body.style.backgroundColor = "#FFFFFF";
        body.style.color = "#080808";

        title.forEach(title => {
          title.style.color = "#000000";
        });

        if (div) {
            div.style.backgroundColor = "#232f3e"; // Cambia el fondo del div en el modo claro
        }

        if (p) {
          p.forEach(paragraph => paragraph.style.color = "#f7b733"); // Cambia el color de todos los <p> en modo oscuro
        }
    }
    // Colores del modo oscuro
    else {
        body.style.backgroundColor = "#303030";
        body.style.color = "#FFFFFF";

        title.forEach(title => {
          title.style.color = "#FFFFFF"; // Cambia el color del título en modo oscuro
        });
        
        if (div) {
            div.style.backgroundColor = "#303030"; // Cambia el fondo del div en el modo oscuro
        }
        if (p) {
            p.forEach(paragraph => paragraph.style.color = "#FFFFFF"); // Cambia el color de todos los <p> en modo oscuro
        }
    }

    // Cambiar el estado de isDark para la próxima llamada
    body.setAttribute("data-is-dark", String(!isDark));
  }
}
