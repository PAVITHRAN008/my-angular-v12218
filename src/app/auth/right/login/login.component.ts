import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { HttpService } from 'src/app/core/services/httpService';
import { StateManagerService } from 'src/app/core/services/state-manager.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UtilService } from 'src/app/utils/UtilsService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpService, private authService: AuthService, private utilService: UtilService, private stateManager: StateManagerService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['', Validators.required]
    });
  }
  register() {
    this.router.navigate(['/pre-auth/landingpage/signup']);
  }
  async onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      let password = this.loginForm.get('password')?.value
      const encryptedPassword = await this.utilService.encryptPassword(password);
      this.loginForm.controls['password'].setValue(encryptedPassword);
      await this.http.logIn(this.loginForm.value).subscribe((res: any) => {
        let userData: any = res.data;
        if (userData.success) {
          this.authService.saveToken(userData.token);
          this.isLoading = false;
          let stateUserData: any = {
            userId: userData.user._id,
            userRoleId: userData.user.userRole,
            userName: userData.user.userName,
            token: userData.token
          }
          this.stateManager.addUserDetailsToState(stateUserData);
          this.isLoading = false;
          this.router.navigate(['/auth']);
        }
        else {
          this.isLoading = false;
        }
      })
    }
    else {
      this.isLoading = false;
      this.markFormGroupTouched();
    }
  }
  markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  forgetPassword() {
    this.router.navigate(['/pre-auth/landingpage/forgetPassword']);
  }

}
