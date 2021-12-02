import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltDetailsComponent } from './slt-details.component';

describe('SltDetailsComponent', () => {
  let component: SltDetailsComponent;
  let fixture: ComponentFixture<SltDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
