import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    // Idioma por defecto: español
    const idiomaGuardado = localStorage.getItem('idioma') || 'espanol';
    this.translate.setDefaultLang('espanol');
    this.translate.use(idiomaGuardado);
  }

  /**
   * Cambia el idioma de toda la aplicación y lo guarda en localStorage
   * @param idioma idioma a usar ('espanol', 'ingles', etc.)
   */
  cambiarIdioma(idioma: string): void {
    this.translate.use(idioma);
    localStorage.setItem('idioma', idioma);
  }

  /**
   * Retorna el idioma actualmente en uso
   */
  obtenerIdiomaActual(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }

  /**
   * Alterna entre español e inglés
   */
  alternarIdioma(): void {
    const idiomaActual = this.obtenerIdiomaActual();
    const nuevoIdioma = idiomaActual === 'espanol' ? 'ingles' : 'espanol';
    this.cambiarIdioma(nuevoIdioma);
  }
}