import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BACKEND_SYS_ERROR, DATE_FORMAT, FAMILY_ENDPOINT, RELATION_TYPES, STATE_LIST } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { Member } from 'src/app/member/member.model';
import { CommonService } from 'src/app/shared/common.service';
import { Family } from './family.model';
import { FamilyService } from './family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
 
  // family: Family | null = null;

  // famId: number = 0;

  relationType: string[] = RELATION_TYPES;
  isSubmitting = false;

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  famForm: FormGroup;

  constructor(
    private router: Router,
    private _dialogRef: MatDialogRef<FamilyComponent>,
    private commonService: CommonService,
    private familyService: FamilyService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Family
  ) {
    // this.famId = data.id;
    this.famForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      fullName: ['', Validators.required],
      dob: [null, Validators.required],
      relationshipType: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {
    if(this.data){
      this.data.dob = new Date(`${this.datePipe.transform(new Date(this.data.dob), DATE_FORMAT)}`);
    }
    this.famForm.patchValue(this.data);
  }
 
  onFamFormSubmit() {
    if (this.famForm.valid) {
      this.isSubmitting = true;
      if (this.data) {
        this.commonService
          .update(this.data.id, this.famForm.value,FAMILY_ENDPOINT)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Family detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
             this.handleError("onFamFormSubmit",err);
            },
          });
      } else {
        this.familyService.add(this.famForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Family added successfully');
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
