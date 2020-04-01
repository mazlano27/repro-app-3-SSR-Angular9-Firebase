import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SignInComponent} from './sign-in.component';

export const SIGN_IN_PAGE_ROUTES: Routes = [
    {
        path: '', component: SignInComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(SIGN_IN_PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class SignInRouting {

}
