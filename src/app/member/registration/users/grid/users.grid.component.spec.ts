import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGridComponent } from './users.grid.component';

describe('GridComponent', () => {
  let component: UsersGridComponent;
  let fixture: ComponentFixture<UsersGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersGridComponent]
    });
    fixture = TestBed.createComponent(UsersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
