import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalService } from '../services/local.service';
import { User } from '../interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pay-methods',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, TranslateModule],
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {
  user!: User;

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.user = this.localService.user!;
  }

  update() {
    this.user = this.localService.user!;
  }

  getUltimosDigitos(numeroTarjeta: string): string {
    return numeroTarjeta.slice(-3);
  }
}
