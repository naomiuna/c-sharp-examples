import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeEditFormComponent } from './settings-organisationtype-edit-form.component';

describe('SettingsOrganisationtypeEditFormComponent', () => {
  let component: SettingsOrganisationtypeEditFormComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
