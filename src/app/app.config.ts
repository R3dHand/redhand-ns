import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
    provideKeycloak,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    includeBearerTokenInterceptor
} from 'keycloak-angular';
import { loggingInterceptor } from './auth/interceptors/logging.interceptor';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:3000\/*)/i,
    bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                includeBearerTokenInterceptor,
                loggingInterceptor
            ])
        ),
        provideKeycloak({
            config: {
                url: 'http://localhost:8080',
                realm: 'redhand',
                clientId: 'redhand-ns'
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/keycloak/silent-check-sso.html'
            }
        }),
        {
            provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
            useValue: [
                urlCondition
            ] // <-- Note that multiple conditions might be added.
        }
    ]
};
