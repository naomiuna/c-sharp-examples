import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsEditComponent } from './assessments-edit.component';

describe('AssessmentsEditComponent', () => {
  let component: AssessmentsEditComponent;
  let fixture: ComponentFixture<AssessmentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
