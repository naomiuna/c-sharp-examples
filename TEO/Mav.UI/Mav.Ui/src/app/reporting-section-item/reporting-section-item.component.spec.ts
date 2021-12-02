import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingSectionItemComponent } from './reporting-section-item.component';

describe('ReportingSectionItemComponent', () => {
  let component: ReportingSectionItemComponent;
  let fixture: ComponentFixture<ReportingSectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingSectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingSectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
