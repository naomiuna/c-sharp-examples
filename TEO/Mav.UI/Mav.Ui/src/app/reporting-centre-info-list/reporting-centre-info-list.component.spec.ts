import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCentreInfoListComponent } from './reporting-centre-info-list.component';

describe('ReportingCentreInfoListComponent', () => {
  let component: ReportingCentreInfoListComponent;
  let fixture: ComponentFixture<ReportingCentreInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCentreInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCentreInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
