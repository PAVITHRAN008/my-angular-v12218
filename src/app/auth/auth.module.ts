import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './right/login/login.component';
import { AuthRouteingModule } from './auth-routeing.module';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './right/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './right/forgot/forgot.component';



@NgModule({
  declarations: [
    LandingpageComponent,
    LoginComponent,
    LeftComponent,
    RightComponent,
    SignupComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AuthRouteingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
