import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeEditComponent } from './settings-organisationtype-edit.component';

describe('SettingsOrganisationtypeEditComponent', () => {
  let component: SettingsOrganisationtypeEditComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
