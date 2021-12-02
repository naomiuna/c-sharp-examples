import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SLTComponent } from './SLTs.component';

describe('SLTsComponent', () => {
  let component: SLTComponent;
  let fixture: ComponentFixture<SLTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SLTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SLTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
