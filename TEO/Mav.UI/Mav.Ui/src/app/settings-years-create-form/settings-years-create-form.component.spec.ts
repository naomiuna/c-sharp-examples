import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsCreateFormComponent } from './settings-years-create-form.component';

describe('SettingsYearsCreateFormComponent', () => {
  let component: SettingsYearsCreateFormComponent;
  let fixture: ComponentFixture<SettingsYearsCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
