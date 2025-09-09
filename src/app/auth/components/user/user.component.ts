import { Component, Inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { UserPreferences } from '../../models/user-preferences.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { PagePreferencesService } from '../../../services/page-preferences/page-preferences.service';

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
        private pagePreferences: PagePreferencesService,
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
        this.userPreferencesService.get().subscribe({
            next: this.setUserPreferences.bind(this),
            error: this.handleError.bind(this)
        });
    }

    setUserPreferences(preferences: UserPreferences) {
        this.user.preferences = preferences;

        //theme
        switch (this.user.preferences.theme) {
            case 'dark':
                this.pagePreferences.toggleDarkMode();
                break;
            case 'light':
                this.pagePreferences.toggleLightMode();
                break;
            default:
                this.pagePreferences.toggleLightMode();
                break;
        }
    } 

    patchUserTheme(theme: string) {
        let preferences = this.user.preferences;
        preferences.theme = theme;

        this.userPreferencesService.patch(preferences).subscribe({
            next: this.setUserPreferences.bind(this),
            error: this.handleError.bind(this)
        });
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
