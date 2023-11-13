import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BACKEND_SYS_ERROR, UPD_PASS_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { confirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  memberId: number = 0;

  passwordForm: FormGroup;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<PasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      memberId: number
    }
  ) {
    this.memberId = data.memberId;
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      { validators: confirmPasswordValidator }
    );
  }



  ngOnInit(): void {
    this.passwordForm.patchValue(this.data);
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.isSubmitting = true;
      this.commonService.update(this.memberId, this.passwordForm.value, UPD_PASS_ENDPOINT).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar("Password Updated Successfully");
          this.onAlertClose();
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          alert('Faled');
          this.handleError('updatePassword', err);

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
      this.errorMessage = this._coreService.getFormatedServerErrMsg(err);
    }
  }
}
