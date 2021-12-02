import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditStatementComponent } from './assessments-section-edit-statement.component';

describe('AssessmentsSectionEditStatementComponent', () => {
  let component: AssessmentsSectionEditStatementComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
