import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsCreateComponent } from './settings-years-create.component';

describe('SettingsYearsCreateComponent', () => {
  let component: SettingsYearsCreateComponent;
  let fixture: ComponentFixture<SettingsYearsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
