import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentSectionStatementComponent } from './user-assessment-section-statement.component';

describe('UserAssessmentSectionStatementComponent', () => {
  let component: UserAssessmentSectionStatementComponent;
  let fixture: ComponentFixture<UserAssessmentSectionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentSectionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentSectionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
