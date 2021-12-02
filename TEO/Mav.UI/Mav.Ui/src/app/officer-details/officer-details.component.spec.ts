import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerDetailsComponent } from './officer-details.component';

describe('OfficerDetailsComponent', () => {
  let component: OfficerDetailsComponent;
  let fixture: ComponentFixture<OfficerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
