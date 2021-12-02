import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsListItemComponent } from './settings-years-list-item.component';

describe('SettingsYearsListItemComponent', () => {
  let component: SettingsYearsListItemComponent;
  let fixture: ComponentFixture<SettingsYearsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
