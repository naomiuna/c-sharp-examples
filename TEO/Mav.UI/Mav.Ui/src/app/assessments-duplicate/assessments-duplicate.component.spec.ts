import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsDuplicateComponent } from './assessments-duplicate.component';

describe('AssessmentsDuplicateComponent', () => {
  let component: AssessmentsDuplicateComponent;
  let fixture: ComponentFixture<AssessmentsDuplicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsDuplicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
