import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { StateManagerService } from 'src/app/core/services/state-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openDialog = new EventEmitter<any>();
  @Input() userStateData: any;
  userName: any;
  userRole: any;
  menuOpen = false;
  constructor(private router: Router, private authService: AuthService, private stateManger: StateManagerService) { }

  ngOnInit() {
    if (this.userStateData != undefined) {
      this.userName = this.userStateData.userName
      this.userRole = this.userStateData.userRoleId == '2' ? 'Admin' : 'General User';
    }
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.menuOpen = false;
    }
  }
  createUser() {
    let data: any = {};
    data.isAction = 'create';
    data.creatorUsername = this.userName;
    this.menuOpen = false;
    this.openDialog.emit(data);
  }
  changePassword() {
    let data: any = {};
    data.isAction = 'changePassword';
    this.menuOpen = false;
    this.openDialog.emit(data);
  }
  signOut() {
    this.authService.clearToken();
    this.stateManger.resetUserDetailsInState();
    this.router.navigate(['/pre-auth/landingpage/login']);
  }
  dashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/dashboard']);
    });
  }

}
