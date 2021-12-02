import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltDetailsAssessmentComponent } from './slt-details-assessment.component';

describe('SltDetailsAssessmentComponent', () => {
  let component: SltDetailsAssessmentComponent;
  let fixture: ComponentFixture<SltDetailsAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltDetailsAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltDetailsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
