import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';

import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../components/users/models/user.model';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
    user: UserModel = new UserModel();

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
                this.authService.user$.next(this.user);
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

    ngOnDestroy(): void {
        this.login.unsubscribe();
        this.logout.unsubscribe();
    }
}
