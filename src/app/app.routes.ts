import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Home"
    },
    {
        path: 'login',
        component: LoginComponent,
        title: "Login",
    },
    {
        path: 'payment',
        component: PaymentMethodComponent,
        title: "Payments"
    },
];
