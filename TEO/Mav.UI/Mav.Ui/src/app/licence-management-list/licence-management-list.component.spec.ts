import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceManagementListComponent } from './licence-management-list.component';

describe('LicenceManagementListComponent', () => {
  let component: LicenceManagementListComponent;
  let fixture: ComponentFixture<LicenceManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
