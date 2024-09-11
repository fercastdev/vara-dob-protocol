import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { RegisterPageComponentlol } from "./register/register-page.component";
import { CustomCommonModulesModule } from 'app/custom-common-modules/custom-common-modules.module';
import { LandingComponent } from './landing/landing.component';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule ,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        CustomCommonModulesModule
    ],
    declarations: [
        ErrorPageComponent,
        LoginPageComponent,
        RegisterPageComponentlol,
        LandingComponent,
    ]
})
export class ContentPagesModule { }
