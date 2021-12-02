import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsEditComponent } from './settings-years-edit.component';

describe('SettingsYearsEditComponent', () => {
  let component: SettingsYearsEditComponent;
  let fixture: ComponentFixture<SettingsYearsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
