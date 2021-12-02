import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentsComponent } from './user-assessments.component';

describe('UserAssessmentsComponent', () => {
  let component: UserAssessmentsComponent;
  let fixture: ComponentFixture<UserAssessmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
