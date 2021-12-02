import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionAddFormComponent } from './assessments-section-add-form.component';

describe('AssessmentsSectionAddFormComponent', () => {
  let component: AssessmentsSectionAddFormComponent;
  let fixture: ComponentFixture<AssessmentsSectionAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
