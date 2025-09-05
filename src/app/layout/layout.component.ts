import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModuleComponent } from '../shared/dialog-module/dialog-module.component';
import { StateManagerService } from '../core/services/state-manager.service';
import { UserDetails } from '../core/interfaces/user-details.model';
import { Subscription } from 'rxjs';
import { HttpService } from '../core/services/httpService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userStateSub: Subscription = new Subscription();
  userDetails!: UserDetails;
  userName: any;
  userRole: any;
  tableData:any;
  constructor(public dialog: MatDialog, private stateManager: StateManagerService,private http: HttpService) {
    this.userDetailsFromState()
  }

  ngOnInit() {
    this.getUserDetails()
  }
  getUserDetails(){
    this.tableData=[];
    this.http.getUserList().subscribe((res) => {
      res.data.forEach((user: any) => {
        if (user.userRole) {
          user.userRole = user.userRole === '2' ? 'Admin' : 'General User';
        }
        this.tableData.push(user)
      });
    })
  }
  userDetailsFromState(): void {
    this.userStateSub = this.stateManager.getUserDetailsFromState().subscribe((userStateData: any) => {
      this.userDetails = userStateData;
      this.userName = this.userDetails.userName
      this.userRole = this.userDetails.userRoleId == '2' ? 'Admin' : 'General User';
    });
  }
  handleDialog(data: any) {
    const dialogData = { ...data, modifiedBy: this.userName ,userDetails:this.userDetails};
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(DialogModuleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
