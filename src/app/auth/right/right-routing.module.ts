import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';

const routes = [
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },{
    path:'signup',
    component:SignupComponent
  },{
    path:'forgetPassword',
    component:ForgotComponent
  }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
})
export class RightRoutingModule { }
