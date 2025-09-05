import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from "src/app/layout/layout.module";
import { FeaturesRoutingModule } from './features-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateUserComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    FeaturesRoutingModule,
],
  exports:[
    DashboardComponent
  ],
})
export class FeaturesModule { }
