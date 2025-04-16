import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { canActivateAuthRole } from './auth/guards/auth-role.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    // no auth
    {
        path: '',
        component: HomeComponent
    },
    // auth required
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'ns-admin' }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
