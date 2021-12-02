import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeEditComponent } from './settings-centretype-edit.component';

describe('SettingsCentretypeEditComponent', () => {
  let component: SettingsCentretypeEditComponent;
  let fixture: ComponentFixture<SettingsCentretypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
