import { Component } from '@angular/core';
import { UserComponent } from '../../auth/components/user/user.component';


@Component({
  selector: 'app-bar',
  imports: [
    UserComponent
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {

}
