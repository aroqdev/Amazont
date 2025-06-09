import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent {

}
