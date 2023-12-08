import { Component } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {



  constructor(
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
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


}
