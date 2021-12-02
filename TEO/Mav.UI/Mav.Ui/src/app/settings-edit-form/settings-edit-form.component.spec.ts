import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditFormComponent } from './settings-edit-form.component';

describe('SettingsEditFormComponent', () => {
  let component: SettingsEditFormComponent;
  let fixture: ComponentFixture<SettingsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
