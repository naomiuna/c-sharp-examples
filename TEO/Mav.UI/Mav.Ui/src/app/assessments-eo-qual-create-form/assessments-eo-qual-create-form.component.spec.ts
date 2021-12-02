import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsEoQualCreateFormComponent } from './assessments-eo-qual-create-form.component';

describe('AssessmentsEoQualCreateFormComponent', () => {
  let component: AssessmentsEoQualCreateFormComponent;
  let fixture: ComponentFixture<AssessmentsEoQualCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsEoQualCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsEoQualCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
