import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { Member } from '../member.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_SYS_ERROR, MEMBERSHIP_ENDPOINT, MEMBERSHIP_STATUS } from 'src/app/constants';
import { MembershipRegService } from './membership.reg.service';
import { RenewComponent } from './renew/renew.component';
import { MemberRegistration } from './renew/member-registration.Model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-membership-reg',
  templateUrl: './membership.reg.component.html',
  styleUrls: ['./membership.reg.component.css']
})
export class MembershipRegComponent implements OnInit {

  showFiller = false;
  validMemberRegistration: MemberRegistration | null = null;
  membershipStatus: string = MEMBERSHIP_STATUS.EXPIRED;

  member: Member | null = null;

  errorMessage: string = '';
  hasError: boolean = false;

  displayedColumnsHistory: string[] = [
    'plan',
    'registration-date',
    'start-date',
    'end-date',
    'price',
    'paid-by',
    'paid'
  ];

  displayedColumns: string[] = [
    'action',
    'plan',
    'type',
    'price'
  ];

  membershipDataSource!: MatTableDataSource<any>;
  membershipHistoryDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private _commonService: CommonService,
    private _coreService: CoreService,
    private membershipRegService: MembershipRegService
  ) { }

  ngOnInit(): void {
    if (this._coreService.getAuthToken()) {
      this.member = this._coreService.getMember();

      this.populatePageData();

    } else {
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
  }

  renewForm(id: number) {
    const data = {
      memberRegistration: MemberRegistration,
      membershipId: id,
    };
    const dialogRef = this._dialog.open(RenewComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.populatePageData();
        }
      },
    });
  }

  populatePageData() {
    this.getValidMembership();

    this.getMembershipList();

    this.getMembershipHistory();
  }

  getValidMembership() {
    this.membershipRegService.getValidRegistration().subscribe({
      next: (res: MemberRegistration) => {
        this.validMemberRegistration = res;
        if (this.validMemberRegistration.status === true) {
          this.membershipStatus = MEMBERSHIP_STATUS.ACTIVE
        } else {
          this.membershipStatus = MEMBERSHIP_STATUS.PENDING
        }

      },
      error: (err: any) => {
        this.handleError('Error loding valid registration request!! ', err);
      },
    });
  }


  getMembershipList() {
    this._commonService.getAll(`${MEMBERSHIP_ENDPOINT}`).subscribe({
      next: (res) => {
        this.membershipDataSource = new MatTableDataSource(res);
        this.membershipDataSource.sort = this.sort;
        this.membershipDataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error loding membership!! ', err);
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.membershipDataSource.filter = filterValue.trim().toLowerCase();

    if (this.membershipDataSource.paginator) {
      this.membershipDataSource.paginator.firstPage();
    }
  }

  getMembershipHistory() {
    this.membershipRegService.getMemberRegistrationHistory().subscribe({
      next: (res) => {
        this.membershipHistoryDataSource = new MatTableDataSource(res);
        this.membershipHistoryDataSource.sort = this.sort;
        this.membershipHistoryDataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error loding membership registration hostory!! ', err);
      },
    });
  }

  applyFilterOnHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.membershipHistoryDataSource.filter = filterValue.trim().toLowerCase();

    if (this.membershipHistoryDataSource.paginator) {
      this.membershipHistoryDataSource.paginator.firstPage();
    }
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
