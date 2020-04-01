import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SignUpComponent} from './sign-up.component';

export const SIGN_UP_PAGE_ROUTES: Routes = [
    {
        path: '', component: SignUpComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(SIGN_UP_PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class SignUpRouting {

}
