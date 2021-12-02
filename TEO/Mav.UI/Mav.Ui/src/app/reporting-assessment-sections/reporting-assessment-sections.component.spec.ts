import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAssessmentSectionsComponent } from './reporting-assessment-sections.component';

describe('ReportingAssessmentSectionsComponent', () => {
  let component: ReportingAssessmentSectionsComponent;
  let fixture: ComponentFixture<ReportingAssessmentSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingAssessmentSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingAssessmentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
