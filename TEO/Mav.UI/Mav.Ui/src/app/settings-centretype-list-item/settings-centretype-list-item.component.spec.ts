import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCentretypeListItemComponent } from './settings-centretype-list-item.component';

describe('SettingsCentretypeListItemComponent', () => {
  let component: SettingsCentretypeListItemComponent;
  let fixture: ComponentFixture<SettingsCentretypeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCentretypeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCentretypeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
