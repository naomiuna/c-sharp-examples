import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsSectionsListMinitemComponent } from './user-assessment-details-sections-list-minitem.component';

describe('UserAssessmentDetailsSectionsListMinitemComponent', () => {
  let component: UserAssessmentDetailsSectionsListMinitemComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsSectionsListMinitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsSectionsListMinitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentDetailsSectionsListMinitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
