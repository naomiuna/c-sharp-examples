import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsEditFormComponent } from './organisations-edit-form.component';

describe('OrganisationsEditFormComponent', () => {
  let component: OrganisationsEditFormComponent;
  let fixture: ComponentFixture<OrganisationsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
