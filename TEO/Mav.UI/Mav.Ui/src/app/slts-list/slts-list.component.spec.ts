import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SLTListComponent } from './slts-list.component';

describe('SltsListComponent', () => {
  let component: SLTListComponent;
  let fixture: ComponentFixture<SLTListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SLTListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SLTListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
