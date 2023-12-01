import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { Member } from 'src/app/member/member.model';
import { BACKEND_SYS_ERROR, MEMBER_ENDPOINT, MEMBER_REGISTRATION_ENDPOINT, STATE_LIST } from 'src/app/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PasswordComponent } from './password/password/password.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  memberId: number = 0;

  state: string[] = STATE_LIST;
  isSubmitting = false;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  memberForm: FormGroup;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.memberForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      addressStreet1: ['', Validators.required],
      addressStreet2: [''],
      addressCity: ['', Validators.required],
      addressState: ['', Validators.required],
      addressZip: [null, [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    const member = this._coreService.getMember();
    if (member) {
      this.memberId = member.id;
      member.dob = new Date(`${this.datePipe.transform(new Date(member.dob), 'yyyy-MM-dd')}`);
      this.memberForm.patchValue(member);
    } else {
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
  }

  update() {
    if (this.memberForm.valid) {
      this.isSubmitting = true;
      this.commonService.update(this.memberId, this.memberForm.value, MEMBER_ENDPOINT).subscribe({
        next: (member: Member) => {

          this.memberId = member.id;
          member.dob = new Date(`${this.datePipe.transform(new Date(member.dob), 'yyyy-MM-dd')}`);
          this.memberForm.patchValue(member);


          this._coreService.openSnackBar('Update successfully');
          this.onAlertClose();
          this.isSubmitting = false;
        },
        error: (err: any) => {
          this.handleError('onSubmit', err);
        },
      });
    }
  }

  reset() {
    this._coreService.refreshPage();
  }


  onAlertClose() {
    this.hasError = false;
  }

  passwordForm() {
    const dialogRef = this._dialog.open(PasswordComponent,
      {
        data: { memberId: this.memberId },
      });
    dialogRef.afterClosed().subscribe({
      // next: (val) => {
      //   if (val) {
      //     this.showLoginPage();
      //   }
      // },
    });
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
