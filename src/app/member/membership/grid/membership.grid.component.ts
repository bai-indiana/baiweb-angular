import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from '../membership.model';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MEMBERSHIP_ENDPOINT, BACKEND_SYS_ERROR, MEMBERSHIP_REGISTRATION_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MembershipComponent } from '../membership.component';
import { MembershipGridService } from './membership-grid.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-membership-grid',
  templateUrl: './membership.grid.component.html',
  styleUrls: ['./membership.grid.component.css']
})
export class MembershipGridComponent implements OnInit  {


  membership: Membership | null = null;

  errorMessage: string = '';
  hasError: boolean = false;

  displayedColumns: string[] = [
    'action',
    'plan',
    'type',
    'price'
  ];
  dataSource!: MatTableDataSource<any>;

  displayedColumnsActiveMembers: string[] = [
    'id',
    'name',
    'email',
    'plan',
    'price',
    'date-of-reg',
    'start-date',
    'end-date',
    'paid-by',
    'payment-received',
    'status'
  ];
  dataSourceActiveMembers!: MatTableDataSource<any>;

  displayedColumnsPendingMembers: string[] = [
    'action',
    'id',
    'name',
    'email',
    'plan',
    'price',
    'date-of-reg',
    'start-date',
    'end-date',
    'paid-by',
    'payment-received',
    'status'
  ];
  dataSourcePendingMembers!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private _commonService: CommonService,
    private _coreService: CoreService,
    private  membershipGridService: MembershipGridService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this._coreService.getAuthToken()) {
      this.getList();
      this.getPendingMembers();
      this.getActiveMembers();
    } else {
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
  }

  openAddForm() {
    const dialogRef = this._dialog.open(MembershipComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }


  getList() {
    this._commonService.getAll(`${MEMBERSHIP_ENDPOINT}`).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error loding membership!! ', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    this._commonService.delete(id,MEMBERSHIP_ENDPOINT).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Membership deleted!', 'done');
        this.getList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Membership) {
    const dialogRef = this._dialog.open(MembershipComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }


  getActiveMembers() {
    this.membershipGridService.getActiveMembershipReg().subscribe({
      next: (res) => {
        this.dataSourceActiveMembers = new MatTableDataSource(res);
        this.dataSourceActiveMembers.sort = this.sort;
        this.dataSourceActiveMembers.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error fetching active membership!! ', err);
      },
    });
  }

  applyFilterOnActiveMembers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiveMembers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActiveMembers.paginator) {
      this.dataSourceActiveMembers.paginator.firstPage();
    }
  }

  getPendingMembers() {
    this.membershipGridService.getPendingMembershipReg().subscribe({
      next: (res) => {
        this.dataSourcePendingMembers = new MatTableDataSource(res);
        this.dataSourcePendingMembers.sort = this.sort;
        this.dataSourcePendingMembers.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error fetching pending membership!! ', err);
      },
    });
  }

  applyFilterOnPendingMembers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePendingMembers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePendingMembers.paginator) {
      this.dataSourcePendingMembers.paginator.firstPage();
    }
  }

  approve(id: number) {
    this.membershipGridService.approve(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Membership approved!', 'done');
        this.getPendingMembers() ;
        this.getActiveMembers() ;
      },
      error: console.log,
    });
  }
  

  cancelMembership(id: number) {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        message: "Are you sure want to cancel?",
        id: id,
        buttonText: {
          ok: 'Confirm',
          cancel: "No"
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelMembershipSubmit(id);
        this._coreService.openSnackBar('You have successfully cancelled this membership!', 'done');
      }
    });
  }

  cancelMembershipSubmit(id: number) {
    this._commonService.delete(id,`${MEMBERSHIP_REGISTRATION_ENDPOINT}`).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Membership cancelled!', 'done');
        this.getPendingMembers() ;
        this.getActiveMembers() ;
      },
      error: console.log,
    });
  }

  handleError(method: string, err: HttpErrorResponse) {
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