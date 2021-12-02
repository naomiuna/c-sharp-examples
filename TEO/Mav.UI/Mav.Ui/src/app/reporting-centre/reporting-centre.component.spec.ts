import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCentreComponent } from './reporting-centre.component';

describe('ReportingCentreComponent', () => {
  let component: ReportingCentreComponent;
  let fixture: ComponentFixture<ReportingCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
