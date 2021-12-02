import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentSectionIntroComponent } from './user-assessment-section-intro.component';

describe('UserAssessmentSectionIntroComponent', () => {
  let component: UserAssessmentSectionIntroComponent;
  let fixture: ComponentFixture<UserAssessmentSectionIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentSectionIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentSectionIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
