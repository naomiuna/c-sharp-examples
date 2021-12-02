import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentHistoryListComponent } from './user-assessment-history-list.component';

describe('UserAssessmentHistoryListComponent', () => {
  let component: UserAssessmentHistoryListComponent;
  let fixture: ComponentFixture<UserAssessmentHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
