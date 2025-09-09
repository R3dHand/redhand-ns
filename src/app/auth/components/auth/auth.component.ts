import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';

import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';

import { PagePreferencesService } from '../../../services/page-preferences/page-preferences.service';

@Component({
    selector: 'app-auth',
    imports: [],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
    user: UserModel = new UserModel(false);

    login: Subscription = new Subscription();
    logout: Subscription = new Subscription();

    constructor(
        private readonly keycloak: Keycloak,
        private authService: AuthService,
        private pagePreferences: PagePreferencesService
    ) {
    // keycloak events
        const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
        effect(() => {
            const keycloakEvent = keycloakSignal();

            // Triggered when the Keycloak adapter has completed initialization
            if (keycloakEvent.type === KeycloakEventType.Ready) {
                this.user.isAuthenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);

                // add user profile data to UserModel
                if (this.user.isAuthenticated) {
                    this.keycloak.loadUserProfile().then(profile => {
                        this.user.email = profile.email;
                        this.user.userName = profile.username;
                        this.user.firstName = profile.firstName;
                        this.user.lastName = profile.lastName;
                        this.user.avatarInitials = `${profile.firstName?.substring(0, 1)}${profile.lastName?.substring(0, 1)}`;
                        
                        this.authService.user$.next(this.user);
                    }).catch(error => {
                        console.error('Failed to load user profile', error);
                    });
                } else {
                    this.pagePreferences.toggleLightMode();
                }
            }

            // Triggered when a user is successfully authenticated
            if (keycloakEvent.type === KeycloakEventType.AuthSuccess) {
                console.log('AUTH SUCCESS');
            }
            // Triggered when the user logs out. This event will only be triggered 
            // if the session status iframe is enabled or in Cordova mode
            if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
                this.user = new UserModel(false);
                this.authService.user$.next(this.user);
            }
        });
    }

    ngOnInit(): void {
        this.login = this.authService.login$.subscribe(() => {
            this.keycloak.login();
        });
        this.logout = this.authService.logout$.subscribe(() => {
            this.keycloak.logout();
        });
    }

    ngOnDestroy(): void {
        this.login.unsubscribe();
        this.logout.unsubscribe();
    }
}
