import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityConfidentialityAgreementComponent } from './security-confidentiality-agreement.component';

describe('SecurityConfidentialityAgreementComponent', () => {
  let component: SecurityConfidentialityAgreementComponent;
  let fixture: ComponentFixture<SecurityConfidentialityAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityConfidentialityAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityConfidentialityAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
