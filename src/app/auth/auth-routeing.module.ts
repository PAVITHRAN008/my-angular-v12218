import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './right/signup/signup.component';

const routes:Routes =[
   {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  },
  {
    path: 'landingpage',
    component: LandingpageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./right/right-routing.module').then(m => m.RightRoutingModule)
      }
    ]
  }
] 

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouteingModule { }
