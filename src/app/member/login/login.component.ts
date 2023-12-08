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

  member: Member | null | undefined;

  isLoggedIn = false;

  loginForm: FormGroup;
  passwordForm: FormGroup;

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
      username: ['sudip.b28@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });

  }

  ngOnInit(): void {
    this.loginForm.patchValue(this.data);
    this.passwordForm.patchValue(this.data);
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
          this._coreService.setAuthToken(res.access_token, res.refresh_token, res.username, res.role);
          if (res.username) {
            this.commonService.getByUsername(res.username).subscribe({
              next: (member: Member) => {
                this._coreService.setMember(member);

                this.router.navigate(['/profile']);
                this.loginService.loggedIn(res);

              },
              error: (err: any) => {
                this.handleError('Error setting member!! ', err);
              },
            });
          }

        },
        error: (err: any) => {
          this.handleError('loginSubmit', err);

        },
      });
    }
  }


  generateTempPassword() {
    if (this.passwordForm.valid) {
      let username = this.passwordForm.get('username')?.value;
      this.isSubmitting = true;
      this.loginService.createTempPassword(username).subscribe({
        next: (res: AuthenticationResponse) => {
          this._coreService.openSnackBar('Please check your email for temporary password!!');
          this.onAlertClose();

        },
        error: (err: any) => {
          this.handleError('generateTempPassword', err);

        },
      });
    }
    this.isSubmitting = false;
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
    if (this.errorMessage.includes('Bad credentials')) {
      this.errorMessage = 'Email-Id is not valid or password does not match!!  ';
    }
  }
}
