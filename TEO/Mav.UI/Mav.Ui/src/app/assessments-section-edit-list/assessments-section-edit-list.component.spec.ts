import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditListComponent } from './assessments-section-edit-list.component';

describe('AssessmentsSectionEditListComponent', () => {
  let component: AssessmentsSectionEditListComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
