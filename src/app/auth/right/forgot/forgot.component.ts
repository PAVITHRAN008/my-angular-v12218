import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/httpService';
import { UtilService } from 'src/app/utils/UtilsService';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  isLoading: boolean = false;
  forgetForm!: FormGroup;
  userExists: any;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpService,private utilService:UtilService) { }

  ngOnInit() {
    this.forgetForm = this.fb.group({
      userName: ['', Validators.required],
      userRole: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]]
    },{
      validator: this.passwordMatchValidator
    })
    this.valueChanges()
  }

    passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;
    return password === confirmPass ? null : { mismatch: true };
  }
  valueChanges() {
    this.forgetForm.get('userName')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) {
          this.userExists = undefined;
          return EMPTY;
        }
        return this.http.userVerfy(value);
      })
    ).subscribe(result => {
      this.userExists = result;
      this.formValueSet(); 
    });
  }
  formValueSet() {
    if (this.userExists && this.userExists.data) {
      this.forgetForm.get('userRole')?.setValue(this.userExists.data.userRole);
      this.forgetForm.get('userRole')?.disable();
    }
  }
  async onSubmit() {
    if (this.forgetForm.valid) {
       let password = this.forgetForm.get('confirmPass')?.value
      const encryptedPassword = await this.utilService.encryptPassword(password);
      let data: any = {
        userName: this.forgetForm.get('userName')?.value,
        userRole: this.forgetForm.get('userRole')?.value,
        password: encryptedPassword
      }
       this.http.forgotChangePass(data).subscribe((res) => {
        if (res.success) {
          this.isLoading = false
          this.navigateToLogin()
        }
        else{
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
    Object.keys(this.forgetForm.controls).forEach(key => {
      const control = this.forgetForm.get(key);
      control?.markAsTouched();
    });
  }
  navigateToLogin() {
    this.router.navigate(['/pre-auth/landingpage/login']);
  }

}
