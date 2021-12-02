import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsEditFormComponent } from './settings-years-edit-form.component';

describe('SettingsYearsEditFormComponent', () => {
  let component: SettingsYearsEditFormComponent;
  let fixture: ComponentFixture<SettingsYearsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
