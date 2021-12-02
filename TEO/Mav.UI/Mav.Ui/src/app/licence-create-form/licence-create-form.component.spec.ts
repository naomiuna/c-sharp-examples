import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceCreateFormComponent } from './licence-create-form.component';

describe('LicenceCreateFormComponent', () => {
  let component: LicenceCreateFormComponent;
  let fixture: ComponentFixture<LicenceCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
