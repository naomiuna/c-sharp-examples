import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltsWrapperComponent } from './slts-wrapper.component';

describe('SltsWrapperComponent', () => {
  let component: SltsWrapperComponent;
  let fixture: ComponentFixture<SltsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
