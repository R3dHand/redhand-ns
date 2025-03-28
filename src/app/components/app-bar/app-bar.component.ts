import { Component, Inject, Renderer2, OnDestroy, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserModel } from '../users/models/user.model';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-app-bar',
  imports: [],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent implements OnInit, OnDestroy{
    userSubscription: any;
    user: UserModel = new UserModel(false);
    @Input() lightsOn: boolean = false;

    constructor(
        private authService: AuthService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ){

    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });

        this.toggleDarkMode();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    login() {
        this.authService.login$.next();
    }

    logout() {
        this.authService.logout$.next();
    }


    toggleDarkMode() {
        this.lightsOn = false;
        this.renderer.addClass(this.document.body, 'dark');
        this.renderer.removeClass(this.document.body, 'light');
    }
    toggleLightMode() {
        this.lightsOn = true;
        this.renderer.addClass(this.document.body, 'light');
        this.renderer.removeClass(this.document.body, 'dark');
    }
}
