import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'redhand-ns';
    authenticated = false;

    constructor(
        private readonly keycloak: Keycloak
    ) {
    // keycloak events
        const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
        effect(() => {
            const keycloakEvent = keycloakSignal();
            // login
            if (keycloakEvent.type === KeycloakEventType.Ready) {
                this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
            }
            // logout
            if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
                this.authenticated = false;
            }
        });
    }

    isAuthorized() {

    }

    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }
}
