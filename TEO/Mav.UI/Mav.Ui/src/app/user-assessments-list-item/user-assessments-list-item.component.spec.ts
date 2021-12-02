import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentsListItemComponent } from './user-assessments-list-item.component';

describe('UserAssessmentsListItemComponent', () => {
  let component: UserAssessmentsListItemComponent;
  let fixture: ComponentFixture<UserAssessmentsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
