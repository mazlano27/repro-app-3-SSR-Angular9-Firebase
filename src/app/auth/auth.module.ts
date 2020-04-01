import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRouting} from './auth.routing';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';


const material = [];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRouting,
        ...material
    ]
})
export class AuthModule {
}
