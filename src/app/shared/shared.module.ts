import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModuleComponent } from './dialog-module/dialog-module.component';
import { RouterModule } from '@angular/router';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    TableComponent,
    DialogModuleComponent,
    DeleteModalComponent,
    CustomDatePipe,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule ,
        
],
  exports: [
  MaterialModule,
  TableComponent,
  DialogModuleComponent,
  RouterModule,
  ToastComponent
  ]
})
export class SharedModule { }
