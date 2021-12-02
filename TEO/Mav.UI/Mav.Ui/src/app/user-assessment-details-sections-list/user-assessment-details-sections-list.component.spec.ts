import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsSectionsListComponent } from './user-assessment-details-sections-list.component';

describe('UserAssessmentDetailsSectionsListComponent', () => {
  let component: UserAssessmentDetailsSectionsListComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsSectionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsSectionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentDetailsSectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
