import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { Member } from 'src/app/member/member.model';
import { BACKEND_SYS_ERROR } from 'src/app/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {
  username = '' ;
 
  errorMessage: string = '';
 
  constructor(
    private commonService: CommonService,
    private _coreService: CoreService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    if(this._coreService.getAuthToken()){
        this.username = `${this._coreService.getUsername()}`;
        this.commonService.getByUsername(this.username).subscribe({
          next: (res: Member) => {
            if(res.role === 'ADMIN'){
            }else{
            }
          },
          error: (err: any) => {
            this.handleError('loading nevigation after login', err);
          },
        });
    }else{
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
     
  }


  handleError(method: string, err: HttpErrorResponse) {
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
