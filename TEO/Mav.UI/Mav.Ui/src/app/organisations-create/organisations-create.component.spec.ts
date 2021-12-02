import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsCreateComponent } from './organisations-create.component';

describe('OrganisationsCreateComponent', () => {
  let component: OrganisationsCreateComponent;
  let fixture: ComponentFixture<OrganisationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
