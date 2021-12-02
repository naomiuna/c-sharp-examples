import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAssessmentListComponent } from './reporting-assessment-list.component';

describe('ReportingAssessmentListComponent', () => {
  let component: ReportingAssessmentListComponent;
  let fixture: ComponentFixture<ReportingAssessmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingAssessmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
