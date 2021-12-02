import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditComponent } from './assessments-section-edit.component';

describe('AssessmentsSectionEditComponent', () => {
  let component: AssessmentsSectionEditComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
