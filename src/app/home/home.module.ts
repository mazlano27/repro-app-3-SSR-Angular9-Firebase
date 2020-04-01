import {NgModule} from '@angular/core';
import {HomeRouting} from './home.routing';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

const material = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRouting,
        ...material,
        SharedModule
    ]
})

export class HomeModule {

}
