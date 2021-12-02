import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceCreateComponent } from './licence-create.component';

describe('LicenceCreateComponent', () => {
  let component: LicenceCreateComponent;
  let fixture: ComponentFixture<LicenceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
