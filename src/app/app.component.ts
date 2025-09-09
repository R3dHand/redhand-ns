import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/components/auth/auth.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        AuthComponent,
        AppBarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
    title = 'redhand-ns';

    constructor(
    ) {
    
    }

    ngOnInit(): void {
            
    }

}
