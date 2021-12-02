import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsDuplicateFormComponent } from './assessments-duplicate-form.component';

describe('AssessmentsDuplicateFormComponent', () => {
  let component: AssessmentsDuplicateFormComponent;
  let fixture: ComponentFixture<AssessmentsDuplicateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsDuplicateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsDuplicateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
