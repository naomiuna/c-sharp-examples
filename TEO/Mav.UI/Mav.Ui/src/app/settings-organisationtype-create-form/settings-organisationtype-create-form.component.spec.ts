import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeCreateFormComponent } from './settings-organisationtype-create-form.component';

describe('SettingsOrganisationtypeCreateFormComponent', () => {
  let component: SettingsOrganisationtypeCreateFormComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
