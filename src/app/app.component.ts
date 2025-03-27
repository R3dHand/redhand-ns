import { Component, Inject, Renderer2, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './auth/components/auth/auth.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        AuthComponent,
        HeaderComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
    title = 'redhand-ns';

    constructor(
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {

    }

    ngOnInit(): void {
        this.renderer.addClass(this.document.body, 'light');    
    }
}
