import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
],
  exports:[
    LayoutComponent,
    HeaderComponent
  ],
})
export class LayoutModule { }
