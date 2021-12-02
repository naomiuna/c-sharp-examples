import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAssessmentListItemComponent } from './reporting-assessment-list-item.component';

describe('ReportingAssessmentListItemComponent', () => {
  let component: ReportingAssessmentListItemComponent;
  let fixture: ComponentFixture<ReportingAssessmentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingAssessmentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingAssessmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
