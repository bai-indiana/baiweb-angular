import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByLawsComponent } from './by-laws.component';

describe('ByLawsComponent', () => {
  let component: ByLawsComponent;
  let fixture: ComponentFixture<ByLawsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ByLawsComponent]
    });
    fixture = TestBed.createComponent(ByLawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
