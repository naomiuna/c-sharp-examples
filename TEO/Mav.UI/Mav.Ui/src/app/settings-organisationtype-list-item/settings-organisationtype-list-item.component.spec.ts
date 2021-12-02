import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeListItemComponent } from './settings-organisationtype-list-item.component';

describe('SettingsOrganisationtypeListItemComponent', () => {
  let component: SettingsOrganisationtypeListItemComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
