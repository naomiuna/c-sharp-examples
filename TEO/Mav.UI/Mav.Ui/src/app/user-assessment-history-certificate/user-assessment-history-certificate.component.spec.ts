import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentHistoryCertificateComponent } from './user-assessment-history-certificate.component';

describe('UserAssessmentHistoryCertificateComponent', () => {
  let component: UserAssessmentHistoryCertificateComponent;
  let fixture: ComponentFixture<UserAssessmentHistoryCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentHistoryCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentHistoryCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
