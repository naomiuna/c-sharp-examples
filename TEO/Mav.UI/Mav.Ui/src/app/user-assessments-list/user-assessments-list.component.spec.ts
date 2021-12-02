import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentsListComponent } from './user-assessments-list.component';

describe('UserAssessmentsListComponent', () => {
  let component: UserAssessmentsListComponent;
  let fixture: ComponentFixture<UserAssessmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
