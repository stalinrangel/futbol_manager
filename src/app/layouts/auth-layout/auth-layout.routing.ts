import { Routes } from '@angular/router';
import { ActivarComponent } from 'src/app/pages/activar/activar.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'activar',       component: ActivarComponent }
];
