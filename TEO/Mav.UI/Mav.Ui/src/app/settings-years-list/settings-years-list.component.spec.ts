import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsYearsListComponent } from './settings-years-list.component';

describe('SettingsYearsListComponent', () => {
  let component: SettingsYearsListComponent;
  let fixture: ComponentFixture<SettingsYearsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsYearsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsYearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
