import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';

import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../../components/users/models/user.model';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
    user: UserModel = new UserModel(false);

    login: any;
    logout: any;

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

                // add user profil data to UserModel
                this.keycloak.loadUserProfile().then(profile => {
                    console.log(profile);
                    // Access user profile properties like:
                    // profile.firstName, profile.lastName, profile.email, etc.
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
            // logout
            if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
                this.user.userName = undefined;
                this.user.isAuthenticated = false;
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

    async loadUserProfileAsync() {
        try {
            let test = await this.keycloak.loadUserInfo();
        } catch (error) {
            console.error('Failed to load user info', error);
        }
    }

    ngOnDestroy(): void {
        this.login.unsubscribe();
        this.logout.unsubscribe();
    }
}
