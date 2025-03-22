import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserSettingsComponent } from './components/users/user-settings/user-settings.component';

export const routes: Routes = [
    // no auth
    {
        path: '',
        component: HomeComponent
    },
    // auth required
    {
        path: 'UserSettings',
        component: UserSettingsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
