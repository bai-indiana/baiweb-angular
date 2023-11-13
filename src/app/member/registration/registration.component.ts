import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MEMBER_REGISTRATION_ENDPOINT } from '../../constants';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_SYS_ERROR } from '../../constants';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  state: string[] = [
    'IN',
    'OH',
    'KY'
  ];
  isSubmitting = false; // Initially, the button is not disabled

  apiResponse: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  memberForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<RegistrationComponent>,
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
      phone: [null, [Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern("^[0-9]*$")]]
    });
  }



  ngOnInit(): void {
    this.memberForm.patchValue(this.data);
  }

  onAddMemberSubmit() {

    if (this.memberForm.valid) {
      this.isSubmitting = true;
      this.commonService.add(this.memberForm.value,MEMBER_REGISTRATION_ENDPOINT).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Member added successfully, Please check your email for login details');
          this.onAlertClose();
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          this.handleError('onSubmit', err);
        },
      });
    }
  }

  onAlertClose(){
    this.hasError = false;
  }

  handleError(method: string, err: HttpErrorResponse){
    this.isSubmitting = false;
    this.hasError = true;
    console.error(err.error);
    if(err.status==403){
      this.errorMessage=BACKEND_SYS_ERROR;
    }else{
      this.errorMessage=JSON.stringify(err.error)
                                .replaceAll('{',' ')
                                .replaceAll('}',' ')
                                .replaceAll('"',' ');
    }
   
  }
}

