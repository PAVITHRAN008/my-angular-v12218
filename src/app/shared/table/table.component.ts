import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/httpService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  deleteModalOpen = false;
  selectedUser: any = null;
  @Output() openDialog = new EventEmitter<any>();
  @Input()users:any;
  @Input() userStateData: any;
  userRole:any
  adminUserName:any
  constructor(private http: HttpService,private router:Router) { }

  ngOnInit() {
    if (this.userStateData != undefined) {
      this.adminUserName = this.userStateData.userName;
      this.userRole = this.userStateData.userRoleId;
    }
  }

  editUser(user: any) {
    let data: any = {};
    data.isAction = 'edit';
    data.tableRow = user;
    this.openDialog.emit(data);
  }
  openDeleteModal(user: any) {
    this.selectedUser = null;
    this.selectedUser = user;
    this.deleteModalOpen = true;
  }
  deleteUser() {
    if (this.selectedUser) {
      this.deleteModalOpen = false;
      this.deleteUserApi(this.selectedUser)
    }
  }
  deleteUserApi(selectedUser:any){
    let data:any={
      id:selectedUser._id,
      isDelete:true
    }
    this.http.deleteUser(data).subscribe((res:any)=>{
     if(res.success){
      this.dashboard()
     }
    })
  }
  dashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/dashboard']);
    });
  }
}
