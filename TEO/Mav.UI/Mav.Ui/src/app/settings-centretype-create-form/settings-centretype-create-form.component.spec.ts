import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeCreateFormComponent } from './settings-centretype-create-form.component';

describe('SettingsCentretypeCreateFormComponent', () => {
  let component: SettingsCentretypeCreateFormComponent;
  let fixture: ComponentFixture<SettingsCentretypeCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
