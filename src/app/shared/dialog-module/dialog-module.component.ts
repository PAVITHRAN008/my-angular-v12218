import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { HttpService } from 'src/app/core/services/httpService';
import { StateManagerService } from 'src/app/core/services/state-manager.service';
import { UtilService } from 'src/app/utils/UtilsService';

@Component({
  selector: 'app-dialog-module',
  templateUrl: './dialog-module.component.html',
  styleUrls: ['./dialog-module.component.scss']
})
export class DialogModuleComponent implements OnInit {
  labelName: any = '';
  isAction: any;
  signupForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private utilService: UtilService, private http: HttpService, private router: Router, private authService: AuthService, private stateManger: StateManagerService) {
    this.isAction = this.data.isAction;
    this.labelName = this.isAction == 'edit' ? 'Edit User' : this.isAction == 'create' ? 'Create User' : 'Change Password'
  }


  async ngOnInit() {
    await this.initializeForm()
  }
  async initializeForm() {
    if (this.isEditOrChangePasswordAction()) {
      await this.handleEditOrPasswordAction();
    } else {
      await this.handleCreateAction();
    }
  }
  isEditOrChangePasswordAction(): boolean {
    return this.isAction === 'edit' || this.isAction === 'changePassword';
  }
  async handleEditOrPasswordAction(): Promise<void> {
    if (this.isAction === 'edit') {
      await this.createEditForm();
    } else {
      await this.createChangePasswordForm();
    }
  }
  createEditForm() {
    let selectData: any = {
      userName: this.data.tableRow.userName,
      userRole: this.data.tableRow.userRole === 'Admin' ? '2' : '1'
    }
    this.signupForm = this.fb.group({
      userName: [{ value: selectData.userName, disabled: true }],
      userRole: [selectData.userRole],
    });
  }
  createChangePasswordForm() {
    let selectData: any = {
      userName: this.data.userDetails.userName,
      userRole: this.data.userDetails.userRoleId
    };
    this.signupForm = this.fb.group({
      userName: [{ value: selectData.userName, disabled: true }],
      userRole: [{ value: selectData.userRole, disabled: true }],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordMatchValidator
    })
  }
  handleCreateAction(): void {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      userRole: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordMatchValidator
    })
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
  const confirmControl = formGroup.get('confirmPass');

  if (!passwordControl || !confirmControl) return null;

  if (passwordControl.value !== confirmControl.value) {
    confirmControl.setErrors({ ...(confirmControl.errors || {}), mismatch: true });
    return { mismatch: true };
  } else {
    if (confirmControl.errors) {
      delete confirmControl.errors['mismatch'];
      if (!Object.keys(confirmControl.errors).length) {
        confirmControl.setErrors(null);
      }
    }
    return null;
  }
  }
  async onSubmit() {
    console.log('hi')
    if (this.signupForm.valid) {
      if (this.isAction == "create") {
        this.createUser()
      }
      else if (this.isAction == "edit") {
        this.editUser()
      }
      else {
        this.changePassword()
      }
    }
  }
  async createUser() {
    let password = this.signupForm.get('confirmPass')?.value
    const encryptedPassword = await this.utilService.encryptPassword(password);
    let data: any = {
      userName: this.signupForm.get('userName')?.value,
      userRole: this.signupForm.get('userRole')?.value,
      password: encryptedPassword,
      creatorUsername: this.data.creatorUsername
    }
    this.http.createrUser(data).subscribe((res) => {
      if (res.success) {
        this.dashboard();
      }
    })
  }
  editUser() {
    let data: any = {
      _id: this.data.tableRow._id,
      userName: this.signupForm.get('userName')?.value,
      userRole: this.signupForm.get('userRole')?.value,
      modifierId: this.data.modifiedBy
    }
    this.http.editUser(data).subscribe((res) => {
      if (res.success) {
        this.dashboard();
      }
    })
  }
  async changePassword() {
    let password = this.signupForm.get('confirmPass')?.value
    const encryptedPassword = await this.utilService.encryptPassword(password);
    let data: any = {
      id: this.data.userDetails.userId,
      userName: this.signupForm.get('userName')?.value,
      userRole: this.signupForm.get('userRole')?.value,
      password: encryptedPassword,
    }
    this.http.changePassword(data).subscribe((res) => {
      if (res.success) {
        this.logOut();
      }
    })
  }
  dashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/dashboard']);
    });
  }
  logOut() {
    this.authService.clearToken();
    this.stateManger.resetUserDetailsInState();
    this.router.navigate(['/pre-auth/landingpage/login']);
  }
}
