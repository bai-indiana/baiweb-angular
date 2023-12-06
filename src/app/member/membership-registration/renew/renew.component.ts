import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PAYMENT_TYPES, BACKEND_SYS_ERROR } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { MemberRegistration } from './member-registration.Model';
import { RenewService } from './renew.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  paidBy: string[] = PAYMENT_TYPES;

  isSubmitting = false;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  renewForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<RenewComponent>,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private renewService: RenewService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.renewForm = this.formBuilder.group({
      paidBy: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.renewForm.patchValue(this.data.memberRegistration);
  }

  onFormSubmit() {
    if (this.renewForm.valid) {
      if (this.data.membershipId) {
        this.renewService
          .addMemberRegistration(this.data.membershipId, this.renewForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Renew Success!! Please wait for the payment confirmation');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              this.handleError("renew", err);
            },
          });
      } else {
        console.log("Membership id not avaiable for renew!!");
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
