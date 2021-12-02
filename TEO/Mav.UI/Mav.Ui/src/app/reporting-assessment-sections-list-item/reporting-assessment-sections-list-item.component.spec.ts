import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAssessmentSectionsListItemComponent } from './reporting-assessment-sections-list-item.component';

describe('ReportingAssessmentSectionsListItemComponent', () => {
  let component: ReportingAssessmentSectionsListItemComponent;
  let fixture: ComponentFixture<ReportingAssessmentSectionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingAssessmentSectionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingAssessmentSectionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
