import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrganisationtypeCreateComponent } from './settings-organisationtype-create.component';

describe('SettingsOrganisationtypeCreateComponent', () => {
  let component: SettingsOrganisationtypeCreateComponent;
  let fixture: ComponentFixture<SettingsOrganisationtypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOrganisationtypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrganisationtypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
