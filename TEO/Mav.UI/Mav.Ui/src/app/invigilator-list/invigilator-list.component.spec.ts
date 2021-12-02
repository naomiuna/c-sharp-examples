import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorListComponent } from './invigilator-list.component';

describe('InvigilatorListComponent', () => {
  let component: InvigilatorListComponent;
  let fixture: ComponentFixture<InvigilatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
