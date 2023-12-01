import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BACKEND_SYS_ERROR } from '../constants';
import { Member } from '../member/member.model';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(
    private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 30000,
      verticalPosition: 'top',
    });
  }

  getFormatedServerErrMsg(err: HttpErrorResponse) : string{
    return JSON.stringify(err.error)
    .replaceAll('{', ' ')
    .replaceAll('}', ' ')
    .replaceAll('"', ' ')
  }

  getMyUrl(){
    return  window.location.href;
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

  getUsername(): string | null | '' {
    return window.localStorage.getItem("username");
  }

  getRole(): string | null {
    return window.localStorage.getItem("role");
  }

  getMember(): Member | null {
    const member = window.localStorage.getItem("member");
  if (member !== null) {
    return JSON.parse(member) as Member;
  }
  return null;
  }

  resetAuthToken() {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("auth_token_refresh");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("member");
  }

  setMember(member: Member){
    window.localStorage.setItem("member", JSON.stringify(member));
  }

  setAuthToken(
    token: string | null,
    tokenRefresh: string,
    username: string,
    role: string): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
      window.localStorage.setItem("auth_token_refresh", tokenRefresh);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("role", role);
    } else {
      this.resetAuthToken();
    }
  }

  refreshPage() {
    window.location.reload();
  }
}