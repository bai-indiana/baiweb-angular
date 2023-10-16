import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveCommitteeComponent } from './executive-committee.component';

describe('ExecutiveCommitteeComponent', () => {
  let component: ExecutiveCommitteeComponent;
  let fixture: ComponentFixture<ExecutiveCommitteeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutiveCommitteeComponent]
    });
    fixture = TestBed.createComponent(ExecutiveCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
