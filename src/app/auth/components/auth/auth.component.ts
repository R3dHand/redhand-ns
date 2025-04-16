import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';

import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';

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
        private authService: AuthService
    ) {
    // keycloak events
        const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
        effect(() => {
            const keycloakEvent = keycloakSignal();
            // login
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
                }
            }
            // logout
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
