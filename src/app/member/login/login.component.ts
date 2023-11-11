import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BACKEND_SYS_ERROR, MEMBER_LOGIN_ENDPOINT, MEMBER_ENDPOINT } from '../../constants';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationResponse } from 'src/app/shared/authentication-response';
import { Router } from '@angular/router';
import { Member } from '../member.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  pass = '123';
  usr = 'sudip.b28@gmail.com';

  isLoggedIn = false;

  loginForm: FormGroup;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private loginService: LoginService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private router: Router,
    private _dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginForm.patchValue(this.data);
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.commonService.login(this.loginForm.value).subscribe({
        next: (res: AuthenticationResponse) => {
          this._coreService.openSnackBar('Login successfully');
          this.onAlertClose();
          this._dialogRef.close(true);
          this.isLoggedIn = true;
          this._coreService.setAuthToken(res.access_token, res.refresh_token, res.username);
          this.router.navigate(['/profile']);
          this.loginService.loggedIn(res);
        },
        error: (err: any) => {
          this.handleError('loginSubmit', err);

        },
      });
    }
  }
  onAlertClose() {
    this.hasError = false;
  }

  handleError(method: string, err: HttpErrorResponse) {
    this.isSubmitting = false;
    this.hasError = true;
    console.error(err.error);
    if (err.status == 403) {
      this.errorMessage = BACKEND_SYS_ERROR;
    } else {
      this.errorMessage = JSON.stringify(err.error)
        .replaceAll('{', ' ')
        .replaceAll('}', ' ')
        .replaceAll('"', ' ');
    }

  }
}
