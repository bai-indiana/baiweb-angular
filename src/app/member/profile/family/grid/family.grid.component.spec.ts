import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyGridComponent } from './family.grid.component';

describe('GridComponent', () => {
  let component: FamilyGridComponent;
  let fixture: ComponentFixture<FamilyGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyGridComponent]
    });
    fixture = TestBed.createComponent(FamilyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
