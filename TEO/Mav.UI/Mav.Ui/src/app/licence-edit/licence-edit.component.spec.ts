import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceEditComponent } from './licence-edit.component';

describe('LicenceEditComponent', () => {
  let component: LicenceEditComponent;
  let fixture: ComponentFixture<LicenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
