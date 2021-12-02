import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsEditStatementComponent } from './assessments-edit-statement.component';

describe('AssessmentsEditStatementComponent', () => {
  let component: AssessmentsEditStatementComponent;
  let fixture: ComponentFixture<AssessmentsEditStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsEditStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsEditStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
