import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsDetailsComponent } from './organisations-details.component';

describe('OrganisationsDetailsComponent', () => {
  let component: OrganisationsDetailsComponent;
  let fixture: ComponentFixture<OrganisationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
