import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/shared/common.service';
import { FamilyComponent } from '../family.component';
import { Member } from 'src/app/member/member.model';
import { Router } from '@angular/router';
import { BACKEND_SYS_ERROR, FAMILY_ENDPOINT } from 'src/app/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Family } from '../family.model';

@Component({
  selector: 'app-family-grid',
  templateUrl: './family.grid.component.html',
  styleUrls: ['./family.grid.component.css']
})
export class FamilyGridComponent implements OnInit {
  
  member: Member | null = null;

  errorMessage: string = '';
  hasError: boolean = false;

  displayedColumns: string[] = [
    'action',
    'fullName',
    'email',
    'dob',
    'relationshipType',
    'phone'
  ];
  dataSource!: MatTableDataSource<any>;

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
      this.member = this._coreService.getMember();
      this.getFamList();
    } else {
      this._coreService.openSnackBar('Page access denied!! Not authorized');
      this.router.navigate(['/home']);
    }
  }

  openAddEditFamForm() {
    const dialogRef = this._dialog.open(FamilyComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFamList();
        }
      },
    });
  }

  getFamList() {
    this._commonService.getAll(`${FAMILY_ENDPOINT}/m=${this.member?.id}`).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        this.handleError('Error loding profile!! ', err);
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

  deleteFam(id: number) {
    this._commonService.delete(id,FAMILY_ENDPOINT).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Family deleted!', 'done');
        this.getFamList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Family) {
    const dialogRef = this._dialog.open(FamilyComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFamList();
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