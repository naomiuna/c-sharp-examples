import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsEditFormComponent } from './assessments-edit-form.component';

describe('AssessmentsEditFormComponent', () => {
  let component: AssessmentsEditFormComponent;
  let fixture: ComponentFixture<AssessmentsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
