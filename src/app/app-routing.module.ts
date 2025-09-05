import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/authGuard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pre-auth',
    pathMatch: 'full'
  },
  {
    path: 'pre-auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
    {
    path: 'auth',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    canLoad: [AuthGuard] 
  },
  { path: '**', redirectTo: 'pre-auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
