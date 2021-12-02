import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsCreateFormComponent } from './assessments-create-form.component';

describe('AssessmentsCreateFormComponent', () => {
  let component: AssessmentsCreateFormComponent;
  let fixture: ComponentFixture<AssessmentsCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
