import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCentreListComponent } from './reporting-centre-list.component';

describe('ReportingCentreListComponent', () => {
  let component: ReportingCentreListComponent;
  let fixture: ComponentFixture<ReportingCentreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCentreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCentreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
