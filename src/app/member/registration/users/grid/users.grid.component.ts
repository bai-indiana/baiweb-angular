import { Component, OnInit, ViewChild } from '@angular/core';
import { BACKEND_SYS_ERROR, FAMILY_ENDPOINT, MEMBER_ENDPOINT } from 'src/app/constants';
import { RegistrationComponent } from '../../registration.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FamilyComponent } from 'src/app/member/profile/family/family.component';
import { Family } from 'src/app/member/profile/family/family.model';
import { CommonService } from 'src/app/shared/common.service';
import { Member } from 'src/app/member/member.model';
import { FamilyGridComponent } from 'src/app/member/profile/family/grid/family.grid.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users.grid.component.html',
  styleUrls: ['./users.grid.component.css']
})
export class UsersGridComponent implements OnInit {
  
  errorMessage: string = '';
  hasError: boolean = false;

  displayedUsersColumns: string[] = [
    'action',
    'id',
    'first-name',
    'last-name',
    'email',
    'dob',
    'gender',
    'address',
    'apt',
    'city',
    'state',
    'zip',
    'phone',
    'last-login',
    'status',
    'verified',
    'last-password-changed',
    // 'temp-password-changed',
    'role',
    'family'

  ];
  dataSourceUsers!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private _commonService: CommonService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    if (this._coreService.getAuthToken()) {
      this.getMemberList();
    } else {
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
  }

  openAddForm() {
    const dialogRef = this._dialog.open(RegistrationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMemberList();
        }
      },
    });
  }

  getMemberList() {
    this._commonService.getAll(`${MEMBER_ENDPOINT}/list`).subscribe({
      next: (res) => {
        this.dataSourceUsers = new MatTableDataSource(res);
        this.dataSourceUsers.sort = this.sort;
        this.dataSourceUsers.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error loding users!! ', err);
      },
    });
  }

  applyFilterOnUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUsers.paginator) {
      this.dataSourceUsers.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this._commonService.delete(id,MEMBER_ENDPOINT).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Family deleted!', 'done');
        this.getMemberList();
      },
      error: console.log,
    });
  }

  openMemberEditForm(data: Member) {
    const dialogRef = this._dialog.open(RegistrationComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMemberList();
        }
      },
    });
  }

  showFamily(data : Member){
    const dialogRef = this._dialog.open(FamilyGridComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMemberList();
        }
      },
    });
  }

  handleError(method: string, err: HttpErrorResponse){
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