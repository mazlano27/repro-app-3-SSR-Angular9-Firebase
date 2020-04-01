import {NgModule} from '@angular/core';
import {PrivacyComponent} from './privacy.component';
import {CommonModule} from '@angular/common';
import {PrivacyRouting} from './privacy.routing';

const material = [];

@NgModule({
    declarations: [PrivacyComponent],
    imports: [
        CommonModule,
        PrivacyRouting,
        ...material
    ]
})

export class PrivacyModule {

}
