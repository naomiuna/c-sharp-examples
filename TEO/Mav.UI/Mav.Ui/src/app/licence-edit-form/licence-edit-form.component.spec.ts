import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceEditFormComponent } from './licence-edit-form.component';

describe('LicenceEditFormComponent', () => {
  let component: LicenceEditFormComponent;
  let fixture: ComponentFixture<LicenceEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
