import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltDetailsBasicComponent } from './slt-details-basic.component';

describe('SltDetailsBasicComponent', () => {
  let component: SltDetailsBasicComponent;
  let fixture: ComponentFixture<SltDetailsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltDetailsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltDetailsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
