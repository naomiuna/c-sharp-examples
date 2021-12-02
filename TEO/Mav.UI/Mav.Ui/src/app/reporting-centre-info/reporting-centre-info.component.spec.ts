import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCentreInfoComponent } from './reporting-centre-info.component';

describe('ReportingCentreInfoComponent', () => {
  let component: ReportingCentreInfoComponent;
  let fixture: ComponentFixture<ReportingCentreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCentreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCentreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
