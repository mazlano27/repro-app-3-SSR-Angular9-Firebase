import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ForgottenPasswordComponent} from './forgotten-password.component';

export const FORGOTTEN_PASSWORD_PAGE_ROUTES: Routes = [
    {
        path: '', component: ForgottenPasswordComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(FORGOTTEN_PASSWORD_PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class ForgottenPasswordRouting {

}
