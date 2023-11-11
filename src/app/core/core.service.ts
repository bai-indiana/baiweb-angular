import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BACKEND_SYS_ERROR } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 30000,
      verticalPosition: 'top',
    });
  }

  getHeader() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    if (this.getAuthToken() !== null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + this.getAuthToken()
        })
      };

    }
    return httpOptions;
  }


  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  getAuthTokenRefresh(): string | null {
    return window.localStorage.getItem("auth_token_refresh");
  }

  getUsername(): string | null {
    return window.localStorage.getItem("username");
  }

  resetAuthToken() {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("auth_token_refresh");
    window.localStorage.removeItem("username");
  }

  setAuthToken(
    token: string | null,
    tokenRefresh: string,
    username: string): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
      window.localStorage.setItem("auth_token_refresh", tokenRefresh);
      window.localStorage.setItem("username", username);
    } else {
      this.resetAuthToken();
    }
  }

  refreshPage() {
    window.location.reload();
  }
}