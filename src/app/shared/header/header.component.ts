import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../../member/registration/registration.component';
import { LoginComponent } from '../../member/login/login.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Member } from 'src/app/member/member.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_SYS_ERROR, BASE_URL } from 'src/app/constants';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/member/login/login.service';
import { AlertComponent } from '../alert/alert.component';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLoggedIn = false;
  role: any | null;
  username: any | null;

  private subscription: Subscription;

  errorMessage: string = '';

  admin = false;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private _dialog: MatDialog,
    private commonService: CommonService,
    private _coreService: CoreService,
  ) {
    this.subscription = this.loginService.loggedInStatusChange.subscribe((authResponse) => {
      if (authResponse) {

        this.username = authResponse.username;
        this.isLoggedIn = true;

        this.role = authResponse.role;

        if (this.role === 'ADMIN') {
          this.admin = true;
        } else {
          this.admin = false;
        }

      } else {
        this.role = 'Access Denied';
        this.username = 'Not Logged-In';
        this.isLoggedIn = false;
        this.admin = false;
      }
    });
  }

  ngOnInit(): void {

    if (this._coreService.getUsername()) {


      const username = `${this._coreService.getUsername()}`;
      this.commonService.getByUsername(username).subscribe({
        next: (res: Member) => {
          this.username = res.username;
          this.role = res.role;
          this.isLoggedIn = true;

          if (this.role === 'ADMIN') {
            this.admin = true;
          } else {
            this.admin = false;
          }

          if (this._coreService.getMyUrl().includes('/home')) {
            this.router.navigate(['/profile']);
          }
        },
        error: (err: any) => {
          this.handleError('Error loding profile!! ', err);
          this.logout();
        },
      });

    }
  }

  registrationForm() {
    const dialogRef = this._dialog.open(RegistrationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.showLoginPage();
        }
      },
    });
  }

  showLoginPage() {
    const dialogRef = this._dialog.open(LoginComponent);
  }

  logout() {
    this.commonService.logout().subscribe({
      next: () => {
        this._coreService.openSnackBar("Goodbye! You have been successfully logged out.!!");
        this.loginService.loggedOut(null);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.handleError('logout', err);
      },
    });
  }


  handleError(method: string, err: HttpErrorResponse) {
    console.error(err.error);
    if (err.status == 403) {
      this.errorMessage = 'Your login has been expired, Please login again';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = JSON.stringify(err.error)
        .replaceAll('{', ' ')
        .replaceAll('}', ' ')
        .replaceAll('"', ' ');
    }

    this._coreService.openSnackBar(this.errorMessage);

  }

}
