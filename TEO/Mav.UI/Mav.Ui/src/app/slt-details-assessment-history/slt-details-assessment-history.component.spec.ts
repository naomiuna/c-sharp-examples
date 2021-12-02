import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltDetailsAssessmentHistoryComponent } from './slt-details-assessment-history.component';

describe('SltDetailsAssessmentHistoryComponent', () => {
  let component: SltDetailsAssessmentHistoryComponent;
  let fixture: ComponentFixture<SltDetailsAssessmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltDetailsAssessmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltDetailsAssessmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
