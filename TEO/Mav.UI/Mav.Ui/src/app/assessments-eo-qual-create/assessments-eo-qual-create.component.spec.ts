import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsEoQualCreateComponent } from './assessments-eo-qual-create.component';

describe('AssessmentsEoQualCreateComponent', () => {
  let component: AssessmentsEoQualCreateComponent;
  let fixture: ComponentFixture<AssessmentsEoQualCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsEoQualCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsEoQualCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
