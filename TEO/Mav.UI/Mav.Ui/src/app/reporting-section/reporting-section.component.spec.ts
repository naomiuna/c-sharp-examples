import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingSectionComponent } from './reporting-section.component';

describe('ReportingSectionComponent', () => {
  let component: ReportingSectionComponent;
  let fixture: ComponentFixture<ReportingSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
