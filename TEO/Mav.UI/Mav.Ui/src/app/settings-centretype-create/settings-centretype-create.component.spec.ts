import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeCreateComponent } from './settings-centretype-create.component';

describe('SettingsCentretypeCreateComponent', () => {
  let component: SettingsCentretypeCreateComponent;
  let fixture: ComponentFixture<SettingsCentretypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
