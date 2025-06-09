import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalService } from '../services/local.service';
import { User } from '../interface/user.interface';
import { UserService } from '../services/user-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user!: User;

  constructor(private localService: LocalService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.localService.user!;
  }

  logout() {
    this.userService.Logout().subscribe({
      next: (data) => {
        console.log(data);
        this.localService.logout();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
