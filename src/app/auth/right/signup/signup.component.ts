import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/httpService';
import { UtilService } from 'src/app/utils/UtilsService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpService, private utilService: UtilService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      userRole: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordMatchValidator
    })
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;
    return password === confirmPass ? null : { mismatch: true };
  }
  async onSubmit() {
    this.isLoading = true;
    if (this.signupForm.valid) {
      let password = this.signupForm.get('confirmPass')?.value
      const encryptedPassword = await this.utilService.encryptPassword(password);
      let data: any = {
        userName: this.signupForm.get('userName')?.value,
        userRole: this.signupForm.get('userRole')?.value,
        password: encryptedPassword
      }
      this.http.signIn(data).subscribe((res) => {
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
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }
  navigateToLogin() {
    this.router.navigate(['/pre-auth/landingpage/login']);
  }

}
