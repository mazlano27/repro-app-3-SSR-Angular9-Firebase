import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PressAndHoldDirective} from './press-and-hold/press-and-hold.directive';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

const material = [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
];


@NgModule({
    declarations: [
        HeaderComponent,
        PressAndHoldDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        ...material
    ],
    exports: [
        HeaderComponent,
        PressAndHoldDirective
    ],
    providers: []
})

export class SharedModule {
}
