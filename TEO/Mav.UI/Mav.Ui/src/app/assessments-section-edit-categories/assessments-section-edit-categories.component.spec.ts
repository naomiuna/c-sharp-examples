import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditCategoriesComponent } from './assessments-section-edit-categories.component';

describe('AssessmentsSectionEditCategoriesComponent', () => {
  let component: AssessmentsSectionEditCategoriesComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
