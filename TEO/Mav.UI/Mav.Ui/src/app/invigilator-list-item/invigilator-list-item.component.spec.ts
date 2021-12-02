import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorListItemComponent } from './invigilator-list-item.component';

describe('InvigilatorListItemComponent', () => {
  let component: InvigilatorListItemComponent;
  let fixture: ComponentFixture<InvigilatorListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
