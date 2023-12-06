import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipGridComponent } from './membership.grid.component';

describe('GridComponent', () => {
  let component: MembershipGridComponent;
  let fixture: ComponentFixture<MembershipGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipGridComponent]
    });
    fixture = TestBed.createComponent(MembershipGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
