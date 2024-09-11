import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from "./error/error-page.component";
import { LandingComponent } from './landing/landing.component';
import { LoginPageComponent } from "./login/login-page.component";
import { RegisterPageComponentlol } from "./register/register-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponentlol,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'landing',
        component: LandingComponent,
        data: {
          title: 'Landing Page'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
