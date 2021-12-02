import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditFormComponent } from './assessments-section-edit-form.component';

describe('AssessmentsSectionEditFormComponent', () => {
  let component: AssessmentsSectionEditFormComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
