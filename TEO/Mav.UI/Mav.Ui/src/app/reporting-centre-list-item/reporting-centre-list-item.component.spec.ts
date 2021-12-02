import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCentreListItemComponent } from './reporting-centre-list-item.component';

describe('ReportingCentreListItemComponent', () => {
  let component: ReportingCentreListItemComponent;
  let fixture: ComponentFixture<ReportingCentreListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCentreListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCentreListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
