import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivacyComponent} from './privacy.component';

export const PRIVACY_PAGE_ROUTES: Routes = [
    {
        path: '', component: PrivacyComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(PRIVACY_PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class PrivacyRouting {

}
