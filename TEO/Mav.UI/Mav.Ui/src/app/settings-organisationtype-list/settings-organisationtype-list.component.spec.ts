import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeListComponent } from './settings-organisationtype-list.component';

describe('SettingsOrganisationtypeListComponent', () => {
  let component: SettingsOrganisationtypeListComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
