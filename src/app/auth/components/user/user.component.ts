import { Component, Inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { UserPreferences } from '../../models/user-preferences.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy{
    userSubscription: any;
    user: UserModel = new UserModel(false);

    showAccountManagement = signal(false);
    constructor(
        private authService: AuthService,
        private userPreferencesService: UserPreferencesService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {

    }

    ngOnInit(): void {
        this.authService.user$.subscribe({
            next: this.setUser.bind(this),
            error: this.handleError.bind(this)
        });
    }

    login() {
        this.authService.login$.next();
    }

    logout() {
        this.authService.logout$.next();
    }

    setUser(user: UserModel) {
        this.user = user;
        this.userPreferencesService.preferences().subscribe({
            next: this.setUserPreferences.bind(this),
            error: this.handleError.bind(this)
        });
    }

    setUserPreferences(preferences: UserPreferences) {
        this.user.preferences = preferences;

        //theme
        switch (this.user.preferences.theme) {
            case 'dark':
                this.toggleDarkMode();
                break;
            case 'light':
                this.toggleLightMode();
                break;
            default:
                this.toggleLightMode();
                break;
        }
    }   


    handleError(error: HttpErrorResponse) {
        console.log(error);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }


    toggleDarkMode() {
        this.user.preferences.theme = 'dark';
        this.renderer.addClass(this.document.body, 'dark');
        this.renderer.removeClass(this.document.body, 'light');

        this.userPreferencesService.updatePreferences(this.user.preferences).subscribe({
            // next: this.setUserPreferences.bind(this),
            error: this.handleError.bind(this)
        });
    }

    toggleLightMode() {
        this.user.preferences.theme = 'light';
        this.renderer.addClass(this.document.body, 'light');
        this.renderer.removeClass(this.document.body, 'dark');

        this.userPreferencesService.updatePreferences(this.user.preferences).subscribe({
            // next: this.setUserPreferences.bind(this),
            error: this.handleError.bind(this)
        });
    }
}
