import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeEditFormComponent } from './settings-centretype-edit-form.component';

describe('SettingsCentretypeEditFormComponent', () => {
  let component: SettingsCentretypeEditFormComponent;
  let fixture: ComponentFixture<SettingsCentretypeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
