import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserSettingsComponent } from './components/users/user-settings/user-settings.component';

import { canActivateAuthRole } from './auth/guards/auth-role.guard';

export const routes: Routes = [
    // no auth
    {
        path: '',
        component: HomeComponent
    },
    // auth required
    {
        path: 'UserSettings',
        component: UserSettingsComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'user' }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
