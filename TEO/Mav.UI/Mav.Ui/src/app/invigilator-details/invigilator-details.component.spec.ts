import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorDetailsComponent } from './invigilator-details.component';

describe('InvigilatorDetailsComponent', () => {
  let component: InvigilatorDetailsComponent;
  let fixture: ComponentFixture<InvigilatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
