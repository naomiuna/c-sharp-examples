import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SltsListItemComponent } from './slts-list-item.component';

describe('SLTListItemComponent', () => {
  let component: SltsListItemComponent;
  let fixture: ComponentFixture<SltsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SltsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SltsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
