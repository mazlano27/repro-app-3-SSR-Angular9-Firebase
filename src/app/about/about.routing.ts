import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {NgModule} from '@angular/core';

export const ABOUT_PAGE_ROUTES: Routes = [
    {
        path: '', component: AboutComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ABOUT_PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AboutRouting {
}
