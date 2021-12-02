import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeListComponent } from './settings-centretype-list.component';

describe('SettingsCentretypeListComponent', () => {
  let component: SettingsCentretypeListComponent;
  let fixture: ComponentFixture<SettingsCentretypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
