import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsCentreListComponent } from './organisations-centre-list.component';

describe('OrganisationsCentreListComponent', () => {
  let component: OrganisationsCentreListComponent;
  let fixture: ComponentFixture<OrganisationsCentreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationsCentreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsCentreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
