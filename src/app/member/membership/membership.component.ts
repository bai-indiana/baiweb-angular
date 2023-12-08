import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MEMBERSHIP_ENDPOINT, BACKEND_SYS_ERROR, MEMBERSHIP_TYPES } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Membership } from './membership.model';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  types: string[] = MEMBERSHIP_TYPES;

  isSubmitting = false;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  membershipForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<MembershipComponent>,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: Membership
  ) {
    this.membershipForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.membershipForm.patchValue(this.data);
  }

  onFormSubmit() {

    if (this.membershipForm.valid) {
      this.isSubmitting = true;
      if (this.data) {
        this.commonService
          .update(this.data.id, this.membershipForm.value, MEMBERSHIP_ENDPOINT)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Membership detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              this.handleError("onFormSubmit", err);
            },
          });
      } else {
        this.commonService.add(this.membershipForm.value, MEMBERSHIP_ENDPOINT).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Membership added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
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
