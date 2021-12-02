import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAssessmentSectionsListComponent } from './reporting-assessment-sections-list.component';

describe('ReportingAssessmentSectionsListComponent', () => {
  let component: ReportingAssessmentSectionsListComponent;
  let fixture: ComponentFixture<ReportingAssessmentSectionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingAssessmentSectionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingAssessmentSectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
