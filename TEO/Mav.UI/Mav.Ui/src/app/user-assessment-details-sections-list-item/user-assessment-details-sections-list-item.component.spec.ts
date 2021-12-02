import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsSectionsListItemComponent } from './user-assessment-details-sections-list-item.component';

describe('UserAssessmentDetailsSectionsListItemComponent', () => {
  let component: UserAssessmentDetailsSectionsListItemComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsSectionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsSectionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentDetailsSectionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
