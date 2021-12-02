import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsListItemComponent } from './assessments-list-item.component';

describe('AssessmentsListItemComponent', () => {
  let component: AssessmentsListItemComponent;
  let fixture: ComponentFixture<AssessmentsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
