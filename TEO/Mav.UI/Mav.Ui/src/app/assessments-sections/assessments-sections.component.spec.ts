import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionsComponent } from './assessments-sections.component';

describe('AssessmentsSectionsComponent', () => {
  let component: AssessmentsSectionsComponent;
  let fixture: ComponentFixture<AssessmentsSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
