import {NgModule} from '@angular/core';
import {AboutRouting} from './about.routing';
import {CommonModule} from '@angular/common';
import { AboutComponent } from './about.component';

const material = [];

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        AboutRouting,
        ...material
    ]
})

export class AboutModule {

}
