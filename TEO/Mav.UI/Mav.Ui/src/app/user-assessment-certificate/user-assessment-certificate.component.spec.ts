import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentCertificateComponent } from './user-assessment-certificate.component';

describe('UserAssessmentCertificateComponent', () => {
  let component: UserAssessmentCertificateComponent;
  let fixture: ComponentFixture<UserAssessmentCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
