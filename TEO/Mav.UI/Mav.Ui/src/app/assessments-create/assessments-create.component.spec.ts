import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsCreateComponent } from './assessments-create.component';

describe('AssessmentsCreateComponent', () => {
  let component: AssessmentsCreateComponent;
  let fixture: ComponentFixture<AssessmentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
