import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceManagementListItemComponent } from './licence-management-list-item.component';

describe('LicenceManagementListItemComponent', () => {
  let component: LicenceManagementListItemComponent;
  let fixture: ComponentFixture<LicenceManagementListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceManagementListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceManagementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
