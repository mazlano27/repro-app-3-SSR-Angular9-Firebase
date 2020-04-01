import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '', component: AuthComponent, children: [
            {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
            {
                path: 'sign-in',
                loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
            },
            {
                path: 'forgotten-password',
                loadChildren: () => import('./forgotten-password/forgotten-password.module').then(m => m.ForgottenPasswordModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AUTH_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRouting {
}
