import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsCreateFormComponent } from './organisations-create-form.component';

describe('OrganisationsCreateFormComponent', () => {
  let component: OrganisationsCreateFormComponent;
  let fixture: ComponentFixture<OrganisationsCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationsCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
